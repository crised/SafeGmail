package com.illuminati.safemail.web;

import java.io.IOException;
import java.security.SecureRandom;
import java.security.Security;
import java.util.StringTokenizer;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import com.illuminati.safemail.service.BusinessService;
import com.illuminati.safemail.service.DefaultBusinessServiceImpl;

/**
 * Servlet implementation class Controller
 */
public final class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public static void main(String args[]) {
		SecureRandom random = new SecureRandom();
		byte[] bytes = new byte[2048];
		random.nextBytes(bytes);
		System.out.println(bytes);
	}

	private ServletConfig config;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		performAction(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		performAction(request, response);
	}

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	@Override
	public void init(ServletConfig config) throws ServletException {
		BouncyCastleProvider provider = new BouncyCastleProvider();
		Security.addProvider(provider);
		this.config = config;
	}

	private void performAction(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("action");
		BusinessService service = new DefaultBusinessServiceImpl();
		response.setContentType("text/plain");
		if ("send".equals(action)) {
			String credentials = request.getParameter("credentials");
			StringTokenizer tokenizer = new StringTokenizer(credentials, ":");
			if (tokenizer.countTokens() == 2) {
				String user = tokenizer.nextToken();
				String pass = tokenizer.nextToken();
				if (config.getInitParameter("sysuser").equals(user)
						&& config.getInitParameter("syspass").equals(pass)) {
					String recipientId = request.getParameter("recepientId");
					String messageKey = request.getParameter("messageKey");
					String question = request.getParameter("question");
					String answer = request.getParameter("answer");
					String messageId = service.send(messageKey, recipientId,
							question, answer);
					response.getWriter().write(messageId);
					return;
				}
			}
			throw new ServletException("Access Denied");
		} else if ("getQuestion".equals(action)) {
			String messageId = request.getParameter("messageId");
			request.getSession().setAttribute("messageId", messageId);
			request.setAttribute("messageQuestion", service
					.getQuestion(messageId));
			request.getSession().setAttribute("answerTries", 0);
			request.getRequestDispatcher("jsp/MessageQuestion.jsp").forward(
					request, response);
		} else if ("receive".equals(action)) {
			String userAnswer = request.getParameter("userAnswer");
			String messageId = (String) request.getSession().getAttribute(
					"messageId");
			boolean validAnswer = service.isValidAnswer(userAnswer, messageId);
			if (validAnswer) {
				request.setAttribute("messageKey", service.receive(userAnswer,
						messageId));
				request.getRequestDispatcher("jsp/MailContent.jsp").forward(
						request, response);
			} else {
				request.setAttribute("messageQuestion", service
						.getQuestion(messageId));
				int ansTries = (Integer) request.getSession().getAttribute(
						"answerTries");
				request.getSession().setAttribute("answerTries", ++ansTries);
				request.getRequestDispatcher("jsp/MessageQuestion.jsp")
						.forward(request, response);
			}
		} else {
			throw new UnsupportedOperationException("Operation not supported");
		}
		response.getWriter().flush();
	}
}