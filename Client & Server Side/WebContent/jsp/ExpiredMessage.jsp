<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Expired Message</title>
<link rel="stylesheet" type="text/css" href="http://www.safegmail.com:8080/SafeMail/jsp/css/styles.css">
<link rel="shortcut icon" href="http://www.safegmail.com:8080/SafeMail/jsp/img/icon.png">
</head>
<body>
<script src="http://www.safegmail.com:8080/SafeMail/jsp/scripts/expiredmessage.js" type="text/javascript"></script>
<div id="header">
<div id="logo">
</div>
</div>

<!-- Content -->
<div id="content_header">
<div id="site_content1">
<div id="content">
<h2><font color="red">For security reasons, this message has expired.</font></h2>
	<p>Please fill in the below form to issue a request to bring this message back.</p>
	<form action="http://www.safegmail.com:8080/SafeMail/MessageController?action=requestMessageRevival" method="post" name="requestForm">
		<table cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td>Your Name: </td>
				<td><input type='text' size="50" id="requestorName" name="requestorName"></input></td>
			</tr>
			<tr>
				<td>From Email: </td>
				<td><input type='text' size="50" id="fromMailR" name="fromMailR"></input></td>
			</tr>
			<tr>
				<td>Your Email: </td>
				<td><input type='text' size="50" id="requestorEmail" name="requestorEmail"></input></td>
			</tr>
			<tr>
				<td>Reason: </td>
				<td><textarea rows="5" cols="100" id="requestReason" name="requestReason"></textarea></td>
			</tr>
            <tr>
                <td>Message Id: </td>
                <td><label><%=session.getAttribute("messageId")%></label></td>
            </tr>
			<tr>
				<td colspan="2" align="center">
					<div align="center" id="submitDiv">
						<input type="button" value="Submit" id="submitBtn" onclick="return validateForm()"/>
					</div>
				</td>
			</tr>
		</table>
		<h6><font color="red">* All fields are mandatory</font></h6>
	</form>
</div>
</div>
</div>

<div id="content_footer"></div>
<div id="footer" />

</body>
</html>