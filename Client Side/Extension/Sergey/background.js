function get_frame()
{
	var b=document.getElementById("canvas_frame");
	var a=(b.contentWindow||b.contentDocument);
	if(a.document){a=a.document}return a}
function get_buttons_by_text(b)
{
	var $ = document.getElementById;
	var a=get_frame();
	return $("[role=button]",a).filter(function(){return $(this).text().trim()==b})}

function add_send_later_button_to_menu()
{
	var $ = document.getElementById;
	var d=get_frame();
	var f=$("#Send-Encrypted-Mail",d);
	var e=$(".T-I.J-J5-Ji.Bq.nS.T-I-ax7.L3",d).first().text();
	if(!e)
	{
		e=$(".T-I.J-J5-Ji.Bq.nS.T-I-KE.L3",d).first().text()
	}
	if(!e)
	{
		e=$(".T-I.J-J5-Ji.Bq.nS.T-I-ax7.L3",d).first().text()
	}
	if(!e)
	{
		e="Send"
	}
	var a=get_buttons_by_text(e);
	if(f.length>0||a.length<1)
	{
		return false
	}
	var c=document.createElement("div");
	c.setAttribute("id","Send-Encrypted-Mail");
	c.setAttribute("style","position: inherit;");
	c.className="G J-J5-Ji";
	c.innerHTML="<div aria-haspopup='true' style='-moz-user-select: none;' class='tk3N6e-I J-J5-Ji W6eDmd tk3N6e-I-n2to0e L3 J-Zh-I J-J5-Ji Bq L3' 	tabindex='0'><img class='f tk3N6e-I-J3' src='https://b4g.baydin.com/site_media/bookmarklet/tinyboomlogo.png' /> Send Encrypted Mail <div class='VP5otc-d2fWKd tk3N6e-I-	J3 J-J5-Ji'> </div></div>"
}