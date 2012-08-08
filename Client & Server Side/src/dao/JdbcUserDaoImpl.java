package dao;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.security.InvalidAlgorithmParameterException;
import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.bouncycastle.jce.interfaces.ElGamalPrivateKey;
import org.bouncycastle.jce.interfaces.ElGamalPublicKey;

import util.Util;


/**
 * @author Amy
 * 
 */
public final class JdbcUserDaoImpl implements UserDao {
	private synchronized void addUser(String userId,
			ElGamalPublicKey publicKey, ElGamalPrivateKey privateKey) {
		// check if user exists in database
		String query = "INSERT INTO User (userId, pubKey, prvKey) VALUES (?, ?, ?)";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			ps.setObject(2, publicKey);
			ps.setObject(3, privateKey);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// close the connection
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.illuminati.safemail.dao.UserDao#getPrivateKey(java.lang.String)
	 */
	public ElGamalPrivateKey getPrivateKey(String userId) {
		// check if user exists in database
		if (userExists(userId)) {
			String query = "select * from User where userId = ?";
			Connection con = null;
			PreparedStatement ps = null;
			ResultSet rs = null;
			ObjectInputStream stream = null;
			ByteArrayInputStream byteArrayStream = null;
			try {
				con = Util.getConnection();
				ps = con.prepareStatement(query);
				ps.setString(1, userId);
				rs = ps.executeQuery();
				if (rs.next()) {
					byte[] pubKeyBytes = rs.getBytes("prvKey");
					byteArrayStream = new ByteArrayInputStream(pubKeyBytes);
					stream = new ObjectInputStream(byteArrayStream);
					return (ElGamalPrivateKey) stream.readObject();
				}
			} catch (SQLException se) {
				se.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} finally {
				if (byteArrayStream != null) {
					try {
						byteArrayStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}

				// close the connection
				if (rs != null) {
					try {
						rs.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
				if (ps != null) {
					try {
						ps.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
				if (con != null) {
					try {
						con.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}
		} else {
			// generate the keys
			try {
				KeyPair pair = Util.generateKeys();
				ElGamalPublicKey publicKey = (ElGamalPublicKey) pair
						.getPublic();
				ElGamalPrivateKey privateKey = (ElGamalPrivateKey) pair
						.getPrivate();
				addUser(userId, publicKey, privateKey);
				return privateKey;
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			} catch (NoSuchProviderException e) {
				e.printStackTrace();
			} catch (InvalidAlgorithmParameterException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.illuminati.safemail.dao.UserDao#getPublicKey(java.lang.String)
	 */
	public ElGamalPublicKey getPublicKey(String userId) {
		// check if user exists in database
		if (userExists(userId)) {
			String query = "select * from User where userId = ?";
			Connection con = null;
			PreparedStatement ps = null;
			ResultSet rs = null;
			ObjectInputStream stream = null;
			ByteArrayInputStream byteArrayStream = null;

			try {
				con = Util.getConnection();
				ps = con.prepareStatement(query);
				ps.setString(1, userId);
				rs = ps.executeQuery();
				if (rs.next()) {
					byte[] pubKeyBytes = rs.getBytes("pubKey");
					byteArrayStream = new ByteArrayInputStream(pubKeyBytes);
					stream = new ObjectInputStream(byteArrayStream);
					return (ElGamalPublicKey) stream.readObject();
				}
			} catch (SQLException se) {
				se.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} finally {
				if (byteArrayStream != null) {
					try {
						byteArrayStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}

				// close the connection
				if (rs != null) {
					try {
						rs.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
				if (ps != null) {
					try {
						ps.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
				if (con != null) {
					try {
						con.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}
		} else {
			// generate the keys
			try {
				KeyPair pair = Util.generateKeys();
				ElGamalPublicKey publicKey = (ElGamalPublicKey) pair
						.getPublic();
				ElGamalPrivateKey privateKey = (ElGamalPrivateKey) pair
						.getPrivate();
				addUser(userId, publicKey, privateKey);
				return publicKey;
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			} catch (NoSuchProviderException e) {
				e.printStackTrace();
			} catch (InvalidAlgorithmParameterException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private synchronized boolean userExists(String userId) {
		// check if user exists in database
		String query = "select * from User where userId = ?";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			rs = ps.executeQuery();
			return rs.next();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// close the connection
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}
}