package dom;

import java.sql.Timestamp;

public class MessageDO {
	private String messageId;

	private byte[] prvKey;

	private byte[] messageKey;

	private String question;

	private byte[] answer;

	private boolean expired;

	private Timestamp timeToLive;

	private String senderMail;

	public byte[] getAnswer() {
		return answer;
	}

	public String getMessageId() {
		return messageId;
	}

	public byte[] getMessageKey() {
		return messageKey;
	}

	public byte[] getPrvKey() {
		return prvKey;
	}

	public String getQuestion() {
		return question;
	}

	public Timestamp getTimeToLive() {
		return timeToLive;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setAnswer(byte[] answer) {
		this.answer = answer;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public void setMessageKey(byte[] messageKey) {
		this.messageKey = messageKey;
	}

	public void setPrvKey(byte[] prvKey) {
		this.prvKey = prvKey;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public void setTimeToLive(Timestamp timeToLive) {
		this.timeToLive = timeToLive;
	}

	public void setSenderMail(String senderMail) {
		this.senderMail = senderMail;
	}

	public String getSenderMail() {
		return senderMail;
	}
}
