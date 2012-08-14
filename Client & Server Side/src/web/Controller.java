package web;

import java.io.IOException;
import java.security.SecureRandom;
import java.security.Security;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.StringTokenizer;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import service.BusinessService;
import service.DefaultBusinessServiceImpl;
import util.Util;


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
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				if (config.getInitParameter("sysuser").equals(user) && config.getInitParameter("syspass").equals(pass)) {
					String messageKey = request.getParameter("messageKey");
					String fromMail = request.getParameter("senderId");
					if (fromMail == null) fromMail="empty.server";
					String toMail = request.getParameter("recepientId");
					if (toMail == null) toMail="empty.server";
					String question =  request.getParameter("question");
					String answer = request.getParameter("answer");
					String versionS = request.getParameter("version");
					if (versionS == null) versionS="0";
					float version = Util.convertToFloat(versionS, 0.0F);
					version = version < 0.4 ? 0.0F : version;
					int TTL = Util.convertToInteger(request.getParameter("TTL"), -1);
					if (TTL == -1) {TTL = 120;} // 5 days expiration by default
					Timestamp timeToLive = null;
					Calendar today = GregorianCalendar.getInstance();
					today.add(Calendar.HOUR_OF_DAY, TTL);
					timeToLive = new Timestamp(today.getTime().getTime());
					String messageId = service.send(messageKey, fromMail, toMail, question, answer, timeToLive, version);
					response.getWriter().write(messageId);
					return;
				}
			}
			throw new ServletException("Access Denied");
		} 
		else if ("getQuestion".equals(action)) {
			String messageId = request.getParameter("messageId");
			request.getSession().setAttribute("messageId", messageId);
			
			if (service.isMessageExpired(messageId)) {
				response.sendRedirect("jsp/ExpiredMessage.jsp");
				return;
			}
			
			request.getSession().setAttribute("messageId", messageId);
			request.setAttribute("messageQuestion", service.getQuestion(messageId));
			request.getSession().setAttribute("answerTries", 0);
			request.getRequestDispatcher("jsp/MessageQuestion.jsp").forward(request, response);
		} 
		else if ("receive".equals(action)) {
			String userAnswer = request.getParameter("userAnswer");
			String messageId = (String) request.getSession().getAttribute("messageId"); // (String) to access it in each .jsp page
			boolean validAnswer = service.isValidAnswer(userAnswer, messageId,false);

			if (validAnswer) {
				request.setAttribute("messageKey", service.receive(userAnswer, messageId, false));
				//request.setAttribute("DecodeURIComponent", service.isver1(messageId));
				request.getRequestDispatcher("jsp/MailContent.jsp").forward(request, response);
			} else {
				String nonCanonicalUserAnswer = null;
				// Try for the non-canonized answer. This can be the case of the
				// message encrypted with the older non-canonized version.
				if (!validAnswer) {
					nonCanonicalUserAnswer = request.getParameter("userAnswer1");
					validAnswer = service.isValidAnswer(nonCanonicalUserAnswer, messageId, true);
				}

				if (validAnswer) {
					request.setAttribute("messageKey", service.receive(nonCanonicalUserAnswer, messageId, true));
					//request.setAttribute("DecodeURIComponent", service.isver1(messageId));
					request.getRequestDispatcher("jsp/MailContent.jsp").forward(request, response);
				} else {
					request.setAttribute("messageQuestion", service.getQuestion(messageId));
					int ansTries = (Integer) request.getSession().getAttribute("answerTries");
					request.getSession().setAttribute("answerTries", ++ansTries);
					request.getRequestDispatcher("jsp/MessageQuestion.jsp").forward(request, response);
				}
			}	
		} 
		else if ("requestMessageRevival".equals(action)) {
			String messageId = (String) request.getSession().getAttribute("messageId");

			if (service.isMessageExpired(messageId)) {
				
				String requestorName = request.getParameter("requestorName");
				String requestfromMailR = request.getParameter("fromMailR");
				String requestorEmail = request.getParameter("requestorEmail");				
				String requestReason = request.getParameter("requestReason");				  
				service.createRevivalRequest(messageId, requestorName, requestfromMailR, requestorEmail, requestReason);
				response.sendRedirect("html/RevivalRequestSuccess.html");
			}

		} else {
			throw new UnsupportedOperationException("Operation not supported");
		}
		response.getWriter().flush();
	}
}