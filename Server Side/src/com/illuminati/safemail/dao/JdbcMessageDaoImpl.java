/**
 * 
 */
package com.illuminati.safemail.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.illuminati.safemail.dom.MessageDO;
import com.illuminati.safemail.util.Util;

/**
 * @author Amy
 * 
 */
public final class JdbcMessageDaoImpl implements MessageDao {
	public String[] getKeys(String messageId) {
		// TODO Auto-generated method stub
		return null;
	}

	public MessageDO getMessageById(String messageId) {
		String query = "select * from Message where messageId = ?";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, messageId);
			rs = ps.executeQuery();
			MessageDO message = null;
			if (rs.next()) {
				message = new MessageDO();
				message.setMessageId(messageId);
				message.setPrvKey(rs.getBytes("prvKey"));
				message.setMessageKey(rs.getBytes("messageKey"));
				message.setQuestion(rs.getString("question"));
				message.setAnswer(rs.getBytes("answer"));
			}
			return message;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
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
		return null;
	}

	public String getQuestion(String messageId) {
		String query = "select * from Message where messageId = ?";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, messageId);
			ResultSet resultSet = ps.executeQuery(query);
			return resultSet.getString("question");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
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
		return null;
	}

	public void store(String messageId, byte[] encryptedMessageKey,
			byte[] encryptedPrivateKey, byte[] hashedAnswer,
			String messageQuestion) {
		// check if user exists in database
		String query = "INSERT INTO Message (messageId, prvKey, messageKey, question, answer) VALUES (?, ?, ?, ?, ?)";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, messageId);
			ps.setBytes(2, encryptedPrivateKey);
			ps.setBytes(3, encryptedMessageKey);
			ps.setString(4, messageQuestion);
			ps.setBytes(5, hashedAnswer);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
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
}