//Initializes this script
init();

function init() 
{
    theframe = getframe(document, 'canvas_frame');
    setInterval(changedURL, 1000);
    trackURL = true;
}

//Boolean to track url
var trackURL;

//Function called every 500 ms to check for change in url.
function changedURL(event)
{
   //alert(location.href);
   if(trackURL == true)
   {
      if(location.href.indexOf("#compose") != -1)
      {
         //alert('in compose');
         putButtons();
      }
   }
   else
   {
      if(location.href.indexOf("#compose") == -1)
      {
          //alert('out of compose');
          trackURL = true;
     }
   }
}

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue) {
    var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined") ? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
    var oCurrent;
    var oAttribute;
    for (var i = 0; i < arrElements.length; i++) {
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if (typeof oAttribute == "string" && oAttribute.length > 0) {
            if (typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))) {
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements[0];
}

function putButtons() 
{
  //Find the Send button
  if(!theframe.getElementById('encript'))
  {
    
    var sendrow = getElementsByAttribute(theframe, "input", "name", "subject");
    var buttonSend = getElementsByAttribute(theframe, "div", "class", "T-I J-J5-Ji Bq nS T-I-KE L3");
    	
    //If we don't find the row with the Send button on it then wait for a second
    //and try again
    if (!sendrow || !buttonSend) {
        return;    
    }
    
    trackURL = false;
    
    //Adding encrypt button
    var encryptDiv = theframe.createElement('div');
    encryptDiv.setAttribute("id", "encryptBtn");
    encryptDiv.setAttribute("class", "T-I J-J5-Ji Bq nS T-I-KE L3");
    encryptDiv.setAttribute("role", "button");
    encryptDiv.setAttribute("tabindex", "2");
    encryptDiv.setAttribute("style", "-webkit-user-select: none");
    encryptDiv.innerHTML = "<b style='-webkit-user-select: none; '>Encrypt</b>";
    
    buttonSend.parentNode.insertBefore(encryptDiv, buttonSend.nextSibling);
    
    //var encryptHtmlString = '<div id="encryptBtn" class="" role="button" tabindex="2" style="-webkit-user-select: none; "></div>';		
    //buttonSend.parentNode.innerHTML += encryptHtmlString;
    var encryptButton = getElementsByAttribute(theframe, "div", "id", "encryptBtn");
    
    addEventToElement(encryptButton, encryptBtnClick);
    
    
    
    var place = sendrow.parentNode.parentNode.parentNode;
    //Make sure we have not already added the buttons to this tag
    for (var k = 0; k < place.childNodes.length; k++) {
        knode = place.childNodes[k];
        if (knode.id == "encryptdiv") {
            return;
        }
    }
    
    //Adding encrypt checkbox
    var encryptCBoxRow = theframe.createElement("tr");	
    encryptCBoxRow.setAttribute("id", "encript");
    var htmlString = '<td class="eD">Encrypt?</td><td><input type="checkbox" name="boom" id="boom" style="margin-right:5px;" /></td>';
    encryptCBoxRow.innerHTML = htmlString;
    place.insertBefore(encryptCBoxRow, sendrow.nextSibling);
    
    
    //Adding encrypt checkbox
    var qaRow = theframe.createElement("tr");	
    qaRow.setAttribute("id", "encriptQA");
    htmlString = '<td></td><td><table id="q_and_a" style="display:none"><tr id="encryptdiv"><tr><td colspan="2" class="eD">Type a Question and Secret Answer that only the recipient can answer.</td></tr><tr><td class="eD">Question:</td><td><input type="text" id="textAreaS" name="question" style="width:100%" /></td></tr><tr><td class="eD">Answer:</td><td><input type="text" id="textAreaE" name="answer" style="width:100%" /></td></tr></td></tr></table></td>';
    qaRow.innerHTML = htmlString;
    place.insertBefore(qaRow, sendrow.nextSibling);
    
    addEventToElement(theframe.getElementById('boom'), showHideQA); 
    	
    
    //go back and recreate the buttons after any form inputs
    return;
    }
}

function addEventToElement(button, fn) 
{
    if (button.addEventListener) {
        button.addEventListener("click", fn, false);
    }
    else if (button.attachEvent) {
        button.attachEvent("click", fn);
    }
}

function showHideQA(event)
{
   var encryptCBox = theframe.getElementById('boom');
   var qaRow = theframe.getElementById('q_and_a');
   if(encryptCBox.checked == false)
   {
      qaRow.style.display = 'none';
   }
   else
   {
      qaRow.style.display = 'block';
   }
}

function encryptBtnClick(e) 
{
    extractIdFromTitle();
    var checkbox = getElementsByAttribute(theframe, "input", "name", "boom");
    if (checkbox && checkbox.checked) 
    {
        var target = theframe.getElementById('encript');
	 
        var from = extractIdFromTitle();
	
	var qwestion = getElementsByAttribute(theframe, "input", "name", "question");
	var answer = getElementsByAttribute(theframe, "input", "name", "answer");
        var qwestionText = qwestion.value;
        var answerText = answer.value;
        if (qwestionText == "" || answerText == "") 
        {
	    alert("Question or answer field is empty");
	    return false;
        }
        
        var messageKey = Generate_key();
        var textframeObject = getElementsByAttribute(theframe, "iframe", "class", "Am Al editable")
        var textframe = getFrameFromObject(theframe, textframeObject);
        var bodyText = textframe.body.innerText;
        
        var params = "messageKey=" + encodeURIComponent(messageKey);
        params += "&recepientId=" + encodeURIComponent(from);
        params += "&question=" + encodeURIComponent(qwestionText);
        params += "&answer=" + encodeURIComponent(answerText);
	params += "&credentials="+encodeURIComponent("safegmailsysuser:testpass");
     
	//var spinner = new Spinner(opts).spin(target);
	//qwestion.disabled = true;
	//answer.disabled = true;
	//checkbox.disabled = true;
        
        //AJAX CALL
        var http = new XMLHttpRequest();
        var url = "http://www.safegmail.com:8080/SafeMail/MessageController?action=send";
	var result = true;
			
        http.onreadystatechange = function() 
        {
            if (http.readyState == 4) 
            {
                if (http.status == 200) 
                {
                    removeAllChildrenOfNode(textframe.body);
                
                    var hrefURL = "http://www.safegmail.com:8080/SafeMail/MessageController?action=getQuestion&messageId=" + http.responseText
                    var mailDiv = document.createElement("div");
		    mailDiv.innerHTML = "Your mail content is encrypted\n";
		    textframe.body.appendChild(mailDiv);
		        
		    mailDiv = document.createElement("div");
		    mailDiv.innerHTML = "Click <a href='"+hrefURL+"'>Here</a> to access the mail content.";
		    textframe.body.appendChild(mailDiv);
		    
		    mailDiv = document.createElement("div");
		    mailDiv.innerHTML = "<br><br>Encrypted mail is";
		    textframe.body.appendChild(mailDiv);
    
    		    mailDiv = document.createElement("div");
		    mailDiv.innerHTML = "=====================================================================";
		    textframe.body.appendChild(mailDiv);                
                    
                    mailDiv = document.createElement("div");
		    mailDiv.innerHTML = CryptoJS.AES.encrypt(bodyText, messageKey);
		    textframe.body.appendChild(mailDiv);                
                    
                    mailDiv = document.createElement("div");
		    mailDiv.innerHTML = "=====================================================================";
		    textframe.body.appendChild(mailDiv);                
                    alert("Encryption done successfully.");
	        } else {
	            alert("Error while encryption.");
		    result = false;
                }
                displaySavingGmailDiv("Encrypting...", false);
            }
            
	};
        //Prepare prams for sending to server 


        http.async = false;
        //Send the request
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	displaySavingGmailDiv("Encrypting...", true);
        http.send(params);
	return result;
    }
}     

function displaySavingGmailDiv(savingMessage, show)
{
   if(show == true)
   {
      var messageSpan = "<div id='innerc' style='position:absolute; top:50%; left: 40%; height:10em; margin-top:-5em'><font color='0xffffff' size='22' weight='bold'>"+savingMessage+"</font></div>";
      var freezeDiv = document.createElement("div");
      freezeDiv.innerHTML = messageSpan;
      freezeDiv.setAttribute("align", "center");
      freezeDiv.id = "freezeDiv";
      freezeDiv.style.cssText = "display:table-cell; vertical-align: middle; position:absolute; top:0; right:0; width:" + screen.width + "px; height:" + screen.height + "px; background-color: #000000; opacity:0.5; filter:alpha(opacity=50)";    
      document.getElementsByTagName("body")[0].appendChild(freezeDiv );
   }
   else
   {
      var freezeDiv = document.getElementById("freezeDiv");
      document.getElementsByTagName("body")[0].removeChild(freezeDiv );
   }
}

////////////////////////////////////////////////////////////////////
/////////////////Util methods///////////////////////////////////////
////////////////////////////////////////////////////////////////////
function getFrameFromObject(doc, iframeEl)
{
	if (iframeEl.contentDocument) { // DOM
        //Works for Firefox
        return iframeEl.contentDocument;
    } else if (iframeEl.contentWindow) { // IE win
        //Called for Chrome
        //var myprop = listprop(iframeEl.contentWindow.document);
        return iframeEl.contentWindow.document;
    }
}
//Find the frame containing the actual body of the emails
function getframe(doc, frameId) {
    var iframeEl = doc.getElementById(frameId);
    return getFrameFromObject(doc, iframeEl);
}

function extractIdFromTitle()
{
    var title = document.title;
    var tokens = title.split("-");
    return trimString(tokens[1]);
}

function trimString(str) 
{
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

function removeAllChildrenOfNode(parentNode)
{
   while (parentNode.hasChildNodes()) 
   {
      parentNode.removeChild(parentNode.lastChild);
   }
}