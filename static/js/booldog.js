
let f = function () {
    var rootbooldog = "https://localtutorial.com:9000";
    var height = "";
    var width = "";
    window.addEventListener("message", function (event) {
        if (event.origin.includes(rootbooldog)) {
            event.source.postMessage({
                user: user,
                password: password,
            },
                "*"
            );
            height = event.data.height;
            width = event.data.base;
            iframe.setAttribute('height', height);
            iframe.setAttribute('width', width);
            if (event.data.reload === "true") {
                document.getElementById('booldogFrame').src = rootbooldog + "/booldog?mainurl=" + this.location.href.toString() + "&user=" + user + "&password=" + password;
                console.log("iframe reload !");
            }
        }
    });

    if (height == "") {
        var iframe = document.createElement("IFRAME");
        let mainurl = location.href.toString();
        iframe.setAttribute("id", "booldogFrame");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("data-auth", "");
        iframe.setAttribute("style", "display:block;margin:100px auto;width:100%;");
        iframe.setAttribute('src', rootbooldog + '/booldog?mainurl=' + mainurl + "&user=" + user + "&password=" + password);
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(iframe);
    }

}();