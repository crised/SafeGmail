/**
 * 
 */
package com.illuminati.safemail.dao;

import com.illuminati.safemail.dom.MessageDO;

/**
 * @author Avi
 * 
 */
public interface MessageDao {
	/**
	 * @param messageId
	 * @return
	 */
	public String[] getKeys(String messageId);

	public MessageDO getMessageById(String messageId);

	/**
	 * @param messageId
	 * @return
	 */
	public String getQuestion(String messageId);

	/**
	 * @param messageId
	 * @param encryptedMessageKey
	 * @param encryptedPrivateKey
	 * @param hashedAnswer
	 */
	public void store(String messageId, byte[] encryptedMessageKey,
			byte[] encryptedPrivateKey, byte[] hashedAnswer,
			String messageQuestion);
}
