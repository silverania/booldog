let f = function () {
    var height = "";
    var width = "";
    window.addEventListener("message", function (event) {
        if (event.origin.includes("https://localtutorial.coM:9000")) {
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
                document.getElementById('booldogFrame').src = "https://localtutorial.com:9000/booldog?mainurl=" + this.location.href.toString() + "&user=" + user + "&password=" + password;
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
        iframe.setAttribute("credentialless");
        iframe.setAttribute('src', 'https://localtutorial.com:9000/booldog?mainurl=' + mainurl + "&user=" + user + "&password=" + password);
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(iframe);
    }

}();