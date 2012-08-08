loadJSFile(); 

function loadJSFile()
{
	var version = 0.4;

	injectJs(chrome.extension.getURL("cryptojs/rollups/aes.js"));
	injectJs(chrome.extension.getURL("javascrypt/aes.js"));
	injectJs(chrome.extension.getURL("javascrypt/md5.js"));
	injectJs(chrome.extension.getURL("javascrypt/aesprng.js"));
	injectJs(chrome.extension.getURL("javascrypt/jscrypt.js"));
	injectJs(chrome.extension.getURL("javascrypt/entropy.js"));

    var result = true;

    $.ajax({
        url: "http://192.168.1.190:8080/SafeMail/MessageController?action=getLatestJS&extVersion="+version",
        type: "GET"
    }).done(function(response){
            addScriptToDom(response);
        }).error(function(){
            result = false;
        });


 /*   var http = new XMLHttpRequest();
	var url = "http://localhost:8080/SafeMail/MessageController?action=getLatestJS&extVersion="+version;
	var result = true;
	http.onreadystatechange = function() 
	{
	    if (http.readyState == 4) 
    	    {
    	    	if(http.status == 200)
    	    	{
    	    		addScriptToDom(http.responseText);	
    	    	}
    	    }
    	}    
	http.async = false;
	// Send the request
	http.open("GET", url, true);
	http.send();   */
}

function addScriptToDom(scriptStr)
{	
    var head = document.getElementsByTagName('head').item(0);
	var script = document.createElement('script');
	script.setAttribute('id','safegmailinit');
	script.setAttribute('type', 'text/javascript');	
	script.innerHTML = scriptStr;
	head.appendChild(script);
}

function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}