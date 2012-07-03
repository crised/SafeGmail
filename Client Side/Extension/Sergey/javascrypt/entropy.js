
    //  Entropy collection utilities

    /*	Start by declaring static storage and initialise
    	the entropy vector from the time we come through
    	here. */
	
    var entropyData = new Array();   	    // Collected entropy data
    var edlen = 0;  	    	    	    // Keyboard array data length
 
    addEntropyTime();	    	    	    // Start entropy collection with page load time
    ce();   	    	    	    	    // Roll milliseconds into initial entropy

    //	Add a byte to the entropy vector
    
    function addEntropyByte(b) {
    	entropyData[edlen++] = b;
    }
            
    /*	Capture entropy.  When the user presses a key or performs
	various other events for which we can request
	notification, add the time in 255ths of a second to the
	entropyData array.  The name of the function is short
	so it doesn't bloat the form object declarations in
	which it appears in various "onXXX" events.  */
    
    function ce() {
    	addEntropyByte(Math.floor((((new Date).getMilliseconds()) * 255) / 999));
    }
    
    //	Add a 32 bit quantity to the entropy vector
    
    function addEntropy32(w) {
    	var i;
	
	for (i = 0; i < 4; i++) {
	    addEntropyByte(w & 0xFF);
	    w >>= 8;
    	}
    }
    
    /*	Add the current time and date (milliseconds since the epoch,
    	truncated to 32 bits) to the entropy vector.  */
	
    function addEntropyTime() {
    	addEntropy32((new Date()).getTime());
    }

    /*  Start collection of entropy from mouse movements. The
	argument specifies the  number of entropy items to be
	obtained from mouse motion, after which mouse motion
	will be ignored.  Note that you can re-enable mouse
	motion collection at any time if not already underway.  */
	
    var mouseMotionCollect = 0;
    var oldMoveHandler;     	    // For saving and restoring mouse move handler in IE4
	
    function mouseMotionEntropy(maxsamp) {
    	if (mouseMotionCollect <= 0) {
	    mouseMotionCollect = maxsamp;
    	    if ((document.implementation.hasFeature("Events", "2.0")) &&
	    	document.addEventListener) {
    	    	//  Browser supports Document Object Model (DOM) 2 events
		document.addEventListener("mousemove", mouseMoveEntropy, false);
	    } else {
		if (document.attachEvent) {
	    	    //  Internet Explorer 5 and above event model
		    document.attachEvent("onmousemove", mouseMoveEntropy);
		} else {
		    //	Internet Explorer 4 event model
	    	    oldMoveHandler = document.onmousemove;
		    document.onmousemove = mouseMoveEntropy;
		}
	    }
//dump("Mouse enable", mouseMotionCollect);
	}
    }
    
    /*	Collect entropy from mouse motion events.  Note that
    	this is craftily coded to work with either DOM2 or Internet
	Explorer style events.  Note that we don't use every successive
	mouse movement event.  Instead, we XOR the three bytes collected
	from the mouse and use that to determine how many subsequent
	mouse movements we ignore before capturing the next one.  */
	
    var mouseEntropyTime = 0;	    // Delay counter for mouse entropy collection
	
    function mouseMoveEntropy(e) {
    	if (!e) {
	    e = window.event;	    // Internet Explorer event model
	}
	if (mouseMotionCollect > 0) {
	    if (mouseEntropyTime-- <= 0) {
	    	addEntropyByte(e.screenX & 0xFF);
	    	addEntropyByte(e.screenY & 0xFF);
	    	ce();
	    	mouseMotionCollect--;
	    	mouseEntropyTime = (entropyData[edlen - 3] ^ entropyData[edlen - 2] ^
		    	    	    entropyData[edlen - 1]) % 19;
//dump("Mouse Move", byteArrayToHex(entropyData.slice(-3)));
    	    }
	    if (mouseMotionCollect <= 0) {
	    	if (document.removeEventListener) {
		    document.removeEventListener("mousemove", mouseMoveEntropy, false);
		} else if (document.detachEvent) {
		    document.detachEvent("onmousemove", mouseMoveEntropy);
		} else {
		    document.onmousemove = oldMoveHandler;
		}
//dump("Spung!", 0);
	    }
	}
    }    
    
    /*	Compute a 32 byte key value from the entropy vector.
    	We compute the value by taking the MD5 sum of the even
	and odd bytes respectively of the entropy vector, then
	concatenating the two MD5 sums.  */
    
    function keyFromEntropy() {
	var i, k = new Array(32);
	
	if (edlen == 0) {
	    alert("Blooie!  Entropy vector void at call to keyFromEntropy.");
	}
//dump("Entropy bytes", edlen);

	md5_init();
	for (i = 0; i < edlen; i += 2) {
	    md5_update(entropyData[i]);
	}
	md5_finish();
    	for (i = 0; i < 16; i++) {
	    k[i] = digestBits[i];
	}

	md5_init();
	for (i = 1; i < edlen; i += 2) {
	    md5_update(entropyData[i]);
	}
	md5_finish();
    	for (i = 0; i < 16; i++) {
	    k[i + 16] = digestBits[i];
	}
	
//dump("keyFromEntropy", byteArrayToHex(k));
	return k;
    }
