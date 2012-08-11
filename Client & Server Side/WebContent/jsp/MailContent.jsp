<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
		function showMailClickHandler()
		{
			<% String reqMessageKey = request.getAttribute("messageKey").toString(); %>
			<% String reqDecodeURI= request.getAttribute("DecodeURIComponent").toString(); %>
			 var URI = '<%=reqDecodeURI%>';
		     var eText = document.getElementById("encryptedMailTxt");
		     var messageKey = '<%=reqMessageKey%>';
		     var decrypted = CryptoJS.AES.decrypt(eText.value, messageKey);
             var decryptedMailTxtArea = document.getElementById("hello");

             if (URI == 'true'){
			 var text = decrypted.toString(CryptoJS.enc.Utf8); 			
			 decryptedMailTxtArea.innerHTML = decodeURIComponent(text);
			 showEncryptedDiv(2);
			}

            else{			
			var text =hex2a(text.toString());   
			decryptedMailTxtArea.value = text;
			showEncryptedDiv(1);
			}
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

		function showEncryptedDiv(showEncrypted)
		{
		     var decryptedMailDiv1 = document.getElementById("decryptedMail1");
	 	     var decryptedMailDiv2 = document.getElementByid("decyrptedMail2");
		     var encryptedMailDiv = document.getElementById("encryptedMail");
			 if(showEncrypted == 2)
			 {
		     	decryptedMailDiv1.style.display = "none";
			decryptedMailDiv2.style.display = "block";
		     	encryptedMailDiv.style.display = "none";
			 }
			 if(showEncrypted ==1)
			{
			decryptedMailDiv1.style.display = "block";
                        decryptedMailDiv2.style.display = "none";
                        encryptedMailDiv.style.display = "none";
			}
			 else
			 {
		     	decryptedMailDiv1.style.display = "none";
			decryptedMailDiv2.style.display = "none";
		     	encryptedMailDiv.style.display = "block";
			 }
		}
		
		function hideDecryptedMail()
		{
			document.getElementById("decryptedMail").style.display = "none";
		}
	</script>
	<body onload="hideDecryptedMail()">
		<!-- Header -->
		<div id="header">
	      <div id="logo">
	        <div id="logo_text">
	          <!-- <h1><a href="http://www.safegmail.com">Safe<span class="logo_colour">Gmail</span></a></h1>
	          <h2>PGP encryption for Gmail.</h2> -->
	        </div>
	      </div>
	    </div>
		
		<!-- Content -->
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
					
					<div id="decryptedMail1">
					<label><b>Mail Content:</b></label><br>
					<div align="center">
					<textarea rows="22" cols="120" id="decryptedMailTxt" readonly="readonly"></textarea>
					<input type="button" value="Back To Encrypted Text" onclick="showEncryptedDiv(true)"/>
					</div>	
					
					<div id="decryptedMail2">
						<label><b>Mail Content:</b></label><br><br>
						<div id="hello" align="left">
				         </div>
	
					</div>	
				</div>
			</div>
		</div>
		<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-33255588-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
	</body>
</html>
