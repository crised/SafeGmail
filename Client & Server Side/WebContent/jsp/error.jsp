<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isErrorPage="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Show Error Page</title>
</head>
<style>
* {
	font-size: 12px;
	font-family: Verdana
}
</style>
<body>
<h2>Error</h2>

<%=exception.getMessage()%>

</body>
</html>