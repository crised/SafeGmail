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
					message.setMessageKey(rs.getBytes("messageKey"));
					message.setPrvKey(rs.getBytes("prvKey"));
					message.setfromMail(rs.getString("fromMail"));
					message.settoMail(rs.getString("toMail"));				
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

	public void store(String messageId, byte[] encryptedPrivateKey, byte[] encryptedMessageKey, String fromMail, String toMail, String question, byte[] hashedAnswer, Timestamp timeToLive) {
		// check if user exists in database
		String query = "INSERT INTO Message (messageId, prvKey, messageKey, fromMail, toMail, question, answer, expired, timeToLive) VALUES (?, ?, ?, ?, ?, ?, ?, false, ?)";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, messageId);
			ps.setBytes(2, encryptedPrivateKey);
			ps.setBytes(3, encryptedMessageKey);
			ps.setString(4, fromMail);
			ps.setString(5, toMail);
			ps.setString(6, question);
			ps.setBytes(7, hashedAnswer);
			ps.setTimestamp(8, timeToLive);
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