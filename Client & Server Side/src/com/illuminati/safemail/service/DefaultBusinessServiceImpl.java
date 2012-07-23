/**
 * 
 */
package com.illuminati.safemail.service;

import java.text.Normalizer;

import org.bouncycastle.jce.interfaces.ElGamalPrivateKey;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;

import com.illuminati.safemail.dao.JdbcMessageDaoImpl;
import com.illuminati.safemail.dao.JdbcUserDaoImpl;
import com.illuminati.safemail.dao.MessageDao;
import com.illuminati.safemail.dao.UserDao;
import com.illuminati.safemail.dom.MessageDO;
import com.illuminati.safemail.util.Util;

/**
 * @author Avi
 * 
 */
public final class DefaultBusinessServiceImpl implements BusinessService {
	private UserDao userDao;
	private MessageDao messageDao;

	public DefaultBusinessServiceImpl() {
		this.userDao = new JdbcUserDaoImpl();
		this.messageDao = new JdbcMessageDaoImpl();
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

	public boolean isValidAnswer(String ans, String messageId) {
		MessageDO messageDetails = getMessageDao().getMessageById(messageId);
		String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
		byte[] hashedAnswer = Util.hash(answer);
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
	public String receive(String ans, String messageId) {
		MessageDO messageDetails = getMessageDao().getMessageById(messageId);
		String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
		byte[] hashedAnswer = Util.hash(answer);
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
	public String send(String messageKey, String recipient, String question,
			String ans) {
		String messageId = null;
		ElGamalPublicKey puk = getUserDao().getPublicKey(recipient);
		ElGamalPrivateKey pvk = getUserDao().getPrivateKey(recipient);
		String answer = Normalizer.normalize(ans, Normalizer.Form.NFD);
		byte[] hashedAnswer = Util.hash(answer);
		try {
			byte[] encryptedMessageKey = Util.encryptMessage(messageKey
					.getBytes(), puk);
			byte[] encryptedPrivateKey = Util.encryptPrivateKey(pvk,
					hashedAnswer);
			messageId = Util.getMessageId();
			getMessageDao().store(messageId, encryptedMessageKey,
					encryptedPrivateKey, hashedAnswer, question);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return messageId;
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