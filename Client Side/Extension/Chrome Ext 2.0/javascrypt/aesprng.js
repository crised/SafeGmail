
    //  AES based pseudorandom number generator

    /*  Constructor.  Called with an array of 32 byte (0-255) values
	containing the initial seed.  */

    function AESprng(seed) {
	this.key = new Array();
	this.key = seed;
	this.itext = hexToByteArray("9F489613248148F9C27945C6AE62EECA3E3367BB14064E4E6DC67A9F28AB3BD1");
	this.nbytes = 0;    	    // Bytes left in buffer
	
	this.next = AESprng_next;
	this.nextbits = AESprng_nextbits;
	this.nextInt = AESprng_nextInt;
	this.round = AESprng_round;
	
	/*  Encrypt the initial text with the seed key
	    three times, feeding the output of the encryption
	    back into the key for the next round.  */
	
	bsb = blockSizeInBits;
	blockSizeInBits = 256;    
	var i, ct;
    	for (i = 0; i < 3; i++) {
	    this.key = rijndaelEncrypt(this.itext, this.key, "ECB");
	}
	
	/*  Now make between one and four additional
	    key-feedback rounds, with the number determined
	    by bits from the result of the first three
	    rounds.  */
	
	var n = 1 + (this.key[3] & 2) + (this.key[9] & 1);    
    	for (i = 0; i < n; i++) {
	    this.key = rijndaelEncrypt(this.itext, this.key, "ECB");
	}
    	blockSizeInBits = bsb;
    }
    
    function AESprng_round() {
	bsb = blockSizeInBits;
	blockSizeInBits = 256;    
    	this.key = rijndaelEncrypt(this.itext, this.key, "ECB");
	this.nbytes = 32;
    	blockSizeInBits = bsb;
    }
    
    //	Return next byte from the generator

    function AESprng_next() {
    	if (this.nbytes <= 0) {
	    this.round();
	}
	return(this.key[--this.nbytes]);
    }
    
    //	Return n bit integer value (up to maximum integer size)
    
    function AESprng_nextbits(n) {
    	var i, w = 0, nbytes = Math.floor((n + 7) / 8);

	for (i = 0; i < nbytes; i++) {
	    w = (w << 8) | this.next();
	}
	return w & ((1 << n) - 1);
    }

    //  Return integer between 0 and n inclusive
    
    function AESprng_nextInt(n) {
    	var p = 1, nb = 0;
	
	//  Determine smallest p,  2^p > n
	//  nb = log_2 p
	
	while (n >= p) {
	    p <<= 1;
	    nb++;
	}
	p--;
	
	/*  Generate values from 0 through n by first generating
	    values v from 0 to (2^p)-1, then discarding any results v > n.
	    For the rationale behind this (and why taking
	    values mod (n + 1) is biased toward smaller values, see
	    Ferguson and Schneier, "Practical Cryptography",
	    ISBN 0-471-22357-3, section 10.8).  */

	while (true) {
    	    var v = this.nextbits(nb) & p;
	    
	    if (v <= n) {
	    	return v;
	    }
	}
    }
