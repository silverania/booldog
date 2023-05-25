var valuenext;
$(document).ready(function () {
    var r, pf, pc, thisurl, fs, tokenhtml;
    const params = new URLSearchParams(window.location.search);
    params.get('mainurl') === null ? valuenext = localStorage.getItem("url") : valuenext = params.get('mainurl');
    $('[data-toggle="tooltip"]').tooltip();
    try {
        r = document.getElementById("a_reg");
        pf = document.getElementById("a_passwordforget");
        pc = document.getElementById("a_changepassword");
        r.href = "/user/register/blog?mainurl=" + valuenext;
        pc.href = BASE_URL + "user/login/change_password?mainurl=" + valuenext;
        pf.href = BASE_URL + "user/login/password_reset?mainurl=" + valuenext;
        fs = document.getElementById("formlogin");
    }
    catch (TypeError) {
        r = pf = pc = tokenhtml = "null";
    }
    finally {
        if (valuenext) {
            try {
                document.getElementById('next').setAttribute("value", valuenext);
            }
            catch (TypeError) {
                console.log("element with id next absent !");
            }
        }
        var containerlogin = document.getElementById("containerlogin");
        if (containerlogin === null) {
            var containerlogin = document.getElementsByTagName("body")[0];
        }
        htmlIframeWidthHeight(containerlogin);
    }
    /* RELOAD IFRAME TO  SEND DATA */
    (function () {
        window.top.postMessage(
            {
                height: containerlogin.scrollHeight,
                base: containerlogin.scrollWidth,
            },
            "*"
        );
    })();
    window.addEventListener("message", function (event) {
        if (valuenext.includes(event.origin)) {
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
