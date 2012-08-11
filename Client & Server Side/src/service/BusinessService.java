package service;

import java.sql.Timestamp;

public interface BusinessService {
	public void createRevivalRequest(String messageId, String requestorName, String requestFromMailR, String requestorEmail, String requestReason);
	
	public String getQuestion(String messageId);

	public boolean isMessageExpired(String messageId);

	public boolean isValidAnswer(String ans, String messageId,boolean oldVersion);
	
	public boolean isTTL(String messageId);

	public String receive(String ans, String messageId, boolean oldVersion);

	public String send(String messageKey, String fromMail, String toMail, String question, String ans, Timestamp timeToLive, Float version);
	
}
