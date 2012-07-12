/**
 * 
 */
package com.illuminati.safemail.service;

/**
 * @author Avi
 * 
 */
public interface BusinessService {
	public String getQuestion(String messageId);

	public boolean isValidAnswer(String ans, String messageId);

	public String receive(String ans, String messageId);

	public String send(String messageKey, String recipient, String question,
			String ans);
}
