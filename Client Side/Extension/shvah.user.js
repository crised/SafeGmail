// ==UserScript==
// @name          Gmail Encrypt Text
// @description	Allows the user to encrypt their email conversations
// @include       http*://*mail.google.com/*mail/*
// @date          2010/06/24
// @version       1.10 
// ==/UserScript==


// ------------------------------------------------------------------------
// Copyright (c) 2006, Mark Langenhoven
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 1.10 2010/06/24 Updated to work with the Chrome browser
// 1.04 2006/12/14 AES Encryption needed more variables initialised for Firefox 2.0
// 1.03 2006/06/01 When using formatted text, the first line is discarded
// 1.02 2006/06/01 Inserted equalsInt from the BigInt scripts. 
//                 Corrected for some gmail website changes which prevented some 
//	             people from decrypting their texts.
// 1.01 2006/04/03 Minor bugfixes in RSA decryption form
// 1.00 2006/03/19 Original version
//
// This script encrypts your email conversation using a system similar to AES 
// and the key to this is encrypted using a public key system similar to RSA.
//
// For more details see http://www.langenhoven.com/code/emailencrypt
// I don't claim to be a security guru. I am simply trying to implement
// what looked to me to be a relatively secure scheme.
//
// Some "BigInt" functionality came from the bigint.js library created
// by Leemon Baird. http://www.leemon.com/crypto/BigInt.html
//
// ------------------------------------------------------------------------

//We have to grab the text in this event listener because it does not exist
//at the time the script is normally called


/*!
  * Bonzo: DOM Utility (c) Dustin Diaz 2012
  * https://github.com/ded/bonzo
  * License MIT
  */
(function(a,b,c){typeof module!="undefined"&&module.exports?module.exports=b():typeof c["define"]=="function"&&c.define.amd?define(a,b):c[a]=b()})("bonzo",function(){function G(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function H(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c||a[d],a[d],d,a);return a}function I(a,b,c){for(var d=0,e=a.length;d<e;d++)O(a[d])&&(I(a[d].childNodes,b,c),b.call(c||a[d],a[d],d,a));return a}function J(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function K(a){return a?a.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():a}function L(a){a[y]("data-node-uid")||a[x]("data-node-uid",++t);var b=a[y]("data-node-uid");return s[b]||(s[b]={})}function M(a){var b=a[y]("data-node-uid");b&&delete s[b]}function N(a){var b;try{return a===null||a===undefined?undefined:a==="true"?!0:a==="false"?!1:a==="null"?null:(b=parseFloat(a))==a?b:a}catch(c){}return undefined}function O(a){return a&&a.nodeName&&(a.nodeType==1||a.nodeType==11)}function P(a,b,c){for(var d=0,e=a.length;d<e;++d)if(b.call(c||null,a[d],d,a))return!0;return!1}function Q(a){return a=="transform"&&(a=A.transform)||/^transform-?[Oo]rigin$/.test(a)&&(a=A.transform+"Origin")||a=="float"&&(a=A.cssFloat),a?J(a):null}function S(a,b,c){var d=0,g=b||this,h=[],i=f&&typeof a=="string"&&a.charAt(0)!="<"?f(a):a;return H(W(i),function(a){H(g,function(b){var f=!b[e]||b[e]&&!b[e][e]?function(){var a=b.cloneNode(!0),c,d;if(g.$&&typeof g.cloneEvents=="function"){g.$(a).cloneEvents(b),c=g.$(a).find("*"),d=g.$(b).find("*");for(var e=0;e<d.length;e++)g.$(c[e]).cloneEvents(d[e])}return a}():b;c(a,f),h[d]=f,d++})},this),H(h,function(a,b){g[b]=a}),g.length=d,g}function T(a,b,c){var d=$(a),e=d.css("position"),f=d.offset(),g="relative",h=e==g,i=[parseInt(d.css("left"),10),parseInt(d.css("top"),10)];e=="static"&&(d.css("position",g),e=g),isNaN(i[0])&&(i[0]=h?0:a.offsetLeft),isNaN(i[1])&&(i[1]=h?0:a.offsetTop),b!=null&&(a.style.left=b-f.left+i[0]+w),c!=null&&(a.style.top=c-f.top+i[1]+w)}function U(a,b){return typeof b=="function"?b(a):b}function V(a){this.length=0;if(a){a=typeof a!="string"&&!a.nodeType&&typeof a.length!="undefined"?a:[a],this.length=a.length;for(var b=0;b<a.length;b++)this[b]=a[b]}}function W(a){return typeof a=="string"?$.create(a):O(a)?[a]:a}function X(a,c,d){var e=this[0];return e?a==null&&c==null?(Y(e)?Z():{x:e.scrollLeft,y:e.scrollTop})[d]:(Y(e)?b.scrollTo(a,c):(a!=null&&(e.scrollLeft=a),c!=null&&(e.scrollTop=c)),this):this}function Y(a){return a===b||/^(?:body|html)$/i.test(a.tagName)}function Z(){return{x:b.pageXOffset||d.scrollLeft,y:b.pageYOffset||d.scrollTop}}function $(a){return new V(a)}var a=this,b=window,c=b.document,d=c.documentElement,e="parentNode",f=null,g=/^(checked|value|selected)$/i,h=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,i=["<table>","</table>",1],j=["<table><tbody><tr>","</tr></tbody></table>",3],k=["<select>","</select>",1],l=["_","",0,1],m={thead:i,tbody:i,tfoot:i,colgroup:i,caption:i,tr:["<table><tbody>","</tbody></table>",2],th:j,td:j,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:k,optgroup:k,script:l,style:l,link:l,param:l,base:l},n=/^(checked|selected)$/,o=/msie/i.test(navigator.userAgent),p,q,r,s={},t=0,u=/^-?[\d\.]+$/,v=/^data-(.+)$/,w="px",x="setAttribute",y="getAttribute",z="getElementsByTagName",A=function(){var a=c.createElement("p");return a.innerHTML='<a href="#x">x</a><table style="float:left;"></table>',{hrefExtended:a[z]("a")[0][y]("href")!="#x",autoTbody:a[z]("tbody").length!==0,computedStyle:c.defaultView&&c.defaultView.getComputedStyle,cssFloat:a[z]("table")[0].style.styleFloat?"styleFloat":"cssFloat",transform:function(){var b=["webkitTransform","MozTransform","OTransform","msTransform","Transform"],c;for(c=0;c<b.length;c++)if(b[c]in a.style)return b[c]}(),classList:"classList"in a,opasity:function(){return typeof c.createElement("a").style.opacity!="undefined"}()}}(),B=/(^\s*|\s*$)/g,C=/\s+/,D=String.prototype.toString,E={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},F=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(B,"")},R=A.computedStyle?function(a,b){var d=null,e=c.defaultView.getComputedStyle(a,"");return e&&(d=e[b]),a.style[b]||d}:o&&d.currentStyle?function(a,b){if(b=="opacity"&&!A.opasity){var c=100;try{c=a.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(d){try{c=a.filters("alpha").opacity}catch(e){}}return c/100}var f=a.currentStyle?a.currentStyle[b]:null;return a.style[b]||f}:function(a,b){return a.style[b]};return A.classList?(p=function(a,b){return a.classList.contains(b)},q=function(a,b){a.classList.add(b)},r=function(a,b){a.classList.remove(b)}):(p=function(a,b){return G(b).test(a.className)},q=function(a,b){a.className=F(a.className+" "+b)},r=function(a,b){a.className=F(a.className.replace(G(b)," "))}),V.prototype={get:function(a){return this[a]||null},each:function(a,b){return H(this,a,b)},deepEach:function(a,b){return I(this,a,b)},map:function(a,b){var c=[],d,e;for(e=0;e<this.length;e++)d=a.call(this,this[e],e),b?b(d)&&c.push(d):c.push(d);return c},html:function(a,b){function e(b){H(W(a),function(a){b.appendChild(a)})}var c=b?d.textContent===undefined?"innerText":"textContent":"innerHTML";return typeof a!="undefined"?this.empty().each(function(d){!b&&h.test(d.tagName)?e(d):function(){try{d[c]=a}catch(b){e(d)}}()}):this[0]?this[0][c]:""},text:function(a){return this.html(a,!0)},append:function(a){return this.each(function(b){H(W(a),function(a){b.appendChild(a)})})},prepend:function(a){return this.each(function(b){var c=b.firstChild;H(W(a),function(a){b.insertBefore(a,c)})})},appendTo:function(a,b){return S.call(this,a,b,function(a,b){a.appendChild(b)})},prependTo:function(a,b){return S.call(this,a,b,function(a,b){a.insertBefore(b,a.firstChild)})},before:function(a){return this.each(function(b){H($.create(a),function(a){b[e].insertBefore(a,b)})})},after:function(a){return this.each(function(b){H($.create(a),function(a){b[e].insertBefore(a,b.nextSibling)})})},insertBefore:function(a,b){return S.call(this,a,b,function(a,b){a[e].insertBefore(b,a)})},insertAfter:function(a,b){return S.call(this,a,b,function(a,b){var c=a.nextSibling;c?a[e].insertBefore(b,c):a[e].appendChild(b)})},replaceWith:function(a){return this.deepEach(M),this.each(function(b){b.parentNode.replaceChild($.create(a)[0],b)})},addClass:function(a){return a=D.call(a).split(C),this.each(function(b){H(a,function(a){a&&!p(b,U(b,a))&&q(b,U(b,a))})})},removeClass:function(a){return a=D.call(a).split(C),this.each(function(b){H(a,function(a){a&&p(b,U(b,a))&&r(b,U(b,a))})})},hasClass:function(a){return a=D.call(a).split(C),P(this,function(b){return P(a,function(a){return a&&p(b,a)})})},toggleClass:function(a,b){return a=D.call(a).split(C),this.each(function(c){H(a,function(a){a&&(typeof b!="undefined"?b?q(c,a):r(c,a):p(c,a)?r(c,a):q(c,a))})})},show:function(a){return this.each(function(b){b.style.display=a||""})},hide:function(){return this.each(function(a){a.style.display="none"})},toggle:function(a,b){return this.each(function(a){a.style.display=a.offsetWidth||a.offsetHeight?"none":b||""}),a&&a(),this},first:function(){return $(this.length?this[0]:[])},last:function(){return $(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(e)},related:function(a){return this.map(function(b){b=b[a];while(b&&b.nodeType!==1)b=b[a];return b||0},function(a){return a})},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(a,d){function g(a,b,c){for(var d in f)f.hasOwnProperty(d)&&(c=f[d],(b=Q(d))&&u.test(c)&&!(b in E)&&(c+=w),a.style[b]=U(a,c))}var e;if(d===undefined&&typeof a=="string")return d=this[0],d?d===c||d===b?(e=d===c?$.doc():$.viewport(),a=="width"?e.width:a=="height"?e.height:""):(a=Q(a))?R(d,a):null:null;var f=a;return typeof a=="string"&&(f={},f[a]=d),o&&f.opacity&&(f.filter="alpha(opacity="+f.opacity*100+")",f.zoom=a.zoom||1,delete f.opacity),this.each(g)},offset:function(a,b){if(typeof a=="number"||typeof b=="number")return this.each(function(c){T(c,a,b)});if(!this[0])return{top:0,left:0,height:0,width:0};var d=this[0],e=d.offsetWidth,f=d.offsetHeight,g=d.offsetTop,h=d.offsetLeft;while(d=d.offsetParent)g+=d.offsetTop,h+=d.offsetLeft,d!=c.body&&(g-=d.scrollTop,h-=d.scrollLeft);return{top:g,left:h,height:f,width:e}},dim:function(){if(!this.length)return{height:0,width:0};var a=this[0],b=!a.offsetWidth&&!a.offsetHeight?function(b){var c={position:a.style.position||"",visibility:a.style.visibility||"",display:a.style.display||""};return b.first().css({position:"absolute",visibility:"hidden",display:"block"}),c}(this):null,c=a.offsetWidth,d=a.offsetHeight;return b&&this.first().css(b),{height:d,width:c}},attr:function(a,b){var c=this[0];if(typeof a=="string"||a instanceof String)return typeof b=="undefined"?c?g.test(a)?n.test(a)&&typeof c[a]=="string"?!0:c[a]:a!="href"&&a!="src"||!A.hrefExtended?c[y](a):c[y](a,2):null:this.each(function(c){g.test(a)?c[a]=U(c,b):c[x](a,U(c,b))});for(var d in a)a.hasOwnProperty(d)&&this.attr(d,a[d]);return this},removeAttr:function(a){return this.each(function(b){n.test(a)?b[a]=!1:b.removeAttribute(a)})},val:function(a){return typeof a=="string"?this.attr("value",a):this.length?this[0].value:null},data:function(a,b){var c=this[0],d,e,f;return typeof b=="undefined"?c?(e=L(c),typeof a=="undefined"?(H(c.attributes,function(a){(f=(""+a.name).match(v))&&(e[J(f[1])]=N(a.value))}),e):(typeof e[a]=="undefined"&&(e[a]=N(this.attr("data-"+K(a)))),e[a])):null:this.each(function(c){L(c)[a]=b})},remove:function(){return this.deepEach(M),this.each(function(a){a[e]&&a[e].removeChild(a)})},empty:function(){return this.each(function(a){I(a.childNodes,M);while(a.firstChild)a.removeChild(a.firstChild)})},detach:function(){return this.each(function(a){a[e].removeChild(a)})},scrollTop:function(a){return X.call(this,null,a,"y")},scrollLeft:function(a){return X.call(this,a,null,"x")}},$.setQueryEngine=function(a){f=a,delete $.setQueryEngine},$.aug=function(a,b){for(var c in a)a.hasOwnProperty(c)&&((b||V.prototype)[c]=a[c])},$.create=function(a){return typeof a=="string"&&a!==""?function(){var b=/^\s*<([^\s>]+)/.exec(a),d=c.createElement("div"),f=[],g=b?m[b[1].toLowerCase()]:null,h=g?g[2]+1:1,i=g&&g[3],j=e,k=A.autoTbody&&g&&g[0]=="<table>"&&!/<tbody/i.test(a);d.innerHTML=g?g[0]+a+g[1]:a;while(h--)d=d.firstChild;i&&d&&d.nodeType!==1&&(d=d.nextSibling);do(!b||d.nodeType==1)&&(!k||d.tagName.toLowerCase()!="tbody")&&f.push(d);while(d=d.nextSibling);return H(f,function(a){a[j]&&a[j].removeChild(a)}),f}():O(a)?[a.cloneNode(!0)]:[]},$.doc=function(){var a=$.viewport();return{width:Math.max(c.body.scrollWidth,d.scrollWidth,a.width),height:Math.max(c.body.scrollHeight,d.scrollHeight,a.height)}},$.firstChild=function(a){for(var b=a.childNodes,c=0,d=b&&b.length||0,e;c<d;c++)b[c].nodeType===1&&(e=b[d=c]);return e},$.viewport=function(){return{width:o?d.clientWidth:self.innerWidth,height:o?d.clientHeight:self.innerHeight}},$.isAncestor="compareDocumentPosition"in d?function(a,b){return(a.compareDocumentPosition(b)&16)==16}:"contains"in d?function(a,b){return a!==b&&a.contains(b)}:function(a,b){while(b=b[e])if(b===a)return!0;return!1},$},this);

 //(C) 2009 henrik.lindqvist@llamalab.com
new function(){function Selector(p,c){if(!(this instanceof Selector))return new Selector(p).exec(c);if(!qsa)this.exec=cache[p]||(cache[p]=new compile(p));this.pattern=p;}Selector.prototype={constructor:Selector,exec:function(c){var pe=this.patchElement,pa=this.patchArray,p=this.pattern,r=pe?map.call((c||d).querySelectorAll(p),pe,this):Array.prototype.slice.call((c||d).querySelectorAll(p));return pa?pa.call(this,r):r;},toString:function(){return this.pattern;},toSource:function(){return'new Selector("'+this.pattern+'")';}};window.Selector=Selector;function $(s){var a=arguments;return s.replace(/\$(\d)/g,function(m,i){return a[i]});}with(navigator.userAgent){var ie=indexOf('MSIE')!=-1&&indexOf('Opera')==-1,mz=indexOf('Gecko')!=-1&&indexOf('KHTML')==-1,wk=indexOf('AppleWebKit')!=-1;}var d=document,de=d.documentElement,qsa=!!d.querySelectorAll,bcn=!!d.getElementsByClassName,cnl=!!de.children,cnlt=cnl&&de.children.tags&&!wk,ec=!!de.contains,cdp=!!de.compareDocumentPosition,si=typeof de.sourceIndex=='number',cache={},cmp={'=':'if($1($2=="$3")){$5}','^=':'if($1((x=$2)&&!x.indexOf("$3"))){$5}','*=':'if($1((x=$2)&&x.indexOf("$3")!=-1)){$5}','$=':'if($1((x=$2)&&x.indexOf("$3",x.length-$4)!=-1)){$5}','~=':'if($1((x=$2)&&(y=x.indexOf("$3"))!=-1&&(x.charCodeAt(y-1)||32)==32&&(x.charCodeAt(y+$4)||32)==32)){$5}','|=':'if($1((x=$2)&&(x=="$3"||!x.indexOf("$3-")))){$5}'},map=Array.prototype.map||function(fn,tp){var i=this.length,r=new Array(i);while(--i>=0)r[i]=fn.call(tp,this[i],i,this);return r;};with(d.implementation){var me=d.addEventListener&&(hasFeature('MutationEvents','2.0')||hasFeature('Events','2.0')&&hasFeature('Core','2.0'));}Selector.guid=0;Selector.nthIndex=function(LLi,c,r,tp,tv){var p=c.parentNode,ci='LLi#'+tv,pl='LLi$'+tv;if(!p)return Number.NaN;if(!c[ci]||c.LLi!=LLi){for(var n=p.firstChild,i=0;n;n=n.nextSibling){if(n[tp]==tv){n[ci]=++i;n.LLi=LLi;}}p[pl]=i;}return r?1+p[pl]-c[ci]:c[ci];};if(me){function fn(e){with(e.target){if(nodeType!==2)ownerDocument.LLi=++Selector.guid;}}d.addEventListener('DOMNodeInserted',fn,false);d.addEventListener('DOMNodeRemoved',fn,false);}if(ie){var am={acceptcharset:'acceptCharset',accesskey:'accessKey',cellpadding:'cellPadding',cellspacing:'cellSpacing',checked:'defaultChecked',selected:'defaultSelected','class':'className',colspan:'colSpan','for':'htmlFor',frameborder:'frameBorder',hspace:'hSpace',longdesc:'longDesc',marginwidth:'marginWidth',marginheight:'marginHeight',noresize:'noResize',noshade:'noShade',maxlength:'maxLength',readonly:'readOnly',rowspan:'rowSpan',tabindex:'tabIndex',usemap:'useMap',valign:'vAlign',vspace:'vSpace'},ab={compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1};}function compile(qp){this.dup=this.srt=this.idx=this.i=this.nqp=0;with(this){var js='';do{i=nqp=0;js+=$('n=c;$1q:do{$2}while(false);',srt?'s=0;':'',type(qp,$(srt?'for(x=r.length;s<x;z=s+((x-s)/2)|0,($1)?s=z+1:x=z);if(s<r.length)r.splice(s++,0,$2);else r[s++]=$2;':'r[s++]=$2;',cdp?'r[z].compareDocumentPosition(n)&4':'h[r[z].LLn]<h[n.LLn]','pe?pe.call(this,n):n'),0,'*'));}while(qp=nqp);js=$('var r=[],s=0,n,x,y,z,d=c?c.ownerDocument||c.document||c:c=document,pe=this.patchElement,pa=this.patchArray$1$2;$3return pa?pa.call(this,r):r;',dup>0?',h={}':'',idx?me?',LLi=d.LLi||(d.LLi=++Selector.guid)':',LLi=++Selector.guid':'',js);return new Function('c',js);}}compile.prototype={type:function(qp,js,n,s,c){with(this){var m=/^\s*([\w-]+|\*)?(.*)/.exec(qp),t=m[1]||'*';if(!n&&c==' '&&!dup)dup=1;js=pred(m[2],js,n,t,c);switch(c){case'>':return cnlt&&t!='*'?$('for(var n$1=n.children.tags("$2"),i$1=0;n=n$1[i$1++];){$3}',++i,t,js):$(cnl?'for(var n$1=n.children,i$1=0;n=n$1[i$1++];)$2{$3}':'for(n=n.firstChild;n;n=n.nextSibling)$2{$3}',++i,t!='*'?'if(n.nodeName==="'+t.toUpperCase()+'")':!cnl||ie?'if(n.nodeType===1)':'',js);case'+':return $('while(n=n.nextSibling)if(n.node$1){$2break}else if(n.nodeType===1)break;',t=='*'?'Type===1':'Name==="'+t.toUpperCase()+'"',js);case'~':return $('while(n=n.nextSibling)if(n.node$1){$3}else if(n.node$2)break;',t=='*'?'Type===1':'Name==="'+t.toUpperCase()+'"',s=='*'?'Type===1':'Name==="'+s.toUpperCase()+'"',js);default:return(typeof js=='object')?String(js):n?t=='*'?js:$('if(n.nodeName!="$1"){$2}',t.toUpperCase(),js):$('for(var n$1=n.getElementsByTagName("$2"),i$1=0;n=n$1[i$1++];)$3{$4}',++i,t,ie&&t=='*'?'if(n.nodeType===1)':'',js);}}},pred:function(qp,js,n,t,c){with(this){var m=/^([#\.])([\w-]+)(.*)/.exec(qp)||/^(\[)\s*([\w-]+)\s*(?:([~|^$*]?=)\s*(?:(['"])(.*?)\4|([\w-]+)))?\s*\](.*)/.exec(qp)||/^:(first|last|only)-(?:(child)|of-type)(.*)/.exec(qp)||/^:(nth)-(?:(last)-)?(?:(child)|of-type)\(\s*(?:(odd|even)|(-|\d*)n([+-]\d+)?|([1-9]\d*))\s*\)(.*)/.exec(qp)||/^:(active|checked|(?:dis|en)abled|empty|focus|link|root|target)(.*)/.exec(qp)||/^:(lang)\(\s*(['"])?(.*?)\2\s*\)(.*)/.exec(qp)||(!n&&/^:(not)\(\s*(.*)\s*\)(.*)/.exec(qp)),x=0;if(!m){if(m=/^\s*([+>~,\s])\s*(\S.*)/.exec(qp)){if(m[1]!=',')return type(m[2],js,n,t,m[1]);nqp=m[2];dup=2;}else if(/\S/.test(qp))throw new Error('Illegal query near: '+qp);return dup<1?js:$('if(!h[x=n.LLn||(n.LLn=++Selector.guid)]){h[x]=$1;$2}',!srt||cdp?'true':si?'n.sourceIndex':'Selector.srcIndex(h,n)',js);}if(!n&&m[1]=='#'&&dup!=2)dup=-1;js=pred(m[m.length-1],js,n,t,1);switch(m[1]){case'#':return uniq(js,n,t,c,ie,'n.id','"'+m[2]+'"','d.getElementById("'+m[2]+'")');case'.':return bcn&&!n&&(!c||c==' ')&&(t=='*'||!mz)?Object($('for(var n$1=n.getElementsByClassName("$2"),i$1=0;n=n$1[i$1++];)$3{$4}',++i,m[2],t=='*'?'':'if(n.nodeName==="'+t.toUpperCase()+'")',js)):$(cmp['~='],n?'!':'','n.className',x=m[2],x.length,js);case'[':return(x=m[3])?$(cmp[x],n?'!':'',ie?(x=m[2].toLowerCase())=='style'?'style.cssText.toLowerCase()':ab[x]?'n.'+x+'&&"'+x+'"':'n.getAttribute("'+(am[x]||x)+'",2)':'n.getAttribute("'+m[2]+'")',x=m[5]||m[6],x.length,js):$(ie?'if($1((x=n.getAttributeNode("$2"))&&x.specified)){$3}':'if($1n.hasAttribute("$2")){$3}',n?'!':'',m[2],js);case'active':case'focus':return uniq(js,n,t,c,0,'n','d.activeElement');case'checked':return $('if($1(n.checked||n.selected)){$2}',n?'!':'',js);case'disabled':x=1;case'enabled':return $('if(n.disabled===$1$2){$3}',!!(x^n),ie?'&&((x=n.nodeName)==="BUTTON"||x==="INPUT"||x==="OPTION"||x==="OPTGROUP"||x==="SELECT"||x==="TEXTAREA"':'',js);case'empty':return $('for(x=n.firstChild;x&&x.nodeType>3;x=x.nextSibling);if($1x){$2}',n?'':'!',js);case'first':return flo(js,n,m[2],'previous');case'lang':return $(cmp['|='],n?'!':'','n.lang',x=m[3],x.length,js);case'last':return flo(js,n,m[2],'next');case'link':return $('if($1(n.nodeName==="A"&&n.href)){$2}',n?'!':'',js);case'nth':var a=m[4]?2:m[5]=='-'?-1:m[7]?0:m[5]?m[5]-0:1,b=m[4]=='odd'?1:(m[6]||m[7])-0||0;if(a==1)return js;if(a==0&&b==1)return flo(js,n,m[3],m[2]?'next':'previous');if(a==b)b=0;if(b<0)b=a+b;idx=1;return $('if($1(Selector.nthIndex(LLi,n,$2,"node$3",$4)$5)){$6}',n?'!':'',!!m[2],m[3]?'Type':'Name',m[3]?'1':'n.nodeName',a<0?'<='+b:a?'%'+a+'==='+b:'==='+b,js);case'not':return type(m[2],js,1,'*');case'only':return flo(js,n,m[2]);case'root':return uniq(js,n,t,c,0,'n','d.documentElement');case'target':x='(d.defaultView||d.parentWindow||window).location.hash.substr(1)';return uniq(js,n,t,c,ie,'n.id',x,'d.getElementById('+x+')');}}},uniq:function(js,n,t,c,d,p,v,w){return(n||(c&&c!=' ')||d)?$(n?'if($1!==$2){$3}':'if($1===$2){$3break q}',p,v,js):Object($(ec?'if((x=$1)===n||!n.contains||n.contains(x))$2':cdp?'if((x=$1)===n||!n.compareDocumentPosition||n.compareDocumentPosition(x)&16)$2':'for(x=y=$1;y;y=y.parentNode)if(y===n)$2',w||v,t=='*'?'{n=x;'+js+'break q}':'{if((n=x).nodeName==="'+t.toUpperCase()+'"){'+js+'}break q}'));},flo:function(js,n,t,s){return $(s?'for($2x=n.$1Sibling;x&&x.node$3;x=x.$1Sibling);if($4x){$5}':'for($2(x=n.parentNode)&&(x=x.firstChild);x&&(x.node$3||x===n);x=x.nextSibling);if($4x){$5}',s,t?'':'y=n.nodeName,',t?'Type!==1':'Name!==y',n?'':'!',js);}};}

/*!
  * snack.js (c) Ryan Florence
  * https://github.com/rpflorence/snack
  * MIT License
  * Inspiration and code adapted from
  *  MooTools      (c) Valerio Proietti   MIT license
  *  jQuery        (c) John Resig         Dual license MIT or GPL Version 2
  *  contentLoaded (c) Diego Perini       MIT License
  *  Zepto.js      (c) Thomas Fuchs       MIT License
*/
typeof Object.create!="function"&&(Object.create=function(a){function b(){}b.prototype=a;return new b}),!function(a){var b=a.snack={},c=0,d=Object.prototype.toString,e=[].indexOf,f=[].push;b.extend=function(){if(arguments.length==1)return b.extend(b,arguments[0]);var a=arguments[0];for(var c,d=1,e=arguments.length;d<e;d++)for(c in arguments[d])a[c]=arguments[d][c];return a},b.extend({v:"1.2.3",bind:function(a,b,c){c=c||[];return function(){f.apply(c,arguments);return a.apply(b,c)}},punch:function(a,c,d,e){var f=a[c];a[c]=e?function(){f.apply(a,arguments);return d.apply(a,arguments)}:function(){var c=[].slice.call(arguments,0);c.unshift(b.bind(f,a));return d.apply(a,c)}},create:function(a,c){var d=Object.create(a);if(!c)return d;for(var e in c){if(!c.hasOwnProperty(e))continue;if(!a[e]||typeof c[e]!="function"){d[e]=c[e];continue}b.punch(d,e,c[e])}return d},id:function(){return++c},each:function(a,b,c){if(a.length===void 0){for(var d in a)a.hasOwnProperty(d)&&b.call(c,a[d],d,a);return a}for(var e=0,f=a.length;e<f;e++)b.call(c,a[e],e,a);return a},parseJSON:function(b){if(typeof b=="string"){b=b.replace(/^\s+|\s+$/g,"");var c=/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""));if(!c)throw"Invalid JSON";var d=a.JSON;return d&&d.parse?d.parse(b):(new Function("return "+b))()}},isArray:function(a){return a instanceof Array||d.call(a)=="[object Array]"},indexOf:e?function(a,b){return e.call(b,a)}:function(a,b){for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1}})}(window),!function(a,b){var c={},d;a.wrap=function(b,e){typeof b=="string"&&(b=d(b,e)),b.length||(b=[b]);var f=Object.create(c),g=0,h=b.length;for(;g<h;g++)f[g]=b[g];f.length=h,f.id=a.id();return f},a.extend(a.wrap,{define:function(b,d){if(typeof b!="string")for(var e in b)a.wrap.define(e,b[e]);else c[b]=d},defineEngine:function(a){d=a}}),a.wrap.defineEngine(function(a,c){typeof c=="string"&&(c=b.querySelector(c));return(c||b).querySelectorAll(a)})}(snack,document),!function(a,b,c){function l(){try{i.doScroll("left")}catch(a){setTimeout(l,50);return}k("poll")}function k(d){if(d.type!="readystatechange"||c.readyState=="complete")(d.type=="load"?b:c)[e](f+d.type,k,!1),!g&&(g=!0)&&a.each(j,function(a){a.apply(c)})}var d=c.addEventListener?"addEventListener":"attachEvent",e=c.addEventListener?"removeEventListener":"detachEvent",f=c.addEventListener?"":"on",g=!1,h=!0,i=c.documentElement,j=[];a.extend({stopPropagation:function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1}}),a.listener=function(b,g){b.delegate&&(b.capture=!0,_handler=g,g=function(d){var e=d.target||d.srcElement,f=typeof b.delegate=="string"?a.wrap(b.delegate,b.node):b.delegate(b.node);while(e&&a.indexOf(e,f)==-1)e=e.parentNode;e&&e!==this&&e!==c&&_handler.call(e,d,e)}),b.context&&(g=a.bind(g,b.context));var h={attach:function(){b.node[d](f+b.event,g,b.capture)},detach:function(){b.node[e](f+b.event,g,b.capture)},fire:function(){g.apply(b.node,arguments)}};h.attach();return h},a.ready=function(a){g?a.apply(c):j.push(a)};if(c.createEventObject&&i.doScroll){try{h=!b.frameElement}catch(m){}h&&l()}c[d](f+"DOMContentLoaded",k,!1),c[d](f+"readystatechange",k,!1),b[d](f+"load",k,!1)}(snack,window,document),!function(a){a.publisher=function(b){var c={};b=b||{},a.extend(b,{subscribe:function(b,d,e){var f={fn:d,ctxt:e||{}};c[b]||(c[b]=[]);var g={attach:function(){c[b].push(f)},detach:function(){c[b].splice(a.indexOf(d,c[b]),1)}};g.attach();return g},publish:function(b,d){if(!c[b])return!1;a.each(c[b],function(a){a.fn.apply(a.ctxt,d||[])});return c[b].length}});return b},a.publisher(a)}(snack),!function(a,b,c){function e(){}a.JSONP=function(b,d){var e="jsonp"+a.id(),f=c.createElement("script"),g=!1;a.JSONP[e]=function(b){g=!1,delete a.JSONP[e],d(b)},typeof b.data=="object"&&(b.data=a.toQueryString(b.data));var h={send:function(){g=!0,f.src=b.url+"?"+b.key+"=snack.JSONP."+e+"&"+b.data,c.getElementsByTagName("head")[0].appendChild(f)},cancel:function(){g&&f.parentNode&&f.parentNode.removeChild(f),g=!1,a.JSONP[e]=function(){delete a.JSONP[e]}}};b.now!==!1&&h.send();return h},a.toQueryString=function(b,c){var d=[];a.each(b,function(b,e){c&&(e=c+"["+e+"]");var f;if(a.isArray(b)){var g={};a.each(b,function(a,b){g[b]=a}),f=a.toQueryString(g,e)}else typeof b=="object"?f=a.toQueryString(b,e):f=e+"="+encodeURIComponent(b);b!==null&&d.push(f)});return d.join("&")};var d=function(){var a=function(){return new XMLHttpRequest},b=function(){return new ActiveXObject("MSXML2.XMLHTTP")},c=function(){return new ActiveXObject("Microsoft.XMLHTTP")};try{a();return a}catch(d){try{b();return b}catch(d){c();return c}}}();a.request=function(b,c){if(!(this instanceof a.request))return new a.request(b,c);var e=this;e.options=a.extend({},e.options,b),e.callback=c,e.xhr=new d,e.headers=e.options.headers,e.options.now!==!1&&e.send()},a.request.prototype={options:{exception:e,url:"",data:"",method:"get",now:!0,headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:!0,emulation:!0,urlEncoded:!0,encoding:"utf-8"},onStateChange:function(){var a=this,b=a.xhr;if(b.readyState==4&&!!a.running){a.running=!1,a.status=0;try{var c=b.status;a.status=c==1223?204:c}catch(d){}b.onreadystatechange=e;var f=a.status>=200&&a.status<300?[!1,a.xhr.responseText||"",a.xhr.responseXML]:[a.status];a.callback.apply(a,f)}},setHeader:function(a,b){this.headers[a]=b;return this},getHeader:function(a){try{return this.xhr.getResponseHeader(a)}catch(b){return null}},send:function(){var b=this,d=b.options;if(b.running)return b;b.running=!0;var e=d.data||"",f=String(d.url),g=d.method.toLowerCase();typeof e!="string"&&(e=a.toQueryString(e));if(d.emulation&&a.indexOf(g,["get","post"])<0){var h="_method="+g;e=e?h+"&"+e:h,g="post"}if(d.urlEncoded&&a.indexOf(g,["post","put"])>-1){var i=d.encoding?"; charset="+d.encoding:"";b.headers["Content-type"]="application/x-www-form-urlencoded"+i}f||(f=c.location.pathname);var j=f.lastIndexOf("/");j>-1&&(j=f.indexOf("#"))>-1&&(f=f.substr(0,j)),e&&g=="get"&&(f+=(f.indexOf("?")>-1?"&":"?")+e,e=null);var k=b.xhr;k.open(g.toUpperCase(),f,open.async,d.user,d.password),d.user&&"withCredentials"in k&&(k.withCredentials=!0),k.onreadystatechange=a.bind(b.onStateChange,b);for(var l in b.headers)try{k.setRequestHeader(l,b.headers[l])}catch(m){d.exception.apply(b,[l,b.headers[l]])}k.send(e),d.async||b.onStateChange();return b},cancel:function(){var a=this;if(!a.running)return a;a.running=!1;var b=a.xhr;b.abort(),b.onreadystatechange=e,a.xhr=new d;return a}}}(snack,window,document),!function(a,b){function d(b,c,d,e){var f=b.data(d);f&&a.each(f,function(a){a[c].apply(b,e)});return b}function c(a){return a.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")}a.wrap.define({data:function(){var a={};return function(b,c){var d=a[this.id];d||(d=a[this.id]={});if(c===void 1)return d[b];return d[b]=c}}(),each:function(b,c){return a.each(this,b,c)},addClass:function(a){return this.each(function(b){c(b.className).indexOf(a)>-1||(b.className=c(b.className+" "+a))})},removeClass:function(a){return this.each(function(b){b.className=b.className.replace(new RegExp("(^|\\s)"+a+"(?:\\s|$)"),"$1")})},attach:function(b,c,d){var e=b.split("."),f=[];e[1]&&(f=this.data(e[1])||[]),this.each(function(b){var g={node:b,event:e[0]};d&&(g.delegate=d),f.push(a.listener(g,c))}),e[1]&&this.data(e[1],f);return this},detach:function(a){d(this,"detach",a,null,!0),this.data(a,null);return this},fire:function(a,b){return d(this,"fire",a,b)},delegate:function(a,b,c){return this.attach(a,c,b)}})}(snack,document)

function $(selector) {
  return bonzo(Selector(selector));
}

document.addEventListener('click',function(event) {
	var msg;
	//Grab the text
 	if (event.target.id=='encrypt' || event.target.id=='decrypt') {
		if (document.getElementsByTagName("iframe").length>0) {
			var grabContent=document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].cloneNode(true);
			msg=grabContent.innerHTML;
		} else {
			msg=document.getElementsByName('msgbody')[0].value;
		}

		//Encrypt or decrypt the text
		if (event.target.id=='encrypt') {
			msg = RSAencryptText(msg);
		}
		if (event.target.id=='decrypt') {
			msg = RSAdecryptText(msg);
		}

		//update the text
		if (document.getElementsByTagName("iframe").length>0) {
			document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].innerHTML=msg;
		} else {
			document.getElementsByName('msgbody')[0].value=msg;
		}


	}
}, true);




// --- bigint initialisations -------------------
//globals
bpe=0;         //bits stored per array element
mask=0;        //AND this with an array element to chop it down to bpe bits
radix=mask+1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

//the digits for converting to different bases
digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';


//initialize the global variables
for (bpe=0; (1<<(bpe+1)) > (1<<bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
bpe>>=1;                   //bpe=number of bits in one element of the array representing the bigInt
mask=(1<<bpe)-1;           //AND the mask with an integer to get its bpe least-significant bits
radix=mask+1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
one=int2bigInt(1,1,1);     //constant used in powMod_()

//the following global variables are scratchpad memory to 
//reduce dynamic memory allocation in the inner loop
t=new Array(0);
ss=t;       //used in mult_()
s0=t;       //used in multMod_(), squareMod_() 
s1=t;       //used in powMod_(), multMod_(), squareMod_() 
s2=t;       //used in powMod_(), multMod_()
s3=t;       //used in powMod_()
s4=t; s5=t; //used in mod_()
s6=t;       //used in bigInt2str()
s7=t;       //used in powMod_()
T=t;        //used in GCD_()
sa=t;       //used in mont_()
mr_x1=t; mr_r=t; mr_a=t;                                      //used in millerRabin()
eg_v=t; eg_u=t; eg_A=t; eg_B=t; eg_C=t; eg_D=t;               //used in eGCD_(), inverseMod_()
md_q1=t; md_q2=t; md_q3=t; md_r=t; md_r1=t; md_r2=t; md_tt=t; //used in mod_()

primes=t; pows=t; s_i=t; s_i2=t; s_R=t; s_rm=t; s_q=t; s_n1=t; 
  s_a=t; s_r2=t; s_n=t; s_b=t; s_d=t; s_x1=t; s_x2=t, s_aa=t; //used in randTruePrime_()

//end of bigint initialisations

//--- aes initialisations -----------------------
// S-Box substitution table
var S_enc = new Array(
 0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16);

// inverse S-Box for decryptions
var S_dec = new Array(
 0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38,
 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87,
 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d,
 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2,
 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16,
 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda,
 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a,
 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02,
 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea,
 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85,
 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89,
 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20,
 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31,
 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d,
 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0,
 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26,
 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d);

// convert two-dimensional indicies to one-dim array indices
var I00 = 0;
var I01 = 1;
var I02 = 2;
var I03 = 3;
var I10 = 4;
var I11 = 5;
var I12 = 6;
var I13 = 7;
var I20 = 8;
var I21 = 9;
var I22 = 10;
var I23 = 11;
var I30 = 12;
var I31 = 13;
var I32 = 14;
var I33 = 15;

var accumulated_output_info;
//--- end of AES inits --------------------------

init();

function mypow(base, exp)
{
	//I didn't find a regular exponentiation function in bigInt
	//so I had to put together this homegrown version
	//This function is missing some error checks, etc, but
	//it works for this purpose

	//Special checks
	if (exp < 1) {
		return str2bigInt('1','10',0);
	}
	if (exp == 1){
		return base;
	}

	var orig = base;
	var origexp = exp;

	//Precalculate some values to cut down on the number of loops
	var val2 = mult(base, base);
	var val4 = mult(val2, val2);
	var val16 = mult(val4, val4);

	var myval = val2;
	var expcount = 2;
	
	while (1>0)
	{
		//prevent long processes from killing the system
		if (exp > 512) {
			alert("Exponent count " + expcount + " -> original " + origexp);
		}
		if (expcount * 2 <= origexp)
		{
			myval = mult(myval, myval);
			expcount = expcount * 2;
		} else {
			var diff = origexp - expcount;
			if (diff>=16) {
				myval = mult(myval,val16);
				expcount = expcount + 16;
				continue;
			}
			if (diff>=4) {
				myval = mult(myval,val4);
				expcount = expcount + 4;
				continue;
			}
			if (diff>=2) {
				myval = mult(myval,val2);
				expcount = expcount + 2;
				continue;
			}
			if (diff==1) {
				myval = mult(myval,orig);
				expcount = expcount + 1;
				continue;
			}
			if (diff<1) {
				return myval;
			}

		}
	}

}

function getpnum(ptext,n)
{
	//convert the plain text into a number
	var bb = '10'; //bigInt base
	var thenum = str2bigInt('0',bb,0);
	var hexbase = str2bigInt('16',bb,0);
	var cval, expval;
	//Grab "n" number of chars from the string to encrypt
	while (ptext.length < n) {
		ptext = ptext.concat('0');
	}

	for (i=0,n;i<n;i++)
	{
		expval = n - (i + 1);
		//Adjust the ASCII codes down so that 0 has
		//a value of 2
		var ccode = ptext.charCodeAt(i);
		//0 has an ASCII value of 48
		//9 = 57, A = 65, F = 70
		if (ccode >=48 && ccode <= 57) {
			ccode = ccode - 48;
		} else {
			ccode = ccode - 55;
		}

		cval = int2bigInt(ccode,0);
		var power = mypow(hexbase, expval );
		cval = mult(cval, power);
		thenum = add(thenum, cval);
	}

	return thenum;
}  //getpnum

function pad(ustr, n) {
	//Pad the ustr to make sure it is "n" chars long
	//this will catch numbers with leading zeroes
	while (ustr.length < n) {
		ustr = '0' + ustr;
	}
	return ustr;
} //pad

function makeKey()
{
	//Create a random AES key. It must be 32 Hex chars long
	var key = '';
	for (i=0,33;i<33;i++)
	{
		var randomnumber=Math.floor(Math.random()*16);
		if (randomnumber <= 9 ) {
			key = key + randomnumber;
		} else if (randomnumber == 10) {
			key = key + 'A';
		} else if (randomnumber == 11) {
			key = key + 'B';
		} else if (randomnumber == 12) {
			key = key + 'C';
		} else if (randomnumber == 13) {
			key = key + 'D';
		} else if (randomnumber == 14) {
			key = key + 'E';
		} else {
			key = key + 'F';
		}
	}
	return key;
}

function RSAencryptText(plainmsg) {
//This function is called by the button click and
//prepares all the pieces of text for the RSA encryption process

	var bb = '10'; //bigint base;


	//Generate a key for the AES encryption process
	var AESkey = makeKey();
	//GM_log("Plain AES key " + AESkey);
	//Encrypt the email
	var aes_text = aes_encrypt(AESkey, plainmsg);

	//Encrypt the key using RSA
	var plaintext = AESkey;

	//Grab the public key 
	var keyspot = document.getElementById("pubkeytext");
	var key = keyspot.value;
	var keys = key.split(":");

	var keymax = keys.length;
	keymax = keymax - 1;
	var keyE = keys[keymax];
	keymax = keymax - 1;
	var keyN = keys[keymax];


	//make the keys "big"
	var bigkeyN = int2bigInt(keyN,20);
	var bigkeyE = int2bigInt(keyE,20);

	//Encrypt the text
	var etext = '';
	while (plaintext.length > 0) 
	{
		var plainnum = getpnum(plaintext,5);

	
		//Check to see if this number is too large to encrypt
		if (greater(plainnum, bigkeyN)) {
			alert("This text cannot be encrypted using keys this small");
			return;
		}	

		var ciphernum = str2bigInt('0',bb,0);
		ciphernum = powMod(plainnum, bigkeyE, bigkeyN);

		if (etext == '') {
			etext = bigInt2str(ciphernum,bb);
		} else {
			etext = etext.concat(';', bigInt2str(ciphernum,bb));
		}
		
		//Cut off the first 5 chars of the string
		plaintext = plaintext.slice(5);
	}

	//GM_log("RSA key " + etext);

	//Combine the RSA encrypted key with the AES encryption
	etext = etext + ':' + aes_text;

	//Mark the text as encrypted so that we know were to start and end with the
	//decryption process
	etext = "--- Start of mailencrypt --- " + etext + " --- End of mailencrypt ---";

	//Return the encrypted text 
	//GM_log("Fully encrypted email " + etext);
	return etext;
} //RSAencryptext

function RSAdecryptText(encryptmsg) {
	//This is called by the decrypt button and gets all the pieces
	//of the process together to call the RSA decryption process

	var bb = '10'; //bigint base;

	//Find the place where the text is stored
	var plaintext = encryptmsg;
	//GM_log("Decrypting " + plaintext);

	//Grab the private key 
	var keyspot = document.getElementById("privkeytext");
	var key = keyspot.value;
	//Split this key into the various components
	var keys = key.split(":");
	var keymax = keys.length;

	//The last value is the D component
	keymax = keymax - 1;
	var keyD = keys[keymax];
	//Second last part is the N component
	keymax = keymax - 1;
	var keyN = keys[keymax];

	//Make the keys big
	var bigkeyN = str2bigInt(keyN,bb,0);
	var bigkeyD = str2bigInt(keyD,bb,0);

	// Strip out all the "> " indendation characters from the message
	// Only if we are dealing with a plaintext message
	
	var beforepos = 1;
	beforepos = plaintext.indexOf("<div>"); //check for html
	if (beforepos <= 0 ) {
		beforepos = 1;
		while ( beforepos > 0 ) {
			beforepos = plaintext.indexOf(">");
			if ( beforepos > 0 ) {
				var afterpos = beforepos + 1;
				plaintext = plaintext.slice(0,beforepos) + plaintext.slice(afterpos);
			} 
		}
	}


	//find the encrypted part of the email
	var beforepos = plaintext.indexOf("--- Start of mailencrypt ---");
	var afterpos = plaintext.indexOf(" --- End of mailencrypt ---");
	if ( beforepos > 0 ) {
		var beforetext = plaintext.slice(0,beforepos);
	} else {
		var beforetext = "";
	}
	if ( afterpos >0 ) {
		var aftertext = plaintext.slice(afterpos + 27);
	} else {
		var aftertext = "";
	}
	plaintext = plaintext.slice(beforepos + 29, afterpos);
	//GM_log("plaintext " + plaintext);

	//split the encrypted email into the key and the AES encrypted portion
	var etexts = plaintext.split(":");

	//the first text is the key which we need to decrypt using RSA
	var ptexts = etexts[0].split(";");

	var i = 0;
	var dtext = '';
	var tmptext = '';
	while ( i < ptexts.length )
	{
		//Turn the ciphertext number into a plaintext number
		var ciphernum = str2bigInt(ptexts[i],bb,0); 
		if (greater(ciphernum, bigkeyN)) {
			alert("This text cannot be decrypted using keys this small");
			return;
		}	


		var plainnum = powMod(ciphernum, bigkeyD, bigkeyN); 
		tmptext = bigInt2str(plainnum,'16'); //use base 16 to convert to hex
		tmptext = pad(tmptext,5);
		if (dtext == '') {
			dtext = tmptext;
		} else {
			dtext = dtext.concat(tmptext);
		}

		i = i + 1;
	}

	//chop off the padding at the end of the string
	dtext = dtext.slice(0,dtext.length-3);

	//Now decrypt the email body using AES
	//GM_log("text to decrypt " + etexts[1]);
	var finaltxt = aes_decrypt(dtext, etexts[1]);

	//Place the other parts of the text back around it again
	finaltxt = beforetext + finaltxt + aftertext;
	return finaltxt;
	//GM_log("Decrypted email " + finaltxt);
} //RSAdecrypttext


//Find the frame containing the actual body of the emails
function getframe() {
	var iframeEl = document.getElementById('canvas_frame');
	if ( iframeEl.contentDocument ) { // DOM
		//Works for Firefox
		return iframeEl.contentDocument;
	} else if ( iframeEl.contentWindow ) { // IE win
		//Called for Chrome
		//var myprop = listprop(iframeEl.contentWindow.document);
		return iframeEl.contentWindow.document;
	}
}


function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements[0];
}

function putButtons() {

    bonzo((new Selector('#q_and_a').exec(place))[0]).hide()
	//Find the frame first
	theframe = getframe();
	if (!theframe) {
		window.setTimeout(putButtons, 2000);
		return;
	}

	//Find the Send button
	var sendrow;
    sendrow = getElementsByAttribute(theframe,"input","name","subject");

	
	//If we don't find the row with the Send button on it then wait for a second
	//and try again
	if (!sendrow) {
		window.setTimeout(putButtons, 1000);
		return;
	}

	var place = sendrow.parentNode.parentNode.parentNode;
	//Make sure we have not already added the buttons to this tag
	
	for (var k=0;k<place.childNodes.length; k++) {
		knode = place.childNodes[k];
		if (knode.id == "encryptdiv") {
			return;
		}
	}	

	var htmlString = '<tr><td colspan="3"><table id="q_and_a"><tr><td colspan="2">Type a secret question and answer that can only be answered by the recipient</td></tr>        <tr><td>Question</td><td><input type="text" name="question" style="width:100%" /></td></tr>        <tr><td>Answer</td><td><input type="text" name="question" style="width:100%" /></td></tr></table></td></tr><tr id="encryptdiv"><td class="eD">Encrypted</td><td><input type="checkbox" name="boom" id="boom" style="margin-right:5px;" /></td><td></td></tr>';
	
	bonzo(sendrow.parentNode.parentNode).after(htmlString);
    var boom = (new Selector('#boom').exec(place))[0];
    var qwestions = bonzo((new Selector('#q_and_a').exec(place))[0]).hide();
    var listener = snack.listener({
        node: boom,
        event: 'click'
    }, function () {
        if (boom.checked) {
            qwestions.show();
        } else {
            qwestions.hide();
        }
    });
	
	//go back and recreate the buttons after any form inputs
	return;
} //putButtons



function init() {
	
	putButtons();
}//init

//Exit before you execute the other routines


//--- BigInt routines culled from bigint.js -------------------------
//Many functions and comments were stripped from the original file to cut down
//on load size. Please see the file bigint.js in the same location where you 
//originally found this script for full attribution

//return a copy of x with at least n elements, adding leading zeros if needed
function expand(x,n) {
  var ans=int2bigInt(0,(x.length>n ? x.length : n)*bpe,0);
  copy_(ans,x);
  return ans;
}

//return x*y for bigInts x and y. This is faster when y<x.
function mult(x,y) {
  var ans=expand(x,x.length+y.length);
  mult_(ans,y);
  return trim(ans,1);
}

//return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
function powMod(x,y,n) {
  var ans=expand(x,n.length);  
  powMod_(ans,trim(y,2),trim(n,2),0);  //this should work without the trim, but doesn't
  return trim(ans,1);
}

//return (x+y) for bigInts x and y.  
function add(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1)); 
  add_(ans,y);
  return trim(ans,1);
}

//return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
function inverseModInt_(x,n) {
  var a=1,b=0,t;
  for (;;) {
    if (x==1) return a;
    if (x==0) return 0;
    b-=a*Math.floor(n/x);
    n%=x;

    if (n==1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
    if (n==0) return 0;
    a-=b*Math.floor(x/n);
    x%=n;
  }
}

//is bigInt x negative?
function negative(x) {
  return ((x[x.length-1]>>(bpe-1))&1);
}

//is (x << (shift*bpe)) > y?
function greaterShift(x,y,shift) {
  var kx=x.length, ky=y.length;
  k=((kx+shift)<ky) ? (kx+shift) : ky;
  for (i=ky-1-shift; i<kx && i>=0; i++) 
    if (x[i]>0)
      return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
  for (i=kx-1+shift; i<ky; i++)
    if (y[i]>0)
      return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
  for (i=k-1; i>=shift; i--)
    if      (x[i-shift]>y[i]) return 1;
    else if (x[i-shift]<y[i]) return 0;
  return 0;
}

//is x > y? (x and y both nonnegative)
function greater(x,y) {
  var i;
  var k=(x.length<y.length) ? x.length : y.length;

  for (i=x.length;i<y.length;i++)
    if (y[i])
      return 0;  //y has more digits

  for (i=y.length;i<x.length;i++)
    if (x[i])
      return 1;  //x has more digits

  for (i=k-1;i>=0;i--)
    if (x[i]>y[i])
      return 1;
    else if (x[i]<y[i])
      return 0;
  return 0;
}

function divide_(x,y,q,r) {
  var kx, ky;
  var i,j,y1,y2,c,a,b;
  copy_(r,x);
  for (ky=y.length;y[ky-1]==0;ky--); //kx,ky is number of elements in x,y, not including leading zeros
  for (kx=r.length;r[kx-1]==0 && kx>ky;kx--);

  //normalize: ensure the most significant element of y has its highest bit set  
  b=y[ky-1];
  for (a=0; b; a++)
    b>>=1;  
  a=bpe-a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
  leftShift_(y,a);  //multiply both by 1<<a now, then divide_ both by that at the end
  leftShift_(r,a);

  copyInt_(q,0);                // q=0
  while (!greaterShift(y,r,kx-ky)) {  // while (leftShift_(y,kx-ky) <= r) {
    subShift_(r,y,kx-ky);      //   r=r-leftShift_(y,kx-ky)
    q[kx-ky]++;                  //   q[kx-ky]++;
  }                              // }

  for (i=kx-1; i>=ky; i--) {
    if (r[i]==y[ky-1])
      q[i-ky]=mask;
    else
      q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);	

    for (;;) {
      y2=(ky>1 ? y[ky-2] : 0)*q[i-ky];
      c=y2>>bpe;
      y2=y2 & mask;
      y1=c+q[i-ky]*y[ky-1];

      c=y1>>bpe;
      y1=y1 & mask;

      if (c==r[i] ? y1==r[i-1] ? y2>(i>1 ? r[i-2] : 0) : y1>r[i-1] : c>r[i]) 
        q[i-ky]--;
      else
        break;
    }

    linCombShift_(r,y,-q[i-ky],i-ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
    if (negative(r)) {
      addShift_(r,y,i-ky);         //r=r+leftShift_(y,i-ky)
      q[i-ky]--;
    }
  }

  rightShift_(y,a);  //undo the normalization step
  rightShift_(r,a);  //undo the normalization step
}

//return x mod n for bigInt x and integer n.
function modInt(x,n) {
  var i,c=0;
  for (i=x.length-1; i>=0; i--)
    c=(c*radix+x[i])%n;
  return c;
}

function int2bigInt(t,bits,minSize) {   
  var i,k;
  k=Math.ceil(bits/bpe)+1;
  k=minSize>k ? minSize : k;
  buff=new Array(k);
  copyInt_(buff,t);
  return buff;
}

function str2bigInt(s,base,minSize) {
  var d, i, j, x, y, kk;
  var k=s.length;
  if (base==-1) { //comma-separated list of array elements in decimal
    x=new Array(0);
    for (;;) {
      y=new Array(x.length+1);
      for (i=0;i<x.length;i++)
        y[i+1]=x[i];
      y[0]=parseInt(s,10);
      x=y;
      d=s.indexOf(',',0);
      if (d<1) 
        break;
      s=s.substring(d+1);
      if (s.length==0)
        break;
    }
    if (x.length<minSize) {
      y=new Array(minSize);
      copy_(y,x);
      return y;
    }
    return x;
  }

  x=int2bigInt(0,base*k,0);
  for (i=0;i<k;i++) {
    d=digitsStr.indexOf(s.substring(i,i+1),0);
    if (base<=36 && d>=36)  //convert lowercase to uppercase if base<=36
      d-=26;
    if (d<base && d>=0) {   //ignore illegal characters
      multInt_(x,base);
      addInt_(x,d);
    }
  }

  for (k=x.length;k>0 && !x[k-1];k--); //strip off leading zeros
  k=minSize>k+1 ? minSize : k+1;
  y=new Array(k);
  kk=k<x.length ? k : x.length;
  for (i=0;i<kk;i++)
    y[i]=x[i];
  for (;i<k;i++)
    y[i]=0;
  return y;
}

//is the bigInt x equal to zero?
function isZero(x) {
  var i;
  for (i=0;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//convert a bigInt into a string in a given base, from base 2 up to base 95.
//Base -1 prints the contents of the array representing the number.
function bigInt2str(x,base) {
  var i,t,s="";

  if (s6.length!=x.length) 
    s6=dup(x);
  else
    copy_(s6,x);

  if (base==-1) { //return the list of array contents
    for (i=x.length-1;i>0;i--)
      s+=x[i]+',';
    s+=x[0];
  }
  else { //return it in the given base
    while (!isZero(s6)) {
      t=divInt_(s6,base);  //t=s6 % base; s6=floor(s6/base);
      s=digitsStr.substring(t,t+1)+s;
    }
  }
  if (s.length==0)
    s="0";
  return s;
}

//returns a duplicate of bigInt x
function dup(x) {
  var i;
  buff=new Array(x.length);
  copy_(buff,x);
  return buff;
}

//do x=y on bigInts x and y.  
function copy_(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    x[i]=y[i];
  for (i=k;i<x.length;i++)
    x[i]=0;
}

//do x=y on bigInt x and integer y.  
function copyInt_(x,n) {
  var i,c;
  for (c=n,i=0;i<x.length;i++) {
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function addInt_(x,n) {
  var i,k,c,b;
  x[0]+=n;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
    if (!c) return; //stop carrying as soon as the carry_ is zero
  }
}

//right shift bigInt x by n bits.  0 <= n < bpe.
function rightShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=0;i<x.length-k;i++) //right shift x by k elements
      x[i]=x[i+k];
    for (;i<x.length;i++)
      x[i]=0;
    n%=bpe;
  }
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-n)) | (x[i]>>n));
  }
  x[i]>>=n;
}

//left shift bigInt x by n bits.
function leftShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=x.length; i>=k; i--) //left shift x by k elements
      x[i]=x[i-k];
    for (;i>=0;i--)
      x[i]=0;  
    n%=bpe;
  }
  if (!n)
    return;
  for (i=x.length-1;i>0;i--) {
    x[i]=mask & ((x[i]<<n) | (x[i-1]>>(bpe-n)));
  }
  x[i]=mask & (x[i]<<n);
}

//do x=x*n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function multInt_(x,n) {
  var i,k,c,b;
  if (!n)
    return;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i]*n;
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//do x=floor(x/n) for bigInt x and integer n, and return the remainder
function divInt_(x,n) {
  var i,r=0,s;
  for (i=x.length-1;i>=0;i--) {
    s=r*radix+x[i];
    x[i]=Math.floor(s/n);
    r=s%n;
  }
  return r;
}

//do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
//x must be large enough to hold the answer.
function linCombShift_(x,y,b,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+b*y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function subShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]-y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+y for bigInts x and y.
//x must be large enough to hold the answer.
function add_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]+y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x*y for bigInts x and y.  This is faster when y<x.
function mult_(x,y) {
  var i;
  if (ss.length!=2*x.length)
    ss=new Array(2*x.length);
  copyInt_(ss,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(ss,x,y[i],i);   //ss=1*ss+y[i]*(x<<(i*bpe))
  copy_(x,ss);
}

//do x=x mod n for bigInts x and n.
function mod_(x,n) {
  if (s4.length!=x.length)
    s4=dup(x);
  else
    copy_(s4,x);
  if (s5.length!=x.length)
    s5=dup(x);  
  divide_(s4,n,s5,x);  //x = remainder of s4 / n
}

//do x=x*y mod n for bigInts x,y,n.
//for greater speed, let y<x.
function multMod_(x,y,n) {
  var i;
  if (s0.length!=2*x.length)
    s0=new Array(2*x.length);
  copyInt_(s0,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(s0,x,y[i],i);   //s0=1*s0+y[i]*(x<<(i*bpe))
  mod_(s0,n);
  copy_(x,s0);
}

//return x with exactly k leading zero elements
function trim(x,k) {
  var i,y;
  for (i=x.length; i>0 && !x[i-1]; i--);
  y=new Array(i+k);
  copy_(y,x);
  return y;
}

//is bigint x equal to integer y?
//y must have less than bpe bits
function equalsInt(x,y) {
  var i;
  if (x[0]!=y)
    return 0;
  for (i=1;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}


//do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
//this is faster when n is odd.  x usually needs to have as many elements as n.
function powMod_(x,y,n) {
  var k1,k2,kn,np;
  if(s7.length!=n.length)
    s7=dup(n);

  //for even modulus, use a simple square-and-multiply algorithm,
  //rather than using the more complex Montgomery algorithm.
  if ((n[0]&1)==0) {
    copy_(s7,x);
    copyInt_(x,1);
    while(!equalsInt(y,0)) {
      if (y[0]&1)
        multMod_(x,s7,n);
      divInt_(y,2);
      squareMod_(s7,n); 
    }
    return;
  }

  //calculate np from n for the Montgomery multiplications
  copyInt_(s7,0);
  for (kn=n.length;kn>0 && !n[kn-1];kn--);
  np=radix-inverseModInt_(modInt(n,radix),radix);
  s7[kn]=1;
  multMod_(x ,s7,n);   // x = x * 2**(kn*bp) mod n

  if (s3.length!=x.length)
    s3=dup(x);
  else
    copy_(s3,x);

  for (k1=y.length-1;k1>0 & !y[k1]; k1--);  //k1=first nonzero element of y
  if (y[k1]==0) {  //anything to the 0th power is 1
    copyInt_(x,1);
    return;
  }
  for (k2=1<<(bpe-1);k2 && !(y[k1] & k2); k2>>=1);  //k2=position of first 1 bit in y[k1]
  for (;;) {
    if (!(k2>>=1)) {  //look at next bit of y
      k1--;
      if (k1<0) {
        mont_(x,one,n,np);
        return;
      }
      k2=1<<(bpe-1);
    }    
    mont_(x,x,n,np);

    if (k2 & y[k1]) //if next bit is a 1
      mont_(x,s3,n,np);
  }
} 

function sub_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]-y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

function mont_(x,y,n,np) {
  var i,j,c,ui,t;
  var kn=n.length;
  var ky=y.length;

  if (sa.length!=kn)
    sa=new Array(kn);

  for (;kn>0 && n[kn-1]==0;kn--); //ignore leading zeros of n
  //this function sometimes gives wrong answers when the next line is uncommented
  //for (;ky>0 && y[ky-1]==0;ky--); //ignore leading zeros of y

  copyInt_(sa,0);

  //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large keys
  for (i=0; i<kn; i++) {
    t=sa[0]+x[i]*y[0];
    ui=((t & mask) * np) & mask;  //the inner "& mask" is needed on Macintosh MSIE, but not windows MSIE
    c=(t+ui*n[0]) >> bpe;
    t=x[i];

    //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe
    for (j=1;j<ky;j++) { 
      c+=sa[j]+t*y[j]+ui*n[j];
      sa[j-1]=c & mask;
      c>>=bpe;
    }    
    for (;j<kn;j++) { 
      c+=sa[j]+ui*n[j];
      sa[j-1]=c & mask;
      c>>=bpe;
    }    
    sa[j-1]=c & mask;
  }

  if (!greater(n,sa))
    sub_(sa,n);
  copy_(x,sa);
}

//--- end of BigInt -------------------------------------------------


//--- AES routines --------------------------------------------------
// convert a 8-bit value to a string

function cvt_hex8( val )
{
   var vh = (val>>>4)&0x0f;
   return vh.toString(16) + (val&0x0f).toString(16);
}

// convert a 32-bit value to a 8-char hex string
function cvt_hex32( val )
{
   var str="";
   var i;
   var v;

   for( i=7; i>=0; i-- )
   {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
   }
   return str;
}

// convert a two-digit hex value to a number
function cvt_byte( str )
{
  // get the first hex digit
  var val1 = str.charCodeAt(0);

  // do some error checking
  if ( val1 >= 48 && val1 <= 57 )
      // have a valid digit 0-9
      val1 -= 48;
   else if ( val1 >= 65 && val1 <= 70 )
      // have a valid digit A-F
      val1 -= 55;
   else if ( val1 >= 97 && val1 <= 102 )
      // have a valid digit A-F
      val1 -= 87;
   else
   {
      // not 0-9 or A-F, complain
      window.alert( str.charAt(1)+" is not a valid hex digit" );
      return -1;
   }

  // get the second hex digit
  var val2 = str.charCodeAt(1);

  // do some error checking
  if ( val2 >= 48 && val2 <= 57 )
      // have a valid digit 0-9
      val2 -= 48;
   else if ( val2 >= 65 && val2 <= 70 )
      // have a valid digit A-F
      val2 -= 55;
   else if ( val2 >= 97 && val2 <= 102 )
      // have a valid digit A-F
      val2 -= 87;
   else
   {
      // not 0-9 or A-F, complain
      window.alert( str.charAt(2)+" is not a valid hex digit" );
      return -1;
   }

   // all is ok, return the value
   return val1*16 + val2;
}

// add a byte to the output
function accumulate_byte( label, val )
{
   accumulated_output_info += label + cvt_hex8(val) + "\n";
}

// add a word to the output
function accumulate_wordarray( label, ary )
{
   var i, j;
   accumulated_output_info += label + " ";

   // process the four elements in this word
   for( j=0; j<4; j++ )
      accumulated_output_info += " " + cvt_hex8( ary[j] );

   // mark the end of the word
   accumulated_output_info += "\n";
}

// add an array to the output
function accumulate_array( label, ary )
{
   var i, j;
   var spacer="";

   // build a set of spaces of equal length to the label
   while( spacer.length < label.length )
      spacer += " ";

   // build the table
   for( i=0; i<16; i+= 4 )
   {
      // add label/spaces
      if ( i== 0 )
         accumulated_output_info += label + " ";
      else
         accumulated_output_info += spacer + " ";

      // process the four elements in this "row"
      for( j=0; j<4; j++ )
         accumulated_output_info += " " + cvt_hex8( ary[i+j] );

      // mark the end of this row
      accumulated_output_info += "\n";
   }
}

// conversion function for non-constant subscripts
// assume subscript range 0..3
function I(x,y)
{ return (x*4) + y; }

// remove spaces from input
function remove_spaces( instr )
{
   var i;
   var outstr="";

   for( i=0; i<instr.length; i++ )
   {
      if ( instr.charAt(i) != " " )
      {
	   if (instr.charCodeAt(i) < 9 || instr.charCodeAt(i) > 13  )

         // not a space, include it
         outstr += instr.charAt(i);
      }
   }

   return outstr;
}

// get the message to encrypt/decrypt or the key
// return as a 16-byte array
function ascTo16(str) 
{
	var dbyte = new Array(16);
	var i;
      for( i=0; i<16; i++ )
      {
         dbyte[i] = str.charCodeAt(i);
      }

	return dbyte;
}

function hexTo16(str)
{
	var dbyte = new Array(16);
	var i;
      str = remove_spaces(str);

      for( i=0; i<16; i++ )
      {
         // isolate and convert this substring
         dbyte[i] = cvt_byte( str.substr(i*2,2) );
         if( dbyte[i] < 0 )
         {
            // have an error
            dbyte[0] = -1;
            return dbyte;
         }
      } // for i

	return dbyte;
}
function get_value( lbl, str, isASCII )
{
   var dbyte = new Array(16);
   var i;
   var val;	// one hex digit

   if ( isASCII )
   {
// ??? pad with spaces/nulls if < 16 chars ???
      // check length of data
      if ( str.length != 16 )
      {
         window.alert( lbl + " length wrong: Is " + str.length +
		"characters, but must be 128 bits (16 ASCII characters)");
         dbyte[0] = -1;
         return dbyte;
      }

      // have ASCII data
      for( i=0; i<16; i++ )
      {
         dbyte[i] = str.charCodeAt(i);
      }
   }
   else
   {
      // have hex data - remove any spaces they used, then convert
      str = remove_spaces(str);

      // check length of data
      if ( str.length != 32 )
      {
         window.alert( lbl + " length wrong: Is " + str.length +
		" hex digits, but must be 128 bits (32 hex digits)");
         dbyte[0] = -1;
         return dbyte;
      }

      for( i=0; i<16; i++ )
      {
         // isolate and convert this substring
         dbyte[i] = cvt_byte( str.substr(i*2,2) );
         if( dbyte[i] < 0 )
         {
            // have an error
            dbyte[0] = -1;
            return dbyte;
         }
      } // for i
   } // if isASCII

   // return successful conversion
   return dbyte;
} // get_value

//do the AES GF(2**8) multiplication
// do this by the shift-and-"add" approach
function aes_mul( a, b )
{
   var res = 0;

   while( a > 0 )
   {
      if ( a&1 )
         res = res ^ b;		// "add" to the result
      a >>>= 1;			// shift a to get next higher-order bit
      b <<= 1;			// shift multiplier also
   }

   // now reduce it modulo x**8 + x**4 + x**3 + x + 1
   var hbit = 0x10000;		// bit to test if we need to take action
   var modulus = 0x11b00;	// modulus - XOR by this to change value
   while( hbit >= 0x100 )
   {
      if ( res & hbit )		// if the high-order bit is set
         res ^= modulus;	// XOR with the modulus

      // prepare for the next loop
      hbit >>= 1;
      modulus >>= 1;
   }

   return res;
}

// apply the S-box substitution to the key expansion
function SubWord( word_ary )
{
   var i;

   for( i=0; i<16; i++ )
      word_ary[i] = S_enc[ word_ary[i] ];

   return word_ary;
}

// rotate the bytes in a word
function RotWord( word_ary )
{
   return new Array( word_ary[1], word_ary[2], word_ary[3], word_ary[0] );
}

// calculate the first item Rcon[i] = { x^(i-1), 0, 0, 0 }
// note we only return the first item
function Rcon( exp )
{
   var val = 2;
   var result = 1;

   // remember to calculate x^(exp-1)
   exp--;

   // process the exponent using normal shift and multiply
   while ( exp > 0 )
   {
      if ( exp & 1 )
         result = aes_mul( result, val );

      // square the value
      val = aes_mul( val, val );

      // move to the next bit
      exp >>= 1;
   }

   return result;
}

// round key generation
// return a byte array with the expanded key information
function key_expand( key )
{
   var temp = new Array(4);
   var i, j;
   var w = new Array( 4*11 );

   // copy initial key stuff
   for( i=0; i<16; i++ )
   {
      w[i] = key[i];
   }
   accumulate_wordarray( "w[0] = ", w.slice(0,4) );
   accumulate_wordarray( "w[1] = ", w.slice(4,8) );
   accumulate_wordarray( "w[2] = ", w.slice(8,12) );
   accumulate_wordarray( "w[3] = ", w.slice(12,16) );

   // generate rest of key schedule using 32-bit words
   i = 4;
   while ( i < 44 )		// blocksize * ( rounds + 1 )
   {
      // copy word W[i-1] to temp
      for( j=0; j<4; j++ )
         temp[j] = w[(i-1)*4+j];

      if ( i % 4 == 0)
      {
         // temp = SubWord(RotWord(temp)) ^ Rcon[i/4];
         temp = RotWord( temp );
         accumulate_wordarray( "RotWord()=", temp );
         temp = SubWord( temp );
         accumulate_wordarray( "SubWord()=", temp );
         temp[0] ^= Rcon( i>>>2 );
         accumulate_wordarray( " ^ Rcon()=", temp );
      }

      // word = word ^ temp
      for( j=0; j<4; j++ )
         w[i*4+j] = w[(i-4)*4+j] ^ temp[j];
      accumulate_wordarray( "w["+i+"] = ", w.slice( i*4, i*4+4 ) );

      i++;
   }

   return w;
}

// do S-Box substitution
function SubBytes(state, Sbox)
{
   var i;

   for( i=0; i<16; i++ )
      state[i] = Sbox[ state[i] ];

   return state;
}

// shift each row as appropriate
function ShiftRows(state)
{
   var t0, t1, t2, t3;

   // top row (row 0) isn't shifted

   // next row (row 1) rotated left 1 place
   t0 = state[I10];
   t1 = state[I11];
   t2 = state[I12];
   t3 = state[I13];
   state[I10] = t1;
   state[I11] = t2;
   state[I12] = t3;
   state[I13] = t0;

   // next row (row 2) rotated left 2 places
   t0 = state[I20];
   t1 = state[I21];
   t2 = state[I22];
   t3 = state[I23];
   state[I20] = t2;
   state[I21] = t3;
   state[I22] = t0;
   state[I23] = t1;

   // bottom row (row 3) rotated left 3 places
   t0 = state[I30];
   t1 = state[I31];
   t2 = state[I32];
   t3 = state[I33];
   state[I30] = t3;
   state[I31] = t0;
   state[I32] = t1;
   state[I33] = t2;

   return state;
}

// inverset shift each row as appropriate
function InvShiftRows(state)
{
   var t0, t1, t2, t3;

   // top row (row 0) isn't shifted

   // next row (row 1) rotated left 1 place
   t0 = state[I10];
   t1 = state[I11];
   t2 = state[I12];
   t3 = state[I13];
   state[I10] = t3;
   state[I11] = t0;
   state[I12] = t1;
   state[I13] = t2;

   // next row (row 2) rotated left 2 places
   t0 = state[I20];
   t1 = state[I21];
   t2 = state[I22];
   t3 = state[I23];
   state[I20] = t2;
   state[I21] = t3;
   state[I22] = t0;
   state[I23] = t1;

   // bottom row (row 3) rotated left 3 places
   t0 = state[I30];
   t1 = state[I31];
   t2 = state[I32];
   t3 = state[I33];
   state[I30] = t1;
   state[I31] = t2;
   state[I32] = t3;
   state[I33] = t0;

   return state;
}

// process column info
function MixColumns(state)
{
   var col;
   var c0, c1, c2, c3;

   for( col=0; col<4; col++ )
   {
      c0 = state[I(0,col)];
      c1 = state[I(1,col)];
      c2 = state[I(2,col)];
      c3 = state[I(3,col)];

      // do mixing, and put back into array
      state[I(0,col)] = aes_mul(2,c0) ^ aes_mul(3,c1) ^ c2 ^ c3;
      state[I(1,col)] = c0 ^ aes_mul(2,c1) ^ aes_mul(3,c2) ^ c3;
      state[I(2,col)] = c0 ^ c1 ^ aes_mul(2,c2) ^ aes_mul(3,c3);
      state[I(3,col)] = aes_mul(3,c0) ^ c1 ^ c2 ^ aes_mul(2,c3);
   }

   return state;
}

// inverse process column info
function InvMixColumns(state)
{
   var col;
   var c0, c1, c2, c3;

   for( col=0; col<4; col++ )
   {
      c0 = state[I(0,col)];
      c1 = state[I(1,col)];
      c2 = state[I(2,col)];
      c3 = state[I(3,col)];

      // do inverse mixing, and put back into array
      state[I(0,col)] = aes_mul(0x0e,c0) ^ aes_mul(0x0b,c1)
			^ aes_mul(0x0d,c2) ^ aes_mul(0x09,c3);
      state[I(1,col)] = aes_mul(0x09,c0) ^ aes_mul(0x0e,c1)
			^ aes_mul(0x0b,c2) ^ aes_mul(0x0d,c3);
      state[I(2,col)] = aes_mul(0x0d,c0) ^ aes_mul(0x09,c1)
			^ aes_mul(0x0e,c2) ^ aes_mul(0x0b,c3);
      state[I(3,col)] = aes_mul(0x0b,c0) ^ aes_mul(0x0d,c1)
			^ aes_mul(0x09,c2) ^ aes_mul(0x0e,c3);
   }

   return state;
}

// insert subkey information
function AddRoundKey( state, w, base )
{
   var col;

   for( col=0; col<4; col++ )
   {
      state[I(0,col)] ^= w[base+col*4];
      state[I(1,col)] ^= w[base+col*4+1];
      state[I(2,col)] ^= w[base+col*4+2];
      state[I(3,col)] ^= w[base+col*4+3];
   }

   return state;
}

// return a transposed array
function transpose( msg )
{
   var row, col;
   var state = new Array( 16 );

   for( row=0; row<4; row++ )
      for( col=0; col<4; col++ )
         state[I(row,col)] = msg[I(col,row)];

   return state;
}

// final AES state
var AES_output = new Array(16);

// format AES output
function format_AES_output(what, how)
{
   var i;
   var bits;
   var str="";

   // what type of data do we have to work with?
   if ( how == "asc")
   {
      // convert each set of bits back to ASCII
      for( i=0; i<16; i++ )
         str += String.fromCharCode( what[i] );
   }
   else 
   {
      // output hexdecimal data
      str = cvt_hex8( AES_output[0] );
      for( i=1; i<16; i++ )
      {
		str += " " + cvt_hex8( what[i] );
      }
   }
   return str;
}


// do AES encrytion
function aes_encrypt(key, plainmsg)
{
   var w = new Array( 44 );			// subkey information
   var state = new Array( 16 );			// working state
   var round;
   var finalstr = "";
   var msg = "";

	//Grab the text to encrypt
	var longmsg = plainmsg;
	//GM_log("AES Unencrypted " + longmsg);

	//check the key
	if ( key[0] < 0 )
	{
		alert("There is a problem with the key");
		return;
	}

	// expand the key
	key = hexTo16(key);
	w = key_expand( key );

	while (longmsg.length > 0 )
	{
		msg = longmsg.slice(0,16);
		longmsg = longmsg.slice(16);

		while (msg.length < 16) {
			msg += " ";
		}
		
		msg = ascTo16(msg);

		// problems??
		if ( msg[0] < 0 )
		{
			alert("There is a problem with the message");
			return;
		}


		// initial state = message in columns (transposed from what we input)
		state = transpose( msg );

		state = AddRoundKey(state, w, 0);

		for( round=1; round<10; round++ )
		{
			state = SubBytes(state, S_enc);
			state = ShiftRows(state);
			state = MixColumns(state);
			// note here the spec uses 32-bit words, we are using bytes, so an extra *4
			state = AddRoundKey(state, w, round*4*4);
		}

		SubBytes(state, S_enc);
		ShiftRows(state);
		AddRoundKey(state, w, 10*4*4);

		// process output
		AES_output = transpose( state );
		var tmpstr = format_AES_output(AES_output, "hex");
		if (finalstr == "") {
			finalstr = tmpstr;
		} else {
			finalstr = finalstr + "$" + tmpstr;
		}
	}

	//GM_log("AES Encrypted " + finalstr);

	return finalstr;

}//aes_encrypt

// do AES decryption
function aes_decrypt(key, bodytext)
{
   var w = new Array( 44 );			// subkey information
   var state = new Array( 16 );			// working state
   var round;
   var finalstr = "";
   var msg = "";

   // get the message from the user
	if (bodytext == '') {
		var longmsg = document.getElementById(loc).contentWindow.document.body.innerHTML;
	} else {
		var longmsg = bodytext;
	}

	//check the key
	if ( key[0] < 0 )
	{
		alert("There is a problem with the key");
		return;
	}

	// expand the key
	key = hexTo16(key);
	w = key_expand( key );

	var multmsg = longmsg.split("$");

	var i = 0;
	while (i < multmsg.length)
	{
		msg = hexTo16(multmsg[i]);

		// problems??
		if ( msg[0] < 0 )
		{
			alert("There is a problem with the message")
			return;
		}

		// initial state = message
		state = transpose( msg );

		state = AddRoundKey(state, w, 10*4*4);

		for( round=9; round>=1; round-- )
		{
			state = InvShiftRows(state);
			state = SubBytes(state, S_dec);
			// note here the spec uses 32-bit words, we are using bytes, so an extra *4
			state = AddRoundKey(state, w, round*4*4);
			state = InvMixColumns(state);
		}

		InvShiftRows(state);
		SubBytes(state, S_dec);
		AddRoundKey(state, w, 0);

		// process output
		AES_output = transpose( state );
		var tmpstr = format_AES_output(AES_output, "asc");
		if (finalstr == "") {
			finalstr = tmpstr;
		} else {
			finalstr = finalstr + tmpstr;
		}

		i += 1;
	}

	//GM_log("AES Decrypted " + finalstr);

	return finalstr;
}//aes_decrypt


//--- end of AES routines -------------------------------------------


//This space intentionally left blank
//