//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);
// Initializes this script
init();

function init() 
{
    theframe = getframe(document, 'canvas_frame');
    setInterval(changedURL, 1000);
    trackURL = true;
	encrypted = false;
}

//Boolean to track url
var trackURL;

// Function called every 500 ms to check for change in url.
function changedURL(event)
{
   //alert(location.href);
   if(trackURL == true)
   {
      if(location.href.indexOf("#compose") != -1 || location.href.indexOf("#drafts/") != -1 )
      {
         //alert('in compose');
         putButtons();
      }
   }
   else
   {
      if(location.href.indexOf("#compose") == -1 || location.href.indexOf("#drafts/") != -1)
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
    // addEventToElement(buttonSend, sendButtonClick, 'keydown');
    
    // If we don't find the row with the Send button on it then wait for a
	// second
    // and try again
    if (!sendrow || !buttonSend) {
        return;    
    }
    
    trackURL = false;
    
    // Adding encrypt button
    var encryptDiv = theframe.createElement('div');
    encryptDiv.setAttribute("id", "encryptBtn");
    encryptDiv.setAttribute("class", "T-I J-J5-Ji Bq nS T-I-KE L3");
    encryptDiv.setAttribute("role", "button");
    encryptDiv.setAttribute("tabindex", "2");
    encryptDiv.setAttribute("style", "-webkit-user-select: none");
    encryptDiv.innerHTML = "<b style='-webkit-user-select: none; '>Send & Encrypt</b>";
    encryptDiv.style.display = 'none';
    
    buttonSend.parentNode.insertBefore(encryptDiv, buttonSend.nextSibling);
    
    // var encryptHtmlString = '<div id="encryptBtn" class="" role="button"
	// tabindex="2" style="-webkit-user-select: none; "></div>';
    // buttonSend.parentNode.innerHTML += encryptHtmlString;
    var encryptButton = getElementsByAttribute(theframe, "div", "id", "encryptBtn");
    
    addEventToElement(encryptButton, encryptBtnClick);
    
    
    var place = sendrow.parentNode.parentNode.parentNode;
    // Make sure we have not already added the buttons to this tag
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
    addEventToElement(theframe.getElementById('boom'), showHideQA);
    
    
    // Adding encrypt checkbox
    var qaRow = theframe.createElement("tr");	
    qaRow.setAttribute("id", "encriptQA");
    htmlString = '<td></td><td><table id="q_and_a" style="display:none"><tr id="encryptdiv"><tr><td colspan="2" class="eD">Type a Question and Secret Answer that only the recipient can answer.</td></tr><tr><td class="eD">Question:</td><td><input type="text" id="textAreaS" name="question" style="width:100%" /></td></tr><tr><td class="eD">Answer:</td><td><input type="text" id="textAreaE" name="answer" style="width:100%" /></td></tr></td></tr></table></td>';
    qaRow.innerHTML = htmlString;
    place.insertBefore(qaRow, sendrow.nextSibling);
    
     
    	
    
    // go back and recreate the buttons after any form inputs
    return;
    }
}

function sendButtonClick(event)
{
   var checkbox = theframe.getElementById('boom');
   if (checkbox && checkbox.checked && !encrypted) 
    {
		alert('You have sent unencrypted email!');
		/*
		 * if (confirm('Are you sure you want to send unencrypted email?')) {
		 * encrypted = false;
		 * 
		 * return true;
		 *  } else { cancelBubble(event); var btn =
		 * document.getElementById('link_cs'); fireClick(btn); return false; }
		 */
	}
	encrypted = false;
}

function showHideQA(event)
{
	var encryptCBox = theframe.getElementById('boom');
	var qaRow = theframe.getElementById('q_and_a');
	var buttonSend = getElementsByAttribute(theframe, "div", "class", "T-I J-J5-Ji Bq nS T-I-KE L3");
	var encryptBtn = getElementsByAttribute(theframe, "div", "id", "encryptBtn");
	if(encryptCBox.checked == false)
	{
		qaRow.style.display = 'none';
		buttonSend.style.display = null;
		encryptBtn.style.display = 'none';
	}
	else
	{
		qaRow.style.display = 'block';
		buttonSend.style.display = 'none';
		encryptBtn.style.display = null;
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
        
        answerText = canonicalString(answerText);
        //Apply hash to answer text
        answerText = CryptoJS.MD5(answerText);
        
        var messageKey = Generate_key();
        var textframeObject = getElementsByAttribute(theframe, "iframe", "class", "Am Al editable")
        var textframe = getFrameFromObject(theframe, textframeObject);
        var bodyText = textframe.body.innerText;
        
        var params = "messageKey=" + encodeURIComponent(messageKey);
        params += "&recepientId=" + encodeURIComponent(from);
        params += "&question=" + encodeURIComponent(qwestionText);
        params += "&answer=" + encodeURIComponent(answerText);
		params += "&credentials="+encodeURIComponent("safegmailsysuser:testpass");
     
        // AJAX CALL
        var http = new XMLHttpRequest();
        var url = "http://localhost:8080/SafeMail/MessageController?action=send";
		var result = true;
			
        http.onreadystatechange = function() 
        {
            if (http.readyState == 4) 
            {
                if (http.status == 200) 
                {
                    removeAllChildrenOfNode(textframe.body);
                
                    var hrefURL = "http://localhost:8080/SafeMail/MessageController?action=getQuestion&messageId=" + http.responseText
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
	                mailDiv.setAttribute("id", "encMailContent");
	                mailDiv.innerHTML = CryptoJS.AES.encrypt(bodyText, messageKey);
	                textframe.body.appendChild(mailDiv);
	                
	                mailDiv = document.createElement("div");
	                mailDiv.innerHTML = "=====================================================================";
	                textframe.body.appendChild(mailDiv);
	                
				    var buttonSend = getElementsByAttribute(theframe, "div", "class", "T-I J-J5-Ji Bq nS T-I-KE L3");
	        	    var evt = document.createEvent("MouseEvents");
	    		    evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0,
	        							false, false, false, false, 0, null);
	        	    buttonSend.dispatchEvent(evt);
	        	    evt = document.createEvent("MouseEvents");
	        	    evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0,
			            							false, false, false, false, 0, null);
	        	    buttonSend.dispatchEvent(evt);
                } 
                else 
                {
                	alert("Error while encryption.");
                	result = false;
                }
                displaySavingGmailDiv("Encrypting...", false);
            }
        };
        // Prepare prams for sending to server
		http.async = false;
		// Send the request
		http.open("POST", url, true);
		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		displaySavingGmailDiv("Encrypting...", true);
		http.send(params);
		return result;
    } 
    else  
    {
		alert('You need to click on checkbox, then fill in Question and Answer.');
	}
}     

function displaySavingGmailDiv(savingMessage, show)
{
	var opts = {
			lines: 13, // The number of lines to draw
			length: 11, // The length of each line
			width: 6, // The line thickness
			radius: 10, // The radius of the inner circle
			rotate: 29, // The rotation offset
			color: '#fff', // #rgb or #rrggbb
			speed: 1.3, // Rounds per second
			trail: 62, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto' // Left position relative to parent in px
		};
	var spinner = new Spinner(opts);
		
   if(show == true)
   {
		
      var messageSpan = "<div id='innerc' style='position:absolute; top:50%; left: 40%; height:10em; margin-top:-5em'><span style='color:white; font-size:22px; font-weight: bold' id='wait'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+savingMessage+"</span></div>";
      var freezeDiv = document.createElement("div");
      freezeDiv.innerHTML = messageSpan;
      freezeDiv.setAttribute("align", "center");
      freezeDiv.id = "freezeDiv";
      freezeDiv.style.cssText = "display:table-cell; vertical-align: middle; position:absolute; top:0; right:0; width:" + screen.width + "px; height:" + screen.height + "px; background-color: #000000; opacity:0.5; filter:alpha(opacity=50)";    
      document.getElementsByTagName("body")[0].appendChild(freezeDiv );
	  spinner.spin(document.getElementById("wait"));
   }
   else
   {
      var freezeDiv = document.getElementById("freezeDiv");
      document.getElementsByTagName("body")[0].removeChild(freezeDiv );
	  spinner.stop();
   }
}

////////////////////////////////////////////////////////////////////
// ///////////////Util methods///////////////////////////////////////
// //////////////////////////////////////////////////////////////////
function getFrameFromObject(doc, iframeEl)
{
	if (iframeEl.contentDocument) { // DOM
        // Works for Firefox
        return iframeEl.contentDocument;
    } else if (iframeEl.contentWindow) { // IE win
        // Called for Chrome
        // var myprop = listprop(iframeEl.contentWindow.document);
        return iframeEl.contentWindow.document;
    }
}

function cancelBubble(e) {
 var evt = e ? e:window.event;
 if (evt.stopPropagation)    evt.stopPropagation();
 if (evt.cancelBubble!=null) evt.cancelBubble = true;
 if (evt.bubbles!=null) evt.bubbles = false;
}

function removeEventHandler(elem,eventType,handler) {
 if (elem.removeEventListener) 
    elem.removeEventListener (eventType,handler,false);
 if (elem.detachEvent)
    elem.detachEvent ('on'+eventType,handler); 
}

function addEventToElement(button, fn, eventType) 
{
	if(!eventType) eventType = "click";
    if (button.addEventListener) {
        button.addEventListener("click", fn, true);
    }
    else if (button.attachEvent) {
        button.attachEvent("click", fn);
    }
}

function fireClick(node){
	if ( document.createEvent ) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, false);
		node.dispatchEvent(evt);	
	} else if( document.createEventObject ) {
		node.fireEvent('onclick') ;	
	} else if (typeof node.onclick == 'function' ) {
		node.onclick();	
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

function canonicalString(str)
{
    return trimString(str).toLowerCase();
}

function removeAllChildrenOfNode(parentNode)
{
   while (parentNode.hasChildNodes()) 
   {
      parentNode.removeChild(parentNode.lastChild);
   }
}