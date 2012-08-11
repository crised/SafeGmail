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
	public void store(String messageId, byte[] encryptedPrivateKey, byte[] encryptedMessageKey, String fromMail, String toMail, String question, byte[] hashedAnswer, Timestamp timeToLive);

	public void update(MessageDO message);
}
