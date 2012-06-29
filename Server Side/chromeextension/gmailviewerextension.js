window.onload = function addCheckBoxForEncryption()
{
   alert("Need to write code for adding checkbox for encryption")
   var canvasFrame = document.getElementById("canvas_frame");
   alert('adfasfasdf');
   canvasFrame.contentDocument.onclick = function(event){alert('helo');event.stopPropogation();};
   //addCheckBox(canvasFrame.contentDocument);
   //var doc = canvasFrame.contentDocument || canvasFrame.contentWindow.document;
   //alert(doc.body.innerHTML.substring(0, 50));
}

function addAllEvents(e)
{
    alert('helo'+event.currentTarget);
    ;
    //spancontainer.onclick = function(e) {
//	        alert("hi"+e);
//    }
}

function addCheckBox(frameDocument)
{
   alert("Adding checkbox");
   var composeForm = frameDocument.forms;
   alert("Got the forms as "+composeForm.length);
   for(var i=0; i<composeForm.length;i++)
   {
   alert('The form is '+composeForm[i].id);
   //var cb = frameDocument.createElement('input');
   //cb.type = 'checkbox';
   //composeForm[i].appendChild(cb);
   //cb.name = val;
   //cb.value = cap;
   //cb.appendChild(frameDocument.createTextNode('Check to send encrypted mail'));
   }	
}