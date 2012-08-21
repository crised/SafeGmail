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
    var text = decrypted.toString(CryptoJS.enc.Utf8);
    decryptedMailDiv2.innerHTML = decodeURIComponent(text);
	showEncryptedDiv(2);
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