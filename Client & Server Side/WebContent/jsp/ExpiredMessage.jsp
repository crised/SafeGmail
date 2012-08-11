<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mail Content</title>
<link rel="stylesheet" type="text/css" href="../jsp/css/styles.css">
<link rel="shortcut icon" href="../jsp/img/icon.png">

<script type="text/javascript">
function validateForm()
{
	var validated1 = validatePlainText(document.getElementById("requestorName"), "Name");
	var	validated2 = validateEmail(document.getElementById("requestorEmail"), "Email");
	var validated3 = validateEmail(document.getElementById("fromMailR"), "fromMailR");
	var	validated4 = validatePlainText(document.getElementById("requestReason"), "Reason");
	
	if(validated1 && validated2 && validated3 & validated4) document.forms["requestForm"].submit();
	else return false;
}

function validatePlainText(htmlField, fieldName)
{
	var value = htmlField.value;
	if (value == null || value == "")
	{
	  	alert(fieldName+" cannot be left blank");
	  	return false;
	}
	return true;
}
function validateEmail(htmlField, fieldName)
{
	var emailValue = htmlField.value;
	var atpos = emailValue.indexOf("@");
	var dotpos = emailValue.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailValue.length)
	{
	  	alert(fieldName+" has to be entered in correct format(e.g. abc@abc.com)");
	  	return false;
	}
	return true;
}
</script>

</head>
<body>
<!-- Header -->
<div id="header">
<div id="logo">
</div>
</div>

<!-- Content -->
<div id="content_header">
<div id="site_content1">
<div id="content">
<h2><font color="red">For security reasons, this Message has expired.</font></h2>
	<p>Please fill in the below form if you wish to issue a request to bring this message back.</p>
	<form action="/SafeMail/MessageController?action=requestMessageRevival" method="post" name="requestForm">
		<table cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td>Your Name: </td>
				<td><input type='text' size="50" id="requestorName" name="requestorName"></input></td>
			</tr>
			<tr>
				<td>Sender Email: </td>
				<td><input type='text' size="50" id="fromMailR" name="fromMailR"></input></td>
			</tr>
			<tr>
				<td>Your Email: </td>
				<td><input type='text' size="50" id="requestorEmail" name="requestorEmail"></input></td>
			</tr>
			<tr>
				<td>Message Id: </td>
				<td><label><%=session.getAttribute("messageId")%></label></td>
			</tr>								
			<tr>
				<td>Reason: </td>
				<td><textarea rows="5" cols="100" id="requestReason" name="requestReason"></textarea></td>
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