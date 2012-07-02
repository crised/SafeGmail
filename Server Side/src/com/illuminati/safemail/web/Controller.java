package com.illuminati.safemail.web;

import java.io.IOException;
import java.security.Security;

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
	}

	private void performAction(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("action");
		BusinessService service = new DefaultBusinessServiceImpl();
		response.setContentType("text/plain");
		if ("send".equals(action)) {
			String recipientId = request.getParameter("recepientId");
			String messageKey = request.getParameter("messageKey");
			String question = request.getParameter("question");
			String answer = request.getParameter("answer");
			String messageId = service.send(messageKey, recipientId, question,
					answer);
			response.getWriter().write(messageId);
		} else if ("getQuestion".equals(action)) {
			String messageId = request.getParameter("messageId");
			request.getSession().setAttribute("messageId", messageId);
			request.setAttribute("messageQuestion", service
					.getQuestion(messageId));
			request.getRequestDispatcher("jsp/MessageQuestion.jsp").forward(
					request, response);
		} else if ("receive".equals(action)) {
			String userAnswer = request.getParameter("userAnswer");
			String messageId = request.getSession().getAttribute("messageId")
					.toString();
			request.setAttribute("messageKey", service.receive(userAnswer,
					messageId));
			request.getRequestDispatcher("jsp/MailContent.jsp").forward(
					request, response);
		} else {
			throw new UnsupportedOperationException("Operation not supported");
		}
		response.getWriter().flush();
	}
}