<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mail Content</title>
</head>
<script src="jsp/cryptojs/rollups/aes.js" type="text/javascript"></script>

<script>
	function showMailClickHandler()
	{
		<% String reqMessageKey = request.getAttribute("messageKey").toString(); %>
	     var eText = document.getElementById("encryptedMailTxt");
	     var messageKey = '<%=reqMessageKey%>';
	     var text = CryptoJS.AES.decrypt(eText.value, messageKey);
	     decryptedMailTxt.value = hex2a(text.toString());
	}
	function hex2a(hex)
	{
	     var str = '';
	     for (var i=0;i < hex.length; i+=2)
	     {	
	        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16)); 
	     }
	     return str;
	}
</script>
	<body>
		<h1>Please copy-paste the encrypted message content from GMail in the first text area and "Show Content"</h1>
		<table>
			<tr>
				<td>
					<label><b>Paste your encrypted text here</b></label>
				</td>
				<td>
					<textarea rows="15" cols="120" id="encryptedMailTxt"></textarea>
				</td>	
			</tr>
			<tr>
				<td colspan="2" align="center"> 
					<input type="button" value="Show Mail Content" onclick="showMailClickHandler()"/>
				</td>
			</tr>
			<tr>
				<td>
					<label><b>Mail Content:</b></label>
				</td>
				<td>
					<textarea rows="15" cols="120" id="decryptedMailTxt" readonly="readonly"></textarea>
				</td>
			</tr>
		</table>
	</body>
</html>