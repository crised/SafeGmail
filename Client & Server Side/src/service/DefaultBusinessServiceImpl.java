package service;

import java.sql.Timestamp;
import java.text.Normalizer;
import java.util.Calendar;
import java.util.GregorianCalendar;

import org.bouncycastle.jce.interfaces.ElGamalPrivateKey;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;

import util.Util;


import dao.JdbcMessageDaoImpl;
import dao.JdbcReviveDaoImpl;
import dao.JdbcUserDaoImpl;
import dao.MessageDao;
import dao.ReviveDao;
import dao.UserDao;
import dom.MessageDO;
import dom.ReviveDO;

/**
 * @author Avi
 * 
 */
public final class DefaultBusinessServiceImpl implements BusinessService {
	private UserDao userDao;
	private MessageDao messageDao;
	private ReviveDao reviveMessageDao;

	public DefaultBusinessServiceImpl() {
		this.userDao = new JdbcUserDaoImpl();
		this.messageDao = new JdbcMessageDaoImpl();
		this.reviveMessageDao = new JdbcReviveDaoImpl();
	}

	public void createRevivalRequest(String messageId, String requestorName, String requestFromMailR, String requestorEmail, String requestReason) 
	{
		ReviveDO requestForm = new ReviveDO();
		requestForm.setMessageId(messageId);
		requestForm.setRequestorName(requestorName);
		requestForm.setfromMailR(requestFromMailR);
		requestForm.setRequestorEmail(requestorEmail);		
		requestForm.setRequestReason(requestReason);
		reviveMessageDao.createReviveRequest(requestForm);
	}

	/**
	 * @return the messageDao
	 */
	public MessageDao getMessageDao() {
		return messageDao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.illuminati.mailvault.service.BusinessService#getQuestion(java.lang
	 * .String)
	 */
	public String getQuestion(String messageId) {
		return getMessageDao().getQuestion(messageId);
	}

	/**
	 * @return the userDao
	 */
	public UserDao getUserDao() {
		return userDao;
	}

public boolean isMessageExpired(String messageId) {
	MessageDO message = messageDao.getMessageById(messageId);
		boolean expired = false;
		if (message.isExpired()) { // Check to verify if message is already
									// expired in some earlier transaction
			expired = true;
		} else if (message.getTimeToLive() != null) // Check to differentiate
		// TTL enabled messages
		{
			Calendar currentDate = GregorianCalendar.getInstance();
			int status = new Timestamp(currentDate.getTime().getTime())
					.compareTo(message.getTimeToLive());
			expired = status == 1;
			if (expired) {
				message.setExpired(true);
				getMessageDao().update(message);
			}
		}
		return expired;
	}

public boolean isValidAnswer(String ans, String messageId, boolean oldVersion) {
		if (isMessageExpired(messageId)) {
			throw new RuntimeException(
					"Message is expired and hence, cannot be read.");
		}
		MessageDO messageDetails = getMessageDao().getMessageById(messageId);
		String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
		byte[] hashedAnswer = null;
		if (oldVersion) {
			hashedAnswer = Util.hash(answer);
		} else {
			hashedAnswer = answer.getBytes();
		}
		// Verifying if correct answer is entered by user or not.
		if (hashedAnswer.length == messageDetails.getAnswer().length) {
			for (int count = 0; count < messageDetails.getAnswer().length; count++) {
				if (hashedAnswer[count] != messageDetails.getAnswer()[count]) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.illuminati.mailvault.service.BusinessService#receive(java.lang.String
	 * , java.lang.String)
	 */
	public String receive(String ans, String messageId, boolean oldVersion) {
		if (isMessageExpired(messageId)) {
			throw new RuntimeException(
					"Message is expired and hence, cannot be read.");
		}
		MessageDO messageDetails = getMessageDao().getMessageById(messageId);
		String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
		byte[] hashedAnswer = null;
		if (oldVersion) {
			hashedAnswer = Util.hash(answer);
		} else {
			hashedAnswer = answer.getBytes();
		}

		// Verifying if correct answer is entered by user or not.
		try {
			ElGamalPrivateKey privateKey = Util.decryptPrivateKey(
					messageDetails.getPrvKey(), hashedAnswer);
			return Util.decrypt(messageDetails.getMessageKey(), privateKey);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.illuminati.mailvault.service.BusinessService#send(java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	public String send(String messageKey, String fromMail, String toMail, String question, String ans, Timestamp timeToLive, Float version) {
		String messageId = null;
		ElGamalPublicKey puk = getUserDao().getPublicKey(fromMail);
		ElGamalPrivateKey pvk = getUserDao().getPrivateKey(fromMail);
		byte[] hashedAnswer = null;
		if (version == 0.0F) {
			String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
			hashedAnswer = Util.hash(answer);
		} else {
			hashedAnswer = ans.getBytes();
		}

		try {
			byte[] encryptedMessageKey = Util.encryptMessage(messageKey.getBytes(), puk);
			byte[] encryptedPrivateKey = Util.encryptPrivateKey(pvk,hashedAnswer);
			messageId = Util.getMessageId();
			getMessageDao().store(messageId, encryptedPrivateKey, encryptedMessageKey, fromMail, toMail, question, hashedAnswer, timeToLive);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return messageId;
	}

public boolean isver1 (String messageId) {
		MessageDO message = messageDao.getMessageById(messageId);
		if(message.getfromMail() != "empty.server")
		{
			return true;
		}
		else return false;
}
		
	
	/**
	 * @param messageDao
	 *            the messageDao to set
	 */
	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}

	/**
	 * @param userDao
	 *            the userDao to set
	 */
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
}