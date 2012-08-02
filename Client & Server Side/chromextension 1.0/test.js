(function($)
{
     // falta poner :visible
    //getGmailFullFrame().find('div.T-I.J-J5-Ji.Bq.nS.T-I-KE.L3:visible'
    setInterval(main(),1000);

	function main() {

        //encryptMail function
        var encrypted = false;
        var encryptMail;

        if(getGmailFullFrame() < 2) return;
        if(!(getGmailFullFrame().find('div.T-I.J-J5-Ji.Bq.nS.T-I-KE.L3'))) return;
        if(!(getGmailFullFrame().find('input[name="subject"]'))) return;

        if($checkBox) putbuttons();

        function putbuttons()
        {
            var $sendButton = getGmailFullFrame().find('div.T-I.J-J5-Ji.Bq.nS.T-I-KE.L3');
            var $subjectInput = getGmailFullFrame().find('input[name="subject"]');
            var $checkBox = $('<tr id="encrypt"><td class="eD">Encrypt?</td><td><input type="checkbox" name="boom" id="boom" style="margin-right:5px;" /></td></tr>');
            var $form = $('<td></td><td><table id="q_and_a" style="display:block"><tr id="encryptdiv"><tr><td colspan="2" class="eD">Type a Question and Secret Answer that only the recipient can answer.</td></tr><tr><td class="eD">Question:</td><td><input type="text" id="textAreaS" name="question" style="width:100%" /></td></tr><tr><td class="eD">Answer:</td><td><input type="text" id="textAreaE" name="answer" style="width:100%" /></td></tr></td></tr></table></td>');
            var $encryptSend = $sendButton.clone().removeAttr('id').addClass('safegmail');

            // put Encrypt&Send button
            $encryptSend.find('b').text('Send + Encrypt');
            $sendButton.after($encryptSend);
            $encryptSend.hide();
            $encryptSend.click(trigger);


            //put checkbox
            $subjectInput.offsetParent().closest('tr').next().next().after($checkBox);
            $checkBox.find('input').click(trigger2);

            //put form
            $subjectInput.offsetParent().closest('tr').next().next().next().after($form);
            $form.hide();
        }


        function trigger(evt)
        {

         if(!encrypted && $checkBox.find('input').is(':checked'))
         {

            var mail = getMailContent();
            if(mail)
            {
                encryptMailText(mail, function(a,b){
                    setMailContent(a,b);
                    encrypted = true;
                    simulateClick($sendButton);
                });

            }

         }


         }

        function trigger2()
        {

            if ($checkBox.find('input').is(':checked'))
            {
                $sendButton.hide();
                $encryptSend.show();
                $form.show();
            }
            else
            {
                $sendButton.show();
                $encryptSend.hide();
                $form.hide();
            }
        }

        function getMailContent()
        {
            var re = {content:'',to:'',question:'',answer:''};

            //find first destination email address
            var destinations = getGmailFullFrame().find('textarea[name=to]').val();
            var ms = destinations.match(/[a-z][a-z0-9\.\-\+\_]*\@[a-z0-9\-\.]+/i);
            if (!ms) ms = ['',''];
            re.to = ms[0];
            //watch encodeURI - server JS should decode after decrypting.
            re.content = encodeURIComponent(getGmailFullFrame().find('iframe').contents().find('body').text());

            re.question = $form.find('input[name="question"]').val();
            re.answer = $form.find('input[name="answer"]').val().replace(/\s/g, "").toLowerCase();

            if(!re.question || !re.answer)

            {
                alert("Please write Question and Answer");
                return mail = null;
            }

            var letterNumber = /^[0-9a-zA-Z \-\'\_\?]+$/;

            if(!re.question.match(letterNumber) || !re.answer.match(letterNumber))
            {
                alert("Please try not using special characters in Question and Answer");
                return mail = null;
            }

            return re;
        }

        function setMailContent(a,b)
        {
            var hrefURL = "http://www.safegmail.com:8080/SafeMail/MessageController?action=getQuestion&urlencoded=true&messageId=" + b;
            var hrefURL2 = "http://www.safegmail.com";

            var html = [];
            html.push("<p>Your mail content is encrypted.</p>");
            html.push("<p>Click <a href='"+hrefURL+"'>Here</a> to access the mail content.</p>");
            html.push("<br><p>Encrypted mail is: (copy text between dashes)</p>");
            html.push("<p>=====================================================================</p>");
            html.push('<p>'+a+'</p>');
            html.push("<p>=====================================================================</p>");
            html.push("<p>Send free confidentials e-mails through Gmail® through<a href='"+hrefURL2+"'> SafeGmail</a></p>");

            var s = html.join('\n');


            getGmailFullFrame().find('iframe').contents().find('body').html(s);
        }

        function encryptMailText(mail,cb)
        {

            var messageKey = Generate_key();

            var params = "messageKey=" + encodeURIComponent(messageKey);
            params += "&recepientId=" + encodeURIComponent(mail.to);
            params += "&question=" + encodeURIComponent(mail.question);
            params += "&answer=" + encodeURIComponent(CryptoJS.MD5(mail.answer));
            params += "&version=" + encodeURIComponent("1.0");
            params += "&credentials="+encodeURIComponent("safegmailsysuser:testpass");

            console.log(params);

            // AJAX CALL
            var http = new XMLHttpRequest();
            var url = "http://www.safegmail.com:8080/SafeMail/MessageController?action=send";
            var result = true;

            http.onreadystatechange = function()
            {
                if (http.readyState == 4)
                {
                    displaySavingGmailDiv("Encrypting...", false);
                    if (http.status == 200)
                    {
                        cb(CryptoJS.AES.encrypt(encodeURI(mail.content), messageKey),http.responseText);

                    }
                    else
                    {
                        alert("Error while encryption.");
                        result = false;
                    }
                }
            };
            // Prepare prams for sending to server
            http.async = false;
            // Send the request
            http.open("POST", url, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            displaySavingGmailDiv("Encrypting...", true);
            http.send(params);
        }

        function simulateClick(node)
        {
            fireEvent(node,'mousedown');
            fireEvent(node,'mouseup');
        }

        function fireEvent(node,evtName)
        {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent(evtName, true, true, window, 0, 0, 0, 0, 0,false, false, false, false, 0, null);
            node[0].dispatchEvent(evt);
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
                speed: 0.1, // Rounds per second
                trail: 62, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };
            var spinner = new Spinner(opts);
            var $freezeDiv = $('<div align="center" id="freezeDiv" style="display:table-cell; vertical-align: middle; position:absolute; top:0; right:0; width:" + screen.width + "px; height:" + screen.height + "px; background-color: #000000; opacity:0.5;" ><div id="innerc" style="position:absolute; top:50%; left: 40%; height:10em; margin-top:-5em"><span style="color:white; font-size:22px; font-weight: bold" id="wait">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+savingMessage+"</span></div></div>');

            if(show == true)
            {
                $('body').append($freezeDiv);
                spinner.spin($freezeDiv.find("#wait")[0]);
            }
            else
            {
                spinner.stop();
                $freezeDiv.remove();
            }
        }

    }

    var frameDoc = get_gmail_frame();
    var frameContents = $(frameDoc).contents();

	//Tools
	function get_gmail_frame() {
    var b = document.getElementById("canvas_frame");
    if (b == null || b === undefined) return;
    var a = (b.contentWindow || b.contentDocument);
    if (a.document) {
        a = a.document;
    }
    return a;
	}
	var refreshGmailFrame = function(){
	frameDoc = get_gmail_frame();
	frameContents = $(frameDoc).contents();
	};

	var getGmailFullFrame = function(){
	if (frameContents.length < 2){
		refreshGmailFrame();
	}
	return frameContents;
	};
	
})(jQuery);