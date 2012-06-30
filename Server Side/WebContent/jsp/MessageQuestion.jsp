<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Message Question</title>
</head>
<body>
	<h1>Enter the answer for question to read mail content</h1>
	<form name="inputForm" action="http://localhost:8080/SafeMail/MessageController?action=receive" method="post">
		<b>Question : </b><label><%=request.getAttribute("messageQuestion") %></label><br>
		<b>Type in your answer : </b><input type="text" name="userAnswer"/> <br>
		<input type="submit" value="Submit"/>
	</form>
</body>
</html>