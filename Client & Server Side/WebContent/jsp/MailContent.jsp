<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mail Content</title>
<link rel="stylesheet" type="text/css" href="jsp/css/styles.css">
<link rel="shortcut icon" href="jsp/img/icon.png">
</head>
<script src="jsp/cryptojs/rollups/aes.js" type="text/javascript"></script>
<script>
<% String reqMessageKey = request.getAttribute("messageKey").toString(); %>
var messageKey = '<%=reqMessageKey%>';
</script>

<body>
<div id="header"><div id="logo"><div id="logo_text"></div></div></div>

<div id="content_header">
    <div id="site_content1">
        <div id="content">
    	<h1>Mail Decryption</h1>

		        <div id="encryptedMail">
		        <label><b>Please copy-paste the encrypted message content from Gmail below</b></label><br>
			    <textarea rows="22" cols="120" id="encryptedMailTxt"></textarea><br>
			        <div align="center">
			        <input type="button" value="Show My Mail" onclick="showMailClickHandler()"/>
			        </div>
			    </div>

                <div id="decryptedMail1" >
	            <label><b>Mail Content:</b></label><br>
		            <div align="center">
		            <textarea rows="22" cols="120" id="decryptedMailTxt" readonly="readonly"></textarea>
		            </div>
                </div>

		        <div id="decryptedMail2">
		        <label><b>Mail Content:</b></label><br><br>
                    <div align="left">
                    </div>
	            </div>
		</div>	
	</div>
</div>
<script src="jsp/scripts/mailcontent.js" type="text/javascript"></script>
</body>
</html>
