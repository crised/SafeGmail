<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Message Question</title>
<link rel="stylesheet" type="text/css" href="jsp/css/styles.css">
<link rel="shortcut icon" href="jsp/img/icon.png">
</head>
<body>
	<div id="header">
      <div id="logo">
        <div id="logo_text">
         <!-- <h1><a href="http://www.safegmail.com">Safe<span class="logo_colour">Gmail</span></a></h1>
          <h2>PGP encryption for Gmail.</h2> -->
        </div>
      </div>
    </div>
    <div id="content_header"></div>
    <div id="site_content">
    	<div id="content">
			<form name="inputForm" action="MessageController?action=receive" 
						method="post">
				<h1>Enter the answer for question to read mail content</h1>
				<table align="center">
					<tr>
						<td><b>Question : </b></td>
						<td><label><%=request.getAttribute("messageQuestion") %></label></td>
					</tr>
					<tr>
						<td><b>Type in your answer : </b></td>
						<td><input type="text" name="userAnswer" size="100"/></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
						<%
							int triesCount = (Integer)session.getAttribute("answerTries");
							if(triesCount >= 5)
							{
						%>
							<Script type="text/javascript">  
								alert( "You have exhausted all your tries. Please close the browser and retry later." );
								window.close();  
							</Script>  
						<%
							}
							else if(triesCount > 0)
							{
						%>
							<span><font color="red">Your answer is not correct. <%=5-triesCount %> tries left. Please try again.</font></span>
						<%		
							}
						%>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div align="center">
								<input type="submit" value="Submit" id="submitBtn"/>
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
