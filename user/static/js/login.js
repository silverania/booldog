$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    var valuenext = params.get('mainurl');
    login = "{{ request.user.is_authenticated }}";
    localStorage.setItem("login", login);
    login = localStorage.getItem('login');
    $('[data-toggle="tooltip"]').tooltip();
    var r = document.getElementById("a_reg");
    var pf = document.getElementById("a_passwordforget");
    var pc = document.getElementById("a_changepassword");
    r.href = "/user/register/blog?mainurl=" + params.get('mainurl');
    pc.href = "{% url 'change_password' %}?mainurl=" + params.get('mainurl');
    pf.href = "{% url 'password_reset' %}?mainurl=" + params.get('mainurl');
    var fs = document.getElementById("formlogin");
    if (valuenext) {
        localStorage.setItem("next", valuenext);
        next = localStorage.getItem("next");
        document.getElementById('next').setAttribute("value", next);
        console.log("valuenext not empty : " + next);
    }
    else {
        next = localStorage.getItem("next");
        window.location.href = window.location.href + "?mainurl=" + next;
    }
    var tokenhtml = document.getElementsByName('csrfmiddlewaretoken');
    tokenhtml = tokenhtml[0].value;
    sessionStorage.setItem('csrfmiddlewaretoken', tokenhtml);
    htmlIframeWidthHeight();
});
function htmlIframeWidthHeight() {
    var height, width;
    var bsectionHeight = document.getElementById("containerlogin");
    height = bsectionHeight.scrollHeight + 340;
    width = bsectionHeight.scrollWidth + 200;
    localStorage.setItem("iframewidth", width.toString());
    localStorage.setItem("iframeheight", height.toString());
    window.top.postMessage(
        {
            height: height,
            base: width,
        },
        "*"
    );
    return bsectionHeight;
}