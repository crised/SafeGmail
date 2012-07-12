/**
 * 
 */
package com.illuminati.safemail.dao;

import org.bouncycastle.jce.interfaces.ElGamalPrivateKey;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;

/**
 * @author Avi
 * 
 */
public interface UserDao {
	public ElGamalPrivateKey getPrivateKey(String userId);

	public ElGamalPublicKey getPublicKey(String userId);
}
