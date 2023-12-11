const iframe = document.createElement("IFRAME");
let f = function () {
    var rootbooldog = "https://localtutorial.com:9000";
    var height = "";
    var width = "";
    window.addEventListener("message", function (event) {
        if (event.origin.includes(rootbooldog)) {
            height = event.data.height;
            width = event.data.base;
            iframe.setAttribute('height', height);
            iframe.setAttribute('width', width);
            if (event.data.reload === "true") {
                document.getElementById('booldogFrame').src = rootbooldog + "/booldog?mainurl=" + this.location.href.toString();
                console.log("iframe reload !");
            }
        }
    });

    if (height == "") {
        let mainurl = location.href.toString();
        iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals';
        iframe.setAttribute("id", "booldogFrame");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("data-auth", "");
        iframe.setAttribute("style", "display:block;margin:100px auto;width:100%;");
        iframe.setAttribute("credentialles","false");
        iframe.setAttribute("SameSite","None");
        iframe.setAttribute('src',  rootbooldog+'/booldog?mainurl=' + mainurl);
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(iframe);
    }
    

}();