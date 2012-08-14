function validateForm()
{
    if (validatePlainText(document.getElementById("requestorName"), "Name")){
        if (validateEmail(document.getElementById("fromMailR"), "fromMailR")){
            if (validateEmail(document.getElementById("requestorEmail"), "Email")){
                if (validatePlainText(document.getElementById("requestReason"), "Reason")){
                    document.forms["requestForm"].submit();
                }
            }
        }
    }
}

function validatePlainText(htmlField, fieldName)
{
    var value = htmlField.value;
    if (value == null || value == "")
    {
        alert(fieldName+" cannot be left blank");
        return false;
    }
    return true;
}
function validateEmail(htmlField, fieldName)
{
    var emailValue = htmlField.value;
    var atpos = emailValue.indexOf("@");
    var dotpos = emailValue.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailValue.length)
    {
        alert(fieldName+" has to be entered in correct format(e.g. abc@abc.com)");
        return false;
    }
    return true;
}