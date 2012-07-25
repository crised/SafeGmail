<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isErrorPage="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mail Content</title>
<link rel="stylesheet" type="text/css" href="jsp/css/styles.css">
<link rel="shortcut icon" href="jsp/img/icon.png">
</head>
<body>
<!-- Header -->
<div id="header">
<div id="logo">
</div>
</div>

<!-- Content -->
<div id="content_header">
<div id="site_content1">
<div id="content">
<h1><font color="red">Error</font></h1>
<div id="errorMsg"><label><b>Application encountered
following error:</b></label><br>
<textarea cols="150" rows="15"
	disabled="disabled"><%=exception.getMessage()%></textarea></div>
</div>
</div>
</div>

<div id="content_footer"></div>
<div id="footer" /><script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-33255588-1' ]);
	_gaq.push( [ '_trackPageview' ]);
	( function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
</body>
</html>