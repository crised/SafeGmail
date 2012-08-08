(function($)
{
    var $canvas = $('#canvas_frame').contents();
    setInterval(init,1000);

    function init() {



        if((window.location.href.indexOf('compose')) == -1 && (window.location.href.indexOf('draft')) == -1) return;
        if(($canvas.length < 1)) return;                                          // just in case canvas_frame ain't loaded
        if($canvas.find('div.T-I.J-J5-Ji.Bq.nS.T-I-KE.L3').length == 0) return;   //Send not found
        if($canvas.find('input[name="subject"]').length == 0) return;             //Subject not found
        if($canvas.find('div.safegmail111').length != 0) return;                  //Encrypt+Send already placed
        if($canvas.find('#encrypt111').length != 0) return;                       //Checkbox already placed
        if($canvas.find('#q_and_a111').length != 0) return;                       //Form already placed


        var $sendButton = $canvas.find('div.T-I.J-J5-Ji.Bq.nS.T-I-KE.L3');
        var $subjectInput = $canvas.find('input[name="subject"]');

        main($sendButton, $subjectInput);

    }


    function main($sendButton, $subjectInput) {

        var $checkBox = $('<tr id="encrypt111"><td class="eD">Encrypt?</td><td><input type="checkbox" name="boom" id="boom" style="margin-right:5px;" /></td></tr>');
        var $form = $('<td></td><td><table id="q_and_a111" style="display:block"><tr id="encryptdiv"><tr><td colspan="2" class="eD">Type a Question and Secret Answer that only the recipient can answer.</td></tr><tr><td class="eD">Question:</td><td><input type="text" id="textAreaS" name="question" style="width:100%" /></td></tr><tr><td class="eD">Answer:</td><td><input type="text" id="textAreaE" name="answer" style="width:100%" /></td></tr></td></tr></table></td>');
        var $encryptSend = $sendButton.clone().removeAttr('id').addClass('safegmail111');

        //var $expCheckBox  = $('<tr id="expirationRadios1"><td></td><td><table id="expirationRadios" style="display:solid"><tr><td><input type="radio" name="expRadios" id="dontExpire" checked="true"/><label for="dontExpire" class="eD">Never Expire</label> &nbsp;&nbsp;<input type="radio" name="expRadios" id="addTTL"/><label for="addTTL" class="eD">Add Time To Live</label></td></tr></table></td></tr>');
        var $expCheckBox = $('<tr id="expCheckBox"><td class="eD">Set Expiration?</td><td><input type="checkbox" name="boom1" id="boom1" style="margin-right:5px;" /></td></tr>');
        var $select = $('<tr id="expCheckBox"><td></td></td><td><select><option value="0.17">10 minutes</option><option value="1">1 hour</option><option value="24">1 day</option><option value="360" selected="selected">15 day</option>/select></td></tr>');


        // put Encrypt&Send button
        $encryptSend.find('b').text('Send + Encrypt');
        $sendButton.after($encryptSend);
        $encryptSend.hide();
        $encryptSend.click(trigger);


        //put checkbox
        $subjectInput.offsetParent().closest('tr').next().next().after($checkBox);


        //put form
        //$checkBox.after($form);
        $subjectInput.offsetParent().closest('tr').next().next().next().after($form);
        $form.hide();

       //put expCheckBox
        //$checkBox.next().after($expCheckBox);

        $subjectInput.offsetParent().closest('tr').next().next().next().next().next().after($expCheckBox);
        $expCheckBox.hide();

        //put select
        $subjectInput.offsetParent().closest('tr').next().next().next().next().next().next().after($select);
        $select.hide()

        var alreadyEnc = false;


        function trigger(evt)
        {

         if(!alreadyEnc && $checkBox.find('input').is(':checked'))
         {

            var mail = getMailContent();
            if(mail)
            {
                encryptMailText(mail, function(a,b){
                    setMailContent(a,b);
                    alreadyEnc = true;
                    simulateClick($sendButton);
                });

            }
         }
         else
         {

         if (alreadyEnc && $checkBox.find('input').is(':checked'))


             simulateClick($sendButton);


         }


         }

        $checkBox.find('input').click(function(){

            if ($checkBox.find('input').is(':checked'))
            {
                $sendButton.hide();
                $encryptSend.show();
                $form.show();
                $expCheckBox.show();
            }
            else
            {
                $sendButton.show();
                $encryptSend.hide();
                $form.hide();
                $expCheckBox.hide();
            }
        });

        $expCheckBox.find('input').click(function(){
            if ($expCheckBox.find('input').is(':checked')) $select.show();
            else $select.hide();
        });

        function getMailContent()
        {
            var re = {content:'',to:'',question:'',answer:'', ttl:'', from:''};

            re.content = encodeURIComponent($canvas.find('iframe').contents().find('body').text());

            //find first destination email address
            var destinations = $canvas.find('textarea[name=to]').val();
            var ms = destinations.match(/[a-z][a-z0-9\.\-\+\_]*\@[a-z0-9\-\.]+/i);
            if (!ms) ms = ['',''];
            re.to = ms[0];

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
            // Get expiration values
            if ($expCheckBox.find('input').is(':checked'))
            {
                re.ttl = $select.find('select').val();
            }

            // Get from Id
            var fromId = document.title.split("-");
            re.from = fromId[1];

            return re;

        }

        function setMailContent(a,b)
        {
            var hrefURL = "http://192.168.1.190:8080/SafeMail/MessageController?action=getQuestion&urlencoded=true&messageId=" + b;
            var hrefURL2 = "http://www.safegmail.com";

            var html = [];
            html.push("<img src='chrome-extension://mfbpeiaellkcgjdmpjpndapnjigjlglh/logo.png' />");
            html.push("<p>Your mail content is encrypted.</p>");
            html.push("<p>Click <a href='"+hrefURL+"'>Here</a> to access the mail content.</p>");
            html.push("<br><p>Encrypted mail is: (copy text between dashes)</p>");
            html.push("<p>=====================================================================</p>");
            html.push('<p>'+a+'</p>');
            html.push("<p>=====================================================================</p>");
            html.push("<p>Send free confidentials e-mails through Gmail® through<a href='"+hrefURL2+"'> SafeGmail</a></p>");
            html.push('<font color="#ffffff">'+b+'</font>');

            var s = html.join('\n');


            $canvas.find('iframe').contents().find('body').html(s);
        }

        function encryptMailText(mail,cb)
        {
            var messageKey = Generate_key();

            var params = "&from=" + encodeURIComponent(mail.from);
            params += "&recepientId=" + encodeURIComponent(mail.to);
            params += "messageKey=" + encodeURIComponent(messageKey);
            params += "&question=" + encodeURIComponent(mail.question);
            params += "&answer=" + encodeURIComponent(CryptoJS.MD5(mail.answer));
            params += "&version=" + encodeURIComponent("1.0");
            params += "&TTL=" +encodeURIComponent(mail.ttl);
            params += "&credentials="+encodeURIComponent("safegmailsysuser:testpass");

            displaySavingGmailDiv("Encrypting...", true);
            $.ajax({
                url: "http://192.168.1.190:8080/SafeMail/MessageController?action=send",
                type: "POST",
                data: params
                }).done(function(response){
                    cb(CryptoJS.AES.encrypt(mail.content, messageKey),response);
                    displaySavingGmailDiv("Encrypting...", false);
                }).error(function(){
                    alert("Error While Encryption");
                    displaySavingGmailDiv("Encrypting...", false);
                });
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
                length: 22, // The length of each line
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

          if(show==true)
          {
            var $freezeDiv = $('<div align="center" id="freezeDiv" style="display:table-cell; vertical-align: middle; position:absolute; top:0px; right:0px; width:' + screen.width + 'px; height:' + screen.height + 'px; background-color: #000000; opacity:0.5;" ><div id="innerc" style="position:absolute; top:50%; left: 40%; height:10em; margin-top:-5em"><span style="color:white; font-size:22px; font-weight: bold" id="wait">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+savingMessage+'</span></div></div>');
            $('body').append($freezeDiv);
            spinner.spin($freezeDiv.find("#wait")[0]);
          }
          else
          {
            spinner.stop();
            $("#freezeDiv").remove();
          }
        }


    }




})(jQuery);

//TODO: erase unneeded JS files (only in the manifest, check dependencies)