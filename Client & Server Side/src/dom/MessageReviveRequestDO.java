package dom;

public class MessageReviveRequestDO {
	private String messageId;

	private String senderEmail;

	private String requestorName;

	private String requestorEmail;

	private String requestReason;

	public String getMessageId() {
		return messageId;
	}

	public String getRequestorEmail() {
		return requestorEmail;
	}

	public String getRequestorName() {
		return requestorName;
	}

	public String getRequestReason() {
		return requestReason;
	}

	public String getSenderEmail() {
		return senderEmail;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public void setRequestorEmail(String requestorEmail) {
		this.requestorEmail = requestorEmail;
	}

	public void setRequestorName(String requestorName) {
		this.requestorName = requestorName;
	}

	public void setRequestReason(String requestReason) {
		this.requestReason = requestReason;
	}

	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}

}
