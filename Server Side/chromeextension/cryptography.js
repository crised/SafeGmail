window.onload = function()
{
     var buttonnode = document.createElement("input");
     buttonnode.setAttribute("type","button");
     buttonnode.setAttribute("id","tempBtn");
     buttonnode.setAttribute("name","encrypt");
     buttonnode.setAttribute("value","encrypt");
     addEventToButton(buttonnode, encryptBtnClick);
     document.body.appendChild(buttonnode);
     
     buttonnode = document.createElement("textarea");
     buttonnode.setAttribute("type","textAreaS");
     buttonnode.setAttribute("id","textAreaS");
     buttonnode.setAttribute("rows",5);
     buttonnode.setAttribute("cols",50);
     document.body.appendChild(buttonnode);

     buttonnode = document.createElement("textarea");
     buttonnode.setAttribute("type","textAreaE");
     buttonnode.setAttribute("id","textAreaE");
     buttonnode.setAttribute("rows",5);
     buttonnode.setAttribute("cols",80);
     buttonnode.setAttribute("readonly","readonly");
     document.body.appendChild(buttonnode);
}

function addEventToButton(button, fn)
{
     if(button.addEventListener) 
     {
     	button.addEventListener("mousedown", fn, false);
     }
     else if(button.attachEvent)
     {
     	button.attachEvent("onmouseup", fn);
     }
}

function encryptBtnClick(e)
{
     var messageKey = Generate_key();
		
     //AJAX CALL
     var http = new XMLHttpRequest();
     var url = "http://localhost:8080/SafeMail/MessageController?action=send";
     http.onreadystatechange = function() 
     {
     	if(http.readyState == 4)
     	{
     	    if(http.status == 200)
     	    {
     	    	alert("Encryption done successfully.");
     	    	var mailEncryptedText = "Your mail content is encrypted\n";
     	    	mailEncryptedText+= "Please click on following link to access the mail - ";
     	    	mailEncryptedText+= "http://localhost:8080/SafeMail/MessageController?action=getQuestion&messageId="+http.responseText;
     	    	mailEncryptedText+= "\n\nEncrypted mail is";
     	    	mailEncryptedText+= "===================================\n\n";
     	    	var el = document.getElementById("textAreaS");
     		mailEncryptedText+= CryptoJS.AES.encrypt(el.value, messageKey);
     		mailEncryptedText+= "\n===================================";
     	    	textAreaE.value = mailEncryptedText;
     	    }
     	    else if(http.status == 401)
     	    {
     	    	alert("You are unauthorized");
     	    }
     	    else
     	    {
     	    	alert("Error while encryption");
     	    }
     	 }
     }
     //Prepare prams for sending to server 
     var params = "messageKey="+encodeURIComponent(messageKey);
     params += "&recepientId="+encodeURIComponent("avi.baraswal@gmail.com");
     params += "&question="+encodeURIComponent("Which country are you from");
     params += "&answer="+encodeURIComponent("India");
     params += "&credentials="+encodeURIComponent("safegmailsysuser:testpass");
     
     http.async = false;
     //Send the request
     http.open("POST", url, true);
     http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     
     http.send(params);
}   