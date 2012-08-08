package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import util.Util;

import dom.MessageDO;

public final class JdbcMessageDaoImpl implements MessageDao {

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
					message.setExpired(rs.getBoolean("expired"));
					message.setTimeToLive(rs.getTimestamp("timeToLive"));
					}
			   return message;
				} 
			catch (SQLException e) {e.printStackTrace();} 
			finally {
				if (rs != null) {
					try {
						rs.close();
					} catch (SQLException e) {e.printStackTrace();}
					}
				if (con != null) {
					try {
					con.close();
					} 
					catch (SQLException e) {e.printStackTrace();}
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
			ResultSet resultSet = ps.executeQuery();
			if (resultSet.next()){
				return resultSet.getString("question");
				}
			} 
		catch (SQLException e) {e.printStackTrace();} 
		finally {
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
			String messageQuestion, Timestamp messageExpiresOn, String senderMail) {
		// check if user exists in database
		String query = "INSERT INTO Message (messageId, prvKey, messageKey, question, answer, expired, timeToLive, senderMail) VALUES (?, ?, ?, ?, ?, false, ?, ?)";
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
			ps.setTimestamp(6, messageExpiresOn);
			ps.setString(7, senderMail);
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

	public void update(MessageDO message) {
		// check if user exists in database
		String query = "UPDATE Message SET expired = ? and timeToLive = ? where messageId = ?";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setBoolean(1, message.isExpired());
			ps.setTimestamp(2, message.getTimeToLive());
			ps.setString(3, message.getMessageId());
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