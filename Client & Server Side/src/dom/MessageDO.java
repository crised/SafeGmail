package dom;

import java.sql.Timestamp;

public class MessageDO {
	
	private String messageId;

	private byte[] prvKey;

	private byte[] messageKey;
	
	private String fromMail;
	
	private String toMail;

	private String question;

	private byte[] answer;

	private boolean expired;

	private Timestamp timeToLive;

	public String getMessageId() {return messageId;}
	
	public byte[] getPrvKey() {return prvKey;}
	
	public byte[] getMessageKey() {return messageKey;}
	
	public String getfromMail() {return fromMail;}
	
	public String gettoMail() {return toMail;}
	
	public String getQuestion() {return question;}

	public byte[] getAnswer() {return answer;}	
	
	public boolean isExpired() {return expired;}

	public Timestamp getTimeToLive() {return timeToLive;}
	
	public void setMessageId(String messageId) {this.messageId = messageId;}
	
	public void setPrvKey(byte[] prvKey) {this.prvKey = prvKey;}
	
	public void setMessageKey(byte[] messageKey) {this.messageKey = messageKey;}
	
	public void setfromMail(String fromMail) {this.fromMail = fromMail;}
	
	public void settoMail(String toMail) {this.toMail = toMail;}
	
	public void setQuestion(String question) {this.question = question;}
	
	public void setAnswer(byte[] answer) {this.answer = answer;}

	public void setExpired(boolean expired) {this.expired = expired;}

	public void setTimeToLive(Timestamp timeToLive) {this.timeToLive = timeToLive;}

}
