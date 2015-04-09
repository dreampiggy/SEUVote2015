var userAgent=navigator.userAgent.toLowerCase(), s, o = {};  
var browser={
    version:(userAgent.match(/(?:firefox|opera|safari|chrome|msie)[\/: ]([\d.]+)/))[1],
    safari:/version.+safari/.test(userAgent),
    chrome:/chrome/.test(userAgent),
    firefox:/firefox/.test(userAgent),
    ie:/msie/.test(userAgent),
    opera: /opera/.test(userAgent )
}

if (browser.ie && browser.version <=9)
{
    alert("此页面不兼容IE9及以下浏览器，请使用IE10及以上浏览器或Firefox及Chrome等浏览器访问。");
    document.execCommand("stop");
    //window.close();
}