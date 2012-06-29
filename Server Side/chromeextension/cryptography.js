window.onload = function()
{
     var buttonnode = document.createElement("input");
     buttonnode.setAttribute("type","button");
     buttonnode.setAttribute("id","tempBtn");
     buttonnode.setAttribute("name","encrypt");
     buttonnode.setAttribute("value","encrypt");
     addEventToButton(buttonnode, onBtnClick);
     document.body.appendChild(buttonnode);
     
     buttonnode = document.createElement("input");
     buttonnode.setAttribute("type","button");
     buttonnode.setAttribute("id","tempBtn1");
     buttonnode.setAttribute("name","decrypt");
     buttonnode.setAttribute("value","decrypt");
     addEventToButton(buttonnode, onBtnClick1);
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
     buttonnode.setAttribute("cols",50);
     document.body.appendChild(buttonnode);
     
     buttonnode = document.createElement("textarea");
     buttonnode.setAttribute("type","textAreaD");
     buttonnode.setAttribute("id","textAreaD");
     buttonnode.setAttribute("rows",5);
     buttonnode.setAttribute("cols",50);
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

var messageKey;
function onBtnClick(e)
{
     var el = document.getElementById("textAreaS");
     window.event.cancelBubble = true;
     messageKey = Generate_key();
     textAreaE.value = CryptoJS.AES.encrypt(el.value, messageKey);
     
     //AJAX CALL
     var http = new XMLHttpRequest();
     var url = "http://localhost:8080/SafeMail/MessageController?action=send";
     http.onreadystatechange = function() 
     {
     	if(http.readyState == 4)	
     	//&& http.status == 200)
     	{
     	    alert("Response is : "+http.responseText);
     	}
     	alert(http.readyState + " status --> "+http.status);
     }
     //Prepare prams for sending to server 
     var params = "messageKey="+encodeURIComponent(messageKey);
     params += "&recepientId="+encodeURIComponent("avi.baraswal@gmail.com");
     params += "&question="+encodeURIComponent("Which country are you from");
     params += "&answer="+encodeURIComponent("India");
     
     //Send the request
     http.open("POST", url, true);
     http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     
     http.send(params);
}

function onBtnClick1(e)
{
     //var el = document.getElementById("textAreaE");
     //window.event.cancelBubble = true;
     //var text = CryptoJS.AES.decrypt(el.value, messageKey);
     //textAreaD.value = hex2a(text.toString());

     //AJAX CALL
     var http = new XMLHttpRequest();
     var url = "http://localhost:8080/SafeMail/MessageController?action=receive";
     http.onreadystatechange = function() 
     {
     	if(http.readystate == 4 && http.status == 200)
     	{
     	    alert(http.responseText);
     	}
     	alert(http.readyState);
     }
     //Prepare prams for sending to server 
     var params = "messageId="+encodeURIComponent("3494d4dc-4c65-42e8-89ec-0274fa496999");
     params += "&userAnswer="+encodeURIComponent("India");
     
     //Send the request
     http.open("POST", url, true);
     http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     
     http.send(params);
}

function hex2a(hex)
{
     var str = '';
     for (var id=0;i < hex.length; i+=2)
     {	
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16)); 
     }
     return str;
}
     