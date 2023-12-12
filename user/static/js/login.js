$(document).ready(function () {
    var r, pf, pc, thisurl, fs, tokenhtml;
    $('[data-toggle="tooltip"]').tooltip();
    try {
        r = document.getElementById("a_reg");
        pf = document.getElementById("a_passwordforget");
        pc = document.getElementById("a_changepassword");
        r.href = "/user/register/blog?mainurl=" + currentUrl;
        if (currentUrl) {
            sessionStorage.setItem("mainurl", currentUrl);
        }
        pf.href = BASE_URL + "user/login/password_reset?mainurl=" + sessionStorage.getItem("mainurl");
        fs = document.getElementById("formlogin");
    }
    catch (TypeError) {
        r = pf = pc = tokenhtml = "null";
    }
    finally {
        currentUrl=sessionStorage.getItem("mainurl")
        if (currentUrl) {
            try {
                document.getElementById('next').setAttribute("value", currentUrl);
            }
            catch (TypeError) {
                console.log("element with id next absent !");
            }
        }
        var containerlogin = document.getElementsByTagName("body")[0];
        
    }
    /* RELOAD IFRAME TO  SEND DATA */
    (function () {
        window.top.postMessage(
            {
                height: containerlogin.offsetHeight,
                base: containerlogin.offsetWidth,
            },
            "*"
        );
    })();
    window.addEventListener("message", function (event) {
        if (currentUrl.includes(event.origin)) {
            user = event.data.user;
            password = event.data.password;

        }
    }
    );
});


/*
function htmlIframeWidthHeight() {
    var height, width;
    var bsectionHeight = document.getElementsByTagName('body')[0];
    height = bsectionHeight.scrollHeight + 340;
    width = bsectionHeight.scrollWidth + 200;
    sessionStorage.setItem("iframewidth", width.toString());
    sessionStorage.setItem("iframeheight", height.toString());
    window.top.postMessage(
        {
            height: height,
            base: width,
        },
        "*"
    );
    return bsectionHeight;
}*/
