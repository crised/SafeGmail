package service;

import java.sql.Timestamp;

/**
 * @author Avi
 * 
 */
public interface BusinessService {
	public void createMessageRevivalRequest(String messageId,
			String requestorName, String requestorEmail, String requestReason);
	
	public String getQuestion(String messageId);

	public boolean isMessageExpired(String messageId);

	public boolean isValidAnswer(String ans, String messageId,boolean oldVersion);
	
	public boolean isTTL(String messageId);

	public String receive(String ans, String messageId, boolean oldVersion);

	public String send(String messageKey, String recipient, String question,
			String ans, Float version, Timestamp timeToLive, String senderMail);
	
}
