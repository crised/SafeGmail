package com.illuminati.safemail.dom;

public class MessageDO {
	private String messageId;

	private byte[] prvKeyMod;

	private byte[] prvKeyExp;

	private byte[] messageKey;

	private String question;

	private byte[] answer;

	public byte[] getAnswer() {
		return answer;
	}

	public String getMessageId() {
		return messageId;
	}

	public byte[] getMessageKey() {
		return messageKey;
	}

	public byte[] getPrvKeyExp() {
		return prvKeyExp;
	}

	public byte[] getPrvKeyMod() {
		return prvKeyMod;
	}

	public String getQuestion() {
		return question;
	}

	public void setAnswer(byte[] answer) {
		this.answer = answer;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public void setMessageKey(byte[] messageKey) {
		this.messageKey = messageKey;
	}

	public void setPrvKeyExp(byte[] prvKeyExp) {
		this.prvKeyExp = prvKeyExp;
	}

	public void setPrvKeyMod(byte[] prvKeyMod) {
		this.prvKeyMod = prvKeyMod;
	}

	public void setQuestion(String question) {
		this.question = question;
	}
}
