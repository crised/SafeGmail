/**
 * 
 */
package dao;

import java.sql.Timestamp;

import dom.MessageDO;

/**
 * @author Avi
 * 
 */
public interface MessageDao {

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
			String messageQuestion, Timestamp messageExpiresOn, String senderMail);

	public void update(MessageDO message);
}
