/**
 * 
 */
package com.illuminati.safemail.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Random;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.jce.interfaces.ElGamalPrivateKey;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;
import org.bouncycastle.jce.spec.ElGamalParameterSpec;
import org.bouncycastle.jce.spec.ElGamalPrivateKeySpec;
import org.bouncycastle.jce.spec.ElGamalPublicKeySpec;

/**
 * @author Avi
 * 
 */
public class Util {

	private static final SecureRandom random = new SecureRandom();

	public static synchronized String decrypt(byte[] payload, PrivateKey key)
			throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, IllegalBlockSizeException,
			BadPaddingException, NoSuchProviderException {
		Cipher cipher = Cipher.getInstance("ElGamal/None/NoPadding", "BC");
		cipher.init(Cipher.DECRYPT_MODE, key, random);
		byte[] cipherData = cipher.doFinal(payload);
		return new String(cipherData);
	}

	/**
	 * This method decrypts the passed <code>payload</code> using the passed
	 * <code>hashedAnswer</code>. It used AES256 algorithm to do this.
	 * 
	 * @param payload
	 *            - encryptedPrivateKey in {@link String} format which is to be
	 *            decrypted
	 * @param hashedAnswer
	 *            - answer used to generate the secret key
	 * @return {@link PrivateKey} representing the passed <code>payload</code>
	 * @throws ClassNotFoundException
	 * @throws IOException
	 */
	public static synchronized ElGamalPrivateKey decryptPrivateKey(
			byte[] encPrvKey, byte[] hashedAnsBytes)
			throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, IllegalBlockSizeException,
			BadPaddingException, NoSuchProviderException, IOException,
			ClassNotFoundException {
		Cipher c = Cipher.getInstance("AES");
		SecretKeySpec key = new SecretKeySpec(hashedAnsBytes, "SHA256");
		c.init(Cipher.DECRYPT_MODE, key);

		byte[] prvKey = c.doFinal(encPrvKey);
		return (ElGamalPrivateKey) new ObjectInputStream(
				new ByteArrayInputStream(prvKey)).readObject();
	}

	/**
	 * This method encrypts the passed <code>pvk</code> using the passed
	 * <code>hashedAnswer</code>. It uses AES256 algorithm to do this.
	 * 
	 * @param pvk
	 *            - key to be encrypted
	 * @param hashedAnswer
	 *            - answer used to generate the secret key
	 * @return String representing the encrypted <code>pvk</code>
	 */
	// public static String encrypt(PrivateKey pvk, String hashedAnswer) {
	// // TODO Auto-generated method stub
	// return null;
	// }
	public static synchronized byte[] encryptMessage(byte[] payload,
			PublicKey key) throws NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeyException,
			IllegalBlockSizeException, BadPaddingException,
			NoSuchProviderException {
		Cipher cipher = Cipher.getInstance("ElGamal/None/NoPadding", "BC");
		cipher.init(Cipher.ENCRYPT_MODE, key, random);
		return cipher.doFinal(payload);
	}

	public static synchronized byte[] encryptPrivateKey(
			ElGamalPrivateKey privateKey, byte[] hashedAnsBytes)
			throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, IllegalBlockSizeException,
			BadPaddingException, NoSuchProviderException, IOException {
		Cipher c = Cipher.getInstance("AES");
		SecretKeySpec key = new SecretKeySpec(hashedAnsBytes, "SHA256");
		c.init(Cipher.ENCRYPT_MODE, key);

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ObjectOutput out = new ObjectOutputStream(bos);
		out.writeObject(privateKey);
		out.close();
		bos.close();
		byte[] pvtKeyBytes = c.doFinal(bos.toByteArray());
		return pvtKeyBytes;
	}

	// public static synchronized String encrypt(String payload, String
	// messageKey)
	// throws NoSuchAlgorithmException, NoSuchPaddingException,
	// InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
	//
	// byte[] dataToEncrypt = payload.getBytes();
	// Cipher c = Cipher.getInstance("AES");
	// SecretKeySpec key = new SecretKeySpec(messageKey.getBytes(), "AES");
	// c.init(Cipher.ENCRYPT_MODE, key);
	// byte[] encryptedData = c.doFinal(dataToEncrypt);
	// return new String(encryptedData);
	// }
	//
	public static synchronized KeyPair generateKeys()
			throws NoSuchAlgorithmException, NoSuchProviderException,
			InvalidAlgorithmParameterException {
		KeyPairGenerator generator = KeyPairGenerator.getInstance("ELGAMAL",
				"BC");
		SecureRandom random = new SecureRandom();
		generator.initialize(512, random);
		KeyPair keyPair = generator.generateKeyPair();
		return keyPair;
	}

	public static synchronized ElGamalPrivateKey generatePrivateKey(
			BigInteger mod, BigInteger exp) {
		ElGamalParameterSpec prmSpec = new ElGamalParameterSpec(mod, exp);
		// ElGamalKeySpec spec = new ElGamalKeySpec(prmSpec);
		BigInteger g = new BigInteger(
				"153d5d6172adb43045b68ae8e1de1070b6137005686d29d3d73a7749199681ee5b212c9b96bfdcfa5b20cd5e3fd2044895d609cf9b410b7a0f12ca1cb9a428cc",
				16);
		ElGamalPrivateKeySpec spec = new ElGamalPrivateKeySpec(g, prmSpec);
		try {
			KeyFactory factory = KeyFactory.getInstance("ELGAMAL", "BC");
			return (ElGamalPrivateKey) factory.generatePrivate(spec);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static synchronized ElGamalPublicKey generatePublicKey(
			BigInteger mod, BigInteger exp) {
		ElGamalParameterSpec prmSpec = new ElGamalParameterSpec(mod, exp);
		// ElGamalKeySpec spec = new ElGamalKeySpec(prmSpec);
		BigInteger g = new BigInteger(
				"153d5d6172adb43045b68ae8e1de1070b6137005686d29d3d73a7749199681ee5b212c9b96bfdcfa5b20cd5e3fd2044895d609cf9b410b7a0f12ca1cb9a428cc",
				16);
		ElGamalPublicKeySpec spec = new ElGamalPublicKeySpec(g, prmSpec);
		try {
			KeyFactory factory = KeyFactory.getInstance("ELGAMAL", "BC");
			return (ElGamalPublicKey) factory.generatePublic(spec);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Connection getConnection() throws SQLException {
		DriverManager.registerDriver(new com.mysql.jdbc.Driver());
		String user = "root";
		String password = "123456";
		String url = "jdbc:mysql://localhost/safemail";
		return DriverManager.getConnection(url, user, password);
	}

	public static synchronized String getMessageId() {
		return UUID.randomUUID().toString();
	}

	public static synchronized String getMessageKey() {
		Random ranGen = new SecureRandom();
		byte[] aesKey = new byte[16]; // 16 bytes = 128 bits
		ranGen.nextBytes(aesKey);
		return new String(aesKey);
	}

	/**
	 * This method generates a one way hash using SHA256
	 * 
	 * @param answer
	 *            - {@link String} to be hashed
	 * @return {@link String} representing hash of the passed
	 *         <code>answer</code>
	 */
	public static byte[] hash(String answer) {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA-256");

			md.update(answer.getBytes("UTF-8"));
			return md.digest();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
}
