var decryptedMailDiv1 = document.getElementById("decryptedMail1");
var decryptedMailDiv2 = document.getElementById("decryptedMail2");
var encryptedMailDiv = document.getElementById("encryptedMail");

hideDecryptedMail();


function hideDecryptedMail(){

    decryptedMailDiv1.style.display = "none";
    decryptedMailDiv2.style.display = "none";
}

function showMailClickHandler(){

	var eText = document.getElementById("encryptedMailTxt");
	var decrypted = CryptoJS.AES.decrypt(eText.value, messageKey);

   // if (URI == 'true'){

        var text = decrypted.toString(CryptoJS.enc.Utf8);
		decryptedMailDiv2.innerHTML = decodeURIComponent(text);
		showEncryptedDiv(2);
	//}

    /*else{
        var decryptedMailTxtArea = document.getElementById(decryptedMailTxt);
		var text =hex2a(decrypted.toString());
		decryptedMailTxtArea.value = text;
		showEncryptedDiv(1);
	}*/
}

function showEncryptedDiv(showEncrypted){

    if(showEncrypted == 2){
        decryptedMailDiv2.style.display = "block";
	    encryptedMailDiv.style.display = "none";
	}
	else {
		decryptedMailDiv1.style.display = "block";
        encryptedMailDiv.style.display = "none";
	}

}

function hex2a(hex){
    var str = '';
    for (var i=0;i < hex.length; i+=2){str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));}
    return str;
}
