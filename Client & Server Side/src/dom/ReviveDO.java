package dom;

import java.sql.Timestamp;

public class ReviveDO {
	
	private String messageId;
	
	private String requestorName;

	private String fromMailR;

	private String requestorEmail;

	private String requestReason;
	
	private Timestamp requestedOn;

	public String getMessageId() {return messageId;}
	
	public String getRequestorName() {return requestorName;}
	
	public String getfromMailR() {return fromMailR;}

	public String getRequestorEmail() {return requestorEmail;}

	public String getRequestReason() {return requestReason;}
	
	public Timestamp getRequestedOn() {return requestedOn;}	

	public void setMessageId(String messageId) {this.messageId = messageId;}
	
	public void setRequestorName(String requestorName) {this.requestorName = requestorName;}
	
	public void setfromMailR(String fromMailR) {this.fromMailR = fromMailR;}

	public void setRequestorEmail(String requestorEmail) {this.requestorEmail = requestorEmail;}	

	public void setRequestReason(String requestReason) {this.requestReason = requestReason;}
	
	public void setRequestedOn(Timestamp requestedOn) {this.requestedOn = requestedOn;}	

}
