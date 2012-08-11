package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import util.Util;

import dom.ReviveDO;

/**
 * @author Avi
 * 
 */
public final class JdbcReviveDaoImpl implements ReviveDao {

	public void createReviveRequest(ReviveDO messageReviveRequest) {
		String query = "INSERT INTO Revival (requestorName, requestorEmail, fromMailR, requestReason, messageId, requestedOn) " + "VALUES (?, ?, ?, ?, ?, ?)";
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			con = Util.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, messageReviveRequest.getRequestorName());
			ps.setString(2, messageReviveRequest.getRequestorEmail());
			ps.setString(3, messageReviveRequest.getfromMailR());
			ps.setString(4, messageReviveRequest.getRequestReason());
			ps.setString(5, messageReviveRequest.getMessageId());
			ps.setTimestamp(6, new Timestamp(new Date().getTime()));
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