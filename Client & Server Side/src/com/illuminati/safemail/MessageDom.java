package com.illuminati.safemail;

import java.io.Serializable;

public class MessageDom implements Serializable {
	private static final long serialVersionUID = 4516161323116722557L;

	private String messageId;
	private String recipientId;
	private String privateKey;
	private String messageKey;
	private String question;
	private String answer;

	public String getAnswer() {
		return answer;
	}

	public String getMessageId() {
		return messageId;
	}

	public String getMessageKey() {
		return messageKey;
	}

	public String getPrivateKey() {
		return privateKey;
	}

	public String getQuestion() {
		return question;
	}

	public String getRecipientId() {
		return recipientId;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public void setMessageKey(String messageKey) {
		this.messageKey = messageKey;
	}

	public void setPrivateKey(String privateKey) {
		this.privateKey = privateKey;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public void setRecipientId(String recipientId) {
		this.recipientId = recipientId;
	}
}
