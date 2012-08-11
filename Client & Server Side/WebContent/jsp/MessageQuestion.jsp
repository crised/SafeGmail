<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Message Question</title>
<link rel="stylesheet" type="text/css" href="jsp/css/styles.css">
<link rel="shortcut icon" href="jsp/img/icon.png">
</head>
<script type="text/javascript" src="jsp/cryptojs/rollups/md5.js"></script>
<script type="text/javascript">
function submitForm()
{
	var submitBtnDisabled = document.getElementById("submitBtn").disabled;
	if(submitBtnDisabled == false)
	{
		var answerText = canonicalString(document.getElementById("userAns").value);
	    //Adding canonical hashed string
	    document.getElementById("userHashedAns").value = CryptoJS.MD5(answerText);
	    document.getElementById("submitBtn").disabled="disabled";
	    document.forms["inputForm"].submit();
	}
}

function removeSubmitButton()
{
	var submitBtnObj = document.getElementById("submitBtn");
	var submitDivObj = document.getElementById("submitDiv");
	self.clearInterval(intervalTime);
	submitDivObj.removeChild(submitBtnObj);
}

function canonicalString(str)
{
    return trimString(str).toLowerCase();
}
function trimString(str) 
{
    return str.replace(/\s/g, "");
}

function checkEnter(e)
{
	 e = e || event;
	 <%
		int triesCount = (Integer)session.getAttribute("answerTries");
		if(triesCount >= 3){
	 %>	
	 		return false;
	 <%
		}
		else
		{
	%>		
		 if(e.keyCode == 13)
		 {
		 	submitForm();
		 }
		 return (e.keyCode || event.which || event.charCode || 0) !== 13;
	<%}%>
	 
}
</script>
<body>
<div id="header">
<div id="logo"><div id="logo_text"></div></div></div><div id="content_header"></div>
<div id="site_content">
    	<div id="content">
			<form name="inputForm" action="MessageController?action=receive" method="post" onkeypress="return checkEnter(event)">
						<input type="hidden" name="userAnswer" id="userHashedAns"/>
				<h1>Enter the answer for question to read mail content</h1>
				<table align="center">
					<tr>
						<td><b>Question : </b></td>
						<td><label><%=request.getAttribute("messageQuestion") %></label></td>
					</tr>
					<tr>
						<td><b>Type in your answer : </b></td>
						<td><input type="text" name="userAnswer1" id="userAns" size="100"/>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
						<%
							triesCount = (Integer)session.getAttribute("answerTries");
							if(triesCount >= 3)
							{
						%>
							<Script type="text/javascript">  
								var intervalTime = self.setInterval("removeSubmitButton()", 200);
								alert( "You have exhausted all your tries. Please close the browser and retry later." );
								window.close();  
							</Script>  
						<%
							}
							else if(triesCount > 0)
							{
						%>
							<span><font color="red">Your answer is not correct. <%=3-triesCount %> tries left. Please try again.</font></span>
						<%		
							}
						%>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div align="center" id="submitDiv">
								<input type="button" value="Submit" id="submitBtn" onclick="submitForm()"/>
							</div>
						</td>
					</tr>	
				</table>
			</form>
                     <h2>**We Never access your messages, encryption/decryption is done within your browser**</h2>
		</div>
	</div>	
	<div id="content_footer"></div>
	<div id="footer"/>
</body>
</html>
