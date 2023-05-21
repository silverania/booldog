

/* By Mario , superior code */

const BASE_URL = "https://localbooldog.com:8000/"; // URL del server
var HIDDENFIELD;
const XMLHTTPURL_GETUSER = BASE_URL + "user/blog/getuser";
var URL_NEW_POST = BASE_URL + "post/sendpost";
var XMLHTTPURL_LOGIN; //="user/login/blog" + HIDDENFIELD;
var XMLHTTPURL_REGISTER;
var XMLHTTPURL_LOGOUT;
const MAX_TEXTAREA_NUMBER = 21;
const BASE_PHOTO_DIR = BASE_URL + "media/";
var HTTPURL_CHANGEPASSWORD;
var comments_json;
var borderPost = "none";
var borderResponse = "1px solid grey";
var paPostOrResp;
var postarea;
var el;
var mess;
var padre;
var lastUpdate;
var postAuthor;
var userAuth;
var userThatLogin;
var butcloned;
var isChanged = false;
window.buttonLinkComment = document.createElement("BUTTON");
var H1Welcome = document.createElement("H6");
var bbutton = document.createElement("ButtotagTitlen");
var user, password;
var resps;
var tagTitle;
var globDivContainerHead;
//var bUserImg=document.createElement("IMG");
var divFormChild = document.createElement("DIV");
var bdiv = document.createElement("DIV");
var divUserBlog = document.createElement("DIV");
var divCommentIcon = document.createElement("DIV");
var firstDivHead = document.createElement("DIV");
var divRespTitle = document.createElement("DIV");
var divExitLogin = document.createElement("DIV");
var divEmpty = document.createElement("DIV");
var divBlogReg = document.createElement("DIV");
var ulBlogReg = document.createElement("UL");
var liBlogReg = document.createElement("LI");
var aBlogReg = document.createElement("A");
var spanBlogReg = document.createElement("SPAN");
var liBlogEntra = document.createElement("LI");
var liBlogCambiaPassword = document.createElement("LI");
var aBlogEntra = document.createElement("A");
var aBlogCambiaPassword = document.createElement("A");

var liBlogEsci = document.createElement("LI");
var aBlogEsci = document.createElement("A");
var post,
  post2;
var isOpen = false;
var bSection = document.createElement("SECTION");
var bIcon = document.createElement("DIV");
var bForm = document.createElement("FORM");
//var title=document.getElementsByTagName('title')[0].innerText
var wait = true;
var postTitle, login;
var tutorial;
var bbutton2;
var exist = false;
var newPostId = 0;
var elementToAppendPostArea;
var json_resps;
var re, keytoken;
var inputHidden = document.createElement("INPUT");
var inputSubmit = document.createElement("INPUT");
var logo =
  '<a  href="/booldog"  target="_blank" id="a_download"><div class="booldog"><span class="badgebooldog"><i class="fas fa-comment-dots"></i></span><span class="spanbooldog">BoolDog</span></div></a>';
$(bIcon).append(logo);
var iconRefresh = '<a  href="#"  target="_blank" id="a_refresh"><div class="booldog"><span id="spanrefresh" class="badgebooldog"><i class="fa fa-refresh" aria-hidden="true"></i></span></div></a>';
$(bdiv).append(iconRefresh);
bIcon.appendChild(H1Welcome);

function createSectionDivSpan(userAdmin, _userThatLogin) {
  userThatLogin = _userThatLogin;
  if (userAdmin.toString() === "True") {
    bForm.setAttribute("action", BASE_URL + "post/getpost");
    bForm.setAttribute("class", "form_comment");
    firstDivHead.setAttribute("style", "width:45%;display:inline;");
    firstDivHead.setAttribute("id", "firstDivHead");
    divExitLogin.setAttribute("style", "width:45%;display:inline;");
    divCommentIcon.setAttribute("id", "div_comment_icon");
    divCommentIcon.setAttribute("style", "margin:0 auto 10% auto");
    divRespTitle.setAttribute("class", "div_resp");
    buttonLinkComment.setAttribute("id", "id_link_comment");
    divFormChild.setAttribute("id", "multiarea");
    divExitLogin.setAttribute("id", "d_blog_reg");

    buttonLinkComment.setAttribute("class", "mybut mybut-outline-info");
    divExitLogin.setAttribute("style", "width:45%;display:inline-block;");
    bdiv.setAttribute("id", "bdiv");
    bIcon.setAttribute("style", "text-align:center;font-weight:bold;");
    bIcon.setAttribute("id", "blog_icon");
    bSection.setAttribute("id", "blog");
    aBlogEntra.setAttribute(
      "style",
      "display:block;width:auto;text-align:right;"
    );
    aBlogEntra.setAttribute("href", XMLHTTPURL_LOGIN);
    aBlogEntra.setAttribute("id", "id_entra");
    aBlogCambiaPassword.setAttribute(
      "style",
      "display:block;width:auto;text-align:right;"
    );
    aBlogCambiaPassword.setAttribute("id", "id_cambia_password");
    aBlogReg.setAttribute(
      "style",
      "display:block;width:auto;text-align:right;z-index:200"
    );
    aBlogReg.setAttribute("href", XMLHTTPURL_REGISTER);
    aBlogCambiaPassword.setAttribute("href", HTTPURL_CHANGEPASSWORD);
    aBlogCambiaPassword.textContent = "Modifica";
    aBlogEsci.textContent = "Esci";
    aBlogEntra.setAttribute("class", "nav-link");
    aBlogEsci.setAttribute("href", XMLHTTPURL_LOGOUT);
    aBlogEsci.setAttribute(
      "style",
      "display:block;width:auto;text-align:right;"
    );
    aBlogEsci.setAttribute("id", "aEsci");
    liBlogEntra.setAttribute(
      "style",
      "display:inline;width:auto;margin-right:0px;"
    );
    liBlogEntra.setAttribute("class", "nav-item");
    liBlogEntra.setAttribute("id", "li_login");
    liBlogCambiaPassword.setAttribute("id", "li_cambiaPassword");
    liBlogReg.setAttribute("id", "li_reg");
    //bSpanChild.setAttribute("id","s_blog_text");
    bbutton.setAttribute("id", "button_post");
    //bH5.setAttribute("id","span_blog_entra");
    bbutton.setAttribute("type", "button");
    bbutton.setAttribute("class", "mybut mybut-outline-info ");
    spanBlogEntra.setAttribute("id", "span_entra");
    spanBlogReg.setAttribute("id", "span_reg");
    divBlogReg.setAttribute("id", "div_blog_reg");
    bbutton.textContent = "Commenta";
    spanBlogReg.textContent = "Registrati";

    ulBlogReg.setAttribute("id", "ul_blog");
    ulBlogReg.setAttribute("style", "list-style: none;padding: 0;margin: 0;");
    parent = document.body.insertBefore(
      bSection,
      document.getElementsByTagName("footer")[0]
    );
    if (userThatLogin.toString() === "false") {
      aBlogReg.appendChild(spanBlogReg);
      liBlogReg.appendChild(aBlogReg);
      aBlogEntra.appendChild(spanBlogEntra);
      liBlogEntra.appendChild(aBlogEntra);
      //ulBlogReg.appendChild(liBlogReg);
      ulBlogReg.appendChild(liBlogEntra);
      divExitLogin.appendChild(ulBlogReg);
    } else {
      liBlogEsci.appendChild(aBlogEsci);
      liBlogCambiaPassword.appendChild(aBlogCambiaPassword);
      ulBlogReg.appendChild(liBlogEsci);
      ulBlogReg.appendChild(liBlogCambiaPassword);
      divExitLogin.appendChild(ulBlogReg);
      bSection.appendChild(divBlogReg);
      inputHidden.setAttribute("name", "next");
      inputHidden.setAttribute("type", "hidden");
      inputHidden.setAttribute("value", window.location);
      inputHidden.setAttribute("id", "inputHidden");
      inputSubmit.setAttribute("id", "inputSubmit");
      inputSubmit.setAttribute("type", "submit");
      inputSubmit.setAttribute("value", "Esci");
      liBlogEsci.setAttribute("id", "liBlogEsci");
      if (userThatLogin !== "false")
        H1Welcome.setAttribute("id", "H1Welcome");
      H1Welcome.style.display = "block";
      userThatLogin = JSON.parse(userThatLogin);
      $(H1Welcome).append(
        '<span class="spanuser">' +

        userThatLogin[0].fields.first_name.charAt(0).toUpperCase() +
        userThatLogin[0].fields.first_name.slice(1) +
        "</span>"
      );
    }
    //bH5.appendChild(spanUserName)
    bSection.appendChild(bdiv);
    bdiv.appendChild(firstDivHead);
    bdiv.appendChild(divCommentIcon);
    bdiv.appendChild(divExitLogin);
    divCommentIcon.appendChild(bIcon);
    //divUserBlog.appendChild(bSpan)
    //bSpan.appendChild(bSpanChild)
    bSection.appendChild(bForm);
    bForm.appendChild(divFormChild);
    $(parent).prepend(divCommentIcon);
    divFormChild.appendChild(bbutton);
    $(buttonLinkComment).insertAfter($("#div_comment_icon"));
  } else {
    alert("il blog non puo essere usato !");
    return -1;
  }
  getComment();
  return true;
}

class Resp {
  constructor(
    author,
    body = "",
    publish,
    post,
    photo,
    pk,
    resptype,
    respTo,
    respToType,
    respToUser
  ) {
    this.sent = false;
    this.author = author;
    this.post = post;
    this.body = body;
    this.type = resptype;
    this.publish = publish;
    this.photo = photo;
    this.respToID = respTo;
    this.respToType = respToType;
    this.resps = Array();
    this.respToUser = respToUser;
    if (resptype == "newresp") {
      this.pk = parseInt(pk, "10");
      this.pk = this.pk + 1;
    } else {
      this.pk = pk;
    }
    this.thisTutorialTitle = tutorial;
  }
}

class Profile {
  constructor(author = "anonimo", photo = "") {
    this.photo = photo;
  }
}

class Post {
  constructor(
    type = "none",
    author = "anonimo",
    title1,
    comment,
    date = "nowday",
    photo,
    pk
  ) {
    this.sent = false;
    this.type = type;
    this.author = author;
    this.risposte = new Array();
    this.body = comment;
    //this.titled=title1
    this.photo = photo;
    this.publish = date;
    this.pk = pk;
    this.thisTutorialTitle = tutorial;
  }
}

class postArea {
  constructor(post) {
    this.post = post;
    this.postarea = document.createElement("TEXTAREA");
    try {
      var lines = this.post.body.split("\n");
      this.postarea.setAttribute('rows', lines.length + 1);
    }
    catch (TypeError) {
      this.postarea.setAttribute('rows', 3);
    }
    this.isActive = false;
    this.isChanged = isChanged;
    this.postarea.onkeyup = function () {
      this.setAttribute(
        "style",
        "height:" + this.scrollHeight + "px;overflow-y:hidden;"
      );
      this.setAttribute("class", "form-control");
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
      isChanged = true;
      this.isChanged = true;
      var callcount = 0;
      var action = function () { };
      var delayAction = function (action, time) {
        var expectcallcount = callcount;
        var delay = function () {
          if (callcount == expectcallcount) {
            action();
          }
        };
        setTimeout(delay, time);
      };
      return function (eventtrigger) {
        ++callcount;
        delayAction(action, 200);
      };
    };
    switch (post.type) {
      case "newpost":
        this.postarea.removeAttribute("disabled", "");
        break;
      case "newresp":
        this.postarea.removeAttribute("disabled", "");
        break;
      case "post":
        this.postarea.value = post.body;
        this.postarea.setAttribute("disabled", "");
        break;
      case "resp":
        this.postarea.value = post.body;
        this.postarea.setAttribute("disabled", "");
        break;
    }
  }

  appendPostArea(mess, divuserblog, appendTo = bdiv) {
    if (mess.type == "newpost") {
      var elToAppend = document.getElementById("d_blog_reg");
      $(divuserblog).insertAfter(elToAppend);
    } else if (mess.type == "newresp") {
      $(divuserblog).insertAfter(elementToAppendPostArea);
    } else if (mess.type == "resp") {
      $(divuserblog).insertAfter(appendTo);
    } else {
      appendTo.appendChild(divuserblog);
    }
  }

  makeHeadBlog(mess, postarea, elementToAppendPostArea) {
    if (!(isOpen == true)) {
      var id;
      mess.type == "resp" || mess.type == "newresp"
        ? (id = mess.post.pk + "_" + mess.pk)
        : (id = mess.pk);
      divUserBlog = document.createElement("DIV");
      var spanUserName = document.createElement("SPAN");
      var spanUserBar = document.createElement("SPAN");
      var spanUserBar_2 = document.createElement("SPAN");
      var spanInUserName = document.createElement("SPAN");
      var bH5 = document.createElement("span");
      var divContainerHead = document.createElement("DIV");
      globDivContainerHead = divContainerHead;
      var tagUserImg = document.createElement("IMG");
      divContainerHead.setAttribute("id", "d_head_blog_" + id);
      divContainerHead.setAttribute("style", "width:100%");
      tagUserImg.setAttribute("style", "border-radius:5%");
      tagUserImg.setAttribute("src", mess.photo);
      divUserBlog.appendChild(divContainerHead);
      divContainerHead.appendChild(tagUserImg);
      $(bH5).css("margin-left", "3%");
      bH5.setAttribute("id", "bh5_span_" + id);
      bH5.appendChild(spanInUserName);
      bH5.appendChild(spanUserName);
      divContainerHead.appendChild(bH5);
      tagUserImg.setAttribute("id", "img_user_" + id);
      spanUserName.setAttribute("id", "span_user_" + id);
      spanUserBar.setAttribute("id", "spanBar_" + id);
      spanUserBar_2.setAttribute("id", "spanBar_2_" + id);
      spanInUserName.setAttribute("id", "span_inuser_" + id);
      postarea.postarea.setAttribute(
        "id",
        mess.type + "_" + mess.author + "_" + id
      );
      if (mess.publish === "") mess.publish = "inserito adesso";
      switch (mess.type) {
        case "newpost":
          this.appendPostArea(mess, divUserBlog);
          divUserBlog.setAttribute("id", "new_divuserblog_" + id);
          divUserBlog.setAttribute("class", "new_post_" + id);
          $(document).on("click", function (e) {
            if (
              $(e.target).closest('*[id^="new_divuserblog"]').length === 0 &&
              $(e.target).closest('*[id^="id_link_comment"]').length === 0 &&
              $(e.target).closest('*[id^="button_post"]').length === 0
            ) {
              if (isChanged == false) {
                $("#new_divuserblog_" + id).remove();
                isOpen = false;
              }
            }
          });
          break;
        case "resp":
          this.appendPostArea(mess, divUserBlog, elementToAppendPostArea);
          divUserBlog.setAttribute("id", "divuserblog_" + id);
          spanUserBar.textContent = " | ";
          spanUserBar_2.textContent = " | " + mess.publish;
          spanInUserName.textContent =
            mess.author[0].toUpperCase() + mess.author.slice("1");
          spanInUserName.appendChild(spanUserBar);
          let respTo =
            mess.respToUser[0].toUpperCase() + mess.respToUser.slice("1");
          spanUserName.textContent = " in risposta a " + respTo;
          spanUserName.appendChild(spanUserBar_2);
          divUserBlog.setAttribute("style", "margin-left:20%");
          break;
        case "post":
          this.appendPostArea(mess, divUserBlog);
          divUserBlog.setAttribute("id", "divuserblog_" + id);
          divUserBlog.setAttribute("class", "post_" + id);
          break;
        case "newresp":
          this.appendPostArea(mess, divUserBlog);
          var id_newresp = id.toString();
          id_newresp = "_new_" + id_newresp;
          postarea.isActive = true;
          divUserBlog.setAttribute("id", "divuserblog_" + id_newresp);
          divUserBlog.setAttribute("style", "margin-left:20%");
          spanInUserName.textContent =
            mess.author[0].toUpperCase() + mess.author.slice("1");
          spanUserName.textContent = " | " + mess.publish;
          elementToAppendPostArea = elementToAppendPostArea;
          postarea.postarea.setAttribute(
            "id",
            mess.type + userThatLogin[0].fields.first_name + "_" + id_newresp
          );
          $(document).on("click", function (e) {
            //if ($(e.target).closest("#divuserblog_"+id_newresp).length === 0) {
            if ($(e.target).closest('*[id^="divuserblog"]').length === 0) {
              if (isChanged == false) {
                $("#divuserblog_" + id_newresp).remove();
                isOpen = false;
              }
            }
          });
          break;
      }
      this.mess = mess;
      if (mess.type == "post" || mess.type == "newpost") {
        if (!(postarea.disabled == true)) {
          spanUserName.textContent = mess.publish;
          spanInUserName.textContent =
            mess.author[0].toUpperCase() + mess.author.slice("1") + "  |  ";
          $("#post_response").css("border", "1px solid grey");
          bbutton.textContent = "Commenta";
          var idWherePutElement = "button_post";
        }
      }
      divUserBlog.appendChild(postarea.create());
      if (mess.type == "newpost") {
        postarea.isActive = true;
        if (postarea.isActive == true) {
          $(postarea.postarea.id).css("border", "1px solid grey");
        }
      }
      return $(divUserBlog);
    }
  }

  createButtonRispostaPost(mess, postarea) {
    var r;
    var id;
    mess.type == "resp" || mess.type == "newresp"
      ? (id = mess.post.pk + "_" + mess.pk)
      : (id = mess.pk);
    var button_risposta_post = document.createElement("BUTTON");
    var form_risposta_post = document.createElement("FORM");
    var objectToAppendChild = divUserBlog.id;
    button_risposta_post.setAttribute("style", "display:block");
    form_risposta_post.appendChild(button_risposta_post);
    var url;
    $(button_risposta_post).click(function (e) {
      if (userThatLogin.toString() !== "false") {
        e.preventDefault();
        e.stopPropagation();
        if (mess.type == "resp" || mess.type == "post") {
          if (isOpen == false) {
            var className = "";
            var respToPk = mess.pk;
            var respToType =
              "resp" + "To" + mess.type[0].toUpperCase() + mess.type.slice(1);
            for (var z2 = 0; z2 <= profiles_json.length - 1; z2 = z2 + 1) {
              if (profiles_json[z2].fields.first_name == mess.author) {
                var respToUser = profiles_json[z2].fields.first_name;
              }
            }
            mess instanceof Resp ? (className = "resp") : (className = "post");
            elementToAppendPostArea = document.getElementById(
              "divuserblog_" + id
            );
            if (mess instanceof Resp) {
              var post = mess.post;
            } else if (mess instanceof Post) {
              var post = mess;
            }
            var ids = resps.length;
            ids = ids + 1;
            createPostArea(
              (r = new Resp(
                userThatLogin[0].fields.first_name,
                "",
                new Date().toLocaleString(),
                post,
                BASE_PHOTO_DIR + userThatLogin[0].fields.photo,
                ids,
                "newresp",
                respToPk,
                respToType,
                respToUser
              )),
              elementToAppendPostArea
            );
            htmlIframeWidthHeight(document.getElementById("blog"));
            resps.push(r);
          } else if (
            button_risposta_post.textContent == "Rispondi" &&
            isOpen == true
          ) {
            msgIsTexareaOpen();
          }
        }
      } else {
        window.location.href = ("user/login/blog" + HIDDENFIELD);
        //window.location.href = XMLHTTPURL_LOGIN;
      }
    });
    $(button_risposta_post).hover(
      function () {
        $(button_risposta_post).animate(
          {
            width: "33%",
          },
          200
        );
        $(button_risposta_post).animate(
          {
            left: "33%",
          },
          200
        );
        $(button_risposta_post).css("box-shadow", "0 0 0 white"); //#719ECE"
      },
      function () {
        $(button_risposta_post).animate(
          {
            width: "100%",
          },
          200
        );
        $(button_risposta_post).css("box-shadow", "10px 10px 10px #719ECE");
      }
    );
    switch (mess.type) {
      case "newpost":
      case "newresp":
        $("#" + postarea.postarea.id).ready(function () {
          $("#" + postarea.postarea.id).focus();
          postarea.postarea.classList.add("form-control");
          //css("border","1px solid green")
        });
        button_risposta_post.textContent = "Invia";
        $(button_risposta_post).click(function () {
          //autorizzo la creazione del nuovo post solo se è valido: contiene testo ecc..
          let ids = "#" + postarea.postarea.id;
          let txts = $(ids).val();
          try {
            if (txts == "") {
              throw "Post Vuoto ! ";
            }
          } catch (err) {
            alert("Non posso inviare un messaggio vuoto !");
            return -1;
          }
          //form_risposta_post.setAttribute("action",url)
          url = URL_NEW_POST + "?mainurl=" + currentUrl
          mess.body = txts;
          if (sendToServer(mess, url) == 0) {
            isOpen = false;
          }
          $(postarea.postarea).css("box-shadow", "0 0 0 0");
          mess.type == "newpost" ? button_risposta_post.textContent = postinserito : button_risposta_post.textContent = postinviato;

          button_risposta_post.setAttribute("disabled", "");
          postarea.postarea.setAttribute("disabled", "");
          $(postarea.postarea).css("color", "rgba(0, 0, 0, 0.5)");
          $(postarea.postarea).css("border", "1px solid green");
          $(button_risposta_post).css("color", "black");
        });
        break;
      case "post":
        var objectToAppendChild = divUserBlog.id;
        button_risposta_post.textContent = buttonRispo;
        break;
      case "resp":
        var objectToAppendChild = "divuserblog_" + id;
        button_risposta_post.textContent = buttonRispo;
        break;
    }
    var elementToAppendButton = document.getElementById(objectToAppendChild);
    elementToAppendButton.appendChild(form_risposta_post);
    setButtonAndFormAttribute(id);

    function setButtonAndFormAttribute(type) {
      let buttonID = "but_" + mess.type + "_" + type;
      button_risposta_post.setAttribute("type", "button");
      button_risposta_post.setAttribute("id", buttonID);
      button_risposta_post.setAttribute("class", "btn btn-lg btn-block");
      if (mess.body === ".....")
        button_risposta_post.setAttribute("disabled", "true");
      form_risposta_post.setAttribute("id", "form_" + mess.type + "_" + id);
      form_risposta_post.setAttribute("class", "form_" + mess.type + "_" + id);
      form_risposta_post.setAttribute("action", "javascript:void(0)");
    }
  }

  disableButton(button) {
    button.setAttribute("disabled", "");
  }

  create() {
    $(this.postarea).animate({
      width: "100%",
    }); // nu second e dui 1,2sec
    //divUserBlog.animate({'width':'50%'},4000);// nu second e dui 1,2sec
    //this.postarea.setAttribute("rows", "3");
    this.postarea.setAttribute("name", "messaggio");
    $(this.postarea).css("border", borderPost);
    //this.postarea.setAttribute("title","Autenticarsi NON è Obbligatorio !")
    return this.postarea;
  }
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function initBlogSGang(u, p, url) {
  var xhttp2 = new XMLHttpRequest();
  var requestPostKey;
  var blog;
  if ((u !== "undefined" && p !== "undefined" && (url !== null || url !== "undefined")) && (u !== "" && p !== "" && url !== "")) {
    currentUrl = url.replace(/\/$/, "");
    user = u;
    password = p;
    localStorage.setItem("user", user);
    localStorage.setItem("password", password);
    localStorage.setItem("url", currentUrl);
  }
  else {
    u = localStorage.getItem("user");
    p = localStorage.getItem("password");
    currentUrl = localStorage.getItem("url");
  }
  var xhttp2 = new XMLHttpRequest();
  var requestPostKey;
  var blog;
  HIDDENFIELD = "?mainurl=" + currentUrl;
  XMLHTTPURL_LOGIN = BASE_URL + "user/login/blog?mainurl=" + currentUrl;
  XMLHTTPURL_LOGOUT = BASE_URL + "user/logout/blog" + HIDDENFIELD;
  XMLHTTPURL_REGISTER = BASE_URL + "user/register/bloguser" + HIDDENFIELD;
  HTTPURL_CHANGEPASSWORD = BASE_URL + "user/login/change_password" + HIDDENFIELD;
  /* PRIMA REQUEST PER IL TOKEN CHE AUTORIZZA LA CHIAMATA A CHECKUSER FUNCTION */
  function sendTokenPost() {
    blog = document.getElementById("s_blog");
    if (blog !== null) {
      document.getElementById("s_blog").remove();
    }
    (function () {
      let s = {
        user: u,
        password: p,
        currentUrl: currentUrl,
      };
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        mode: "cors",
        body: JSON.stringify(s),
      };
      fetch(XMLHTTPURL_GETUSER, request)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          //response=JSON.stringify(json)
          authorized = json.authorized;
          authenticated = json.authenticated;
          if (authorized.toString() === "true") {
            if (authenticated !== "false")
              authenticated = JSON.parse(json.authenticated);
          }
          return createSectionDivSpan(authorized, authenticated);
        });
    })();
  }

  function getToken() {
    xhttp2.open("GET", XMLHTTPURL_GETUSER, true);
    xhttp2.withCredentials = true;
    var headers = xhttp2.getAllResponseHeaders().toLowerCase();
    xhttp2.send();
    checkUserToken = getCookie("sessionid");
    xhttp2.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        response = xhttp2.responseText;
        if (response) {
          json = JSON.parse(response);
          requestPostKey = json.csrf_token;
          console.log("response GET initBlog...." + response);
          sendTokenPost(requestPostKey);
        }
      }
    };
  }

  sendTokenPost();

}

function getComment() {
  var obj;
  var indexX = 0;
  y = 0;
  var s, z2;
  mess = new Array();
  resps = new Array();
  var profiles = new Array();
  profiles_json = new Array();
  var z = 0;
  comments_json = new Array();
  butcloned = document.getElementById("button_post");
  $(".mybut").hover(
    function () {
      $(".mybut").css("box-shadow", "0 0 0 white");
    },
    function () {
      $(".mybut").css("box-shadow", "10px 10px 10px #719ECE");
    }
  );
  $.ajax({
    url:
      BASE_URL +
      "post/showposts" + HIDDENFIELD,
    data: {
      userAuth: userAuth,
    },
    dataType: "json",
    success: function (data) {
      try {
        s = cleanJson(data);
        obj = JSON.parse(s);
        comments_json = JSON.parse(obj.data_comm); // blog.comment
        resps_json = JSON.parse(obj.resps);
        profiles_json = JSON.parse(obj.profiles);
      } catch (SyntaxError) {
        obj = "";
        comments_json = ""; // blog.comment
        resps_json = "";
        profiles_json = "";
      }

      var photoResp;
      var i = 0;
      var respToUser;
      if (comments_json.length > 0) {
        for (i = 0; i <= comments_json.length - 1; i = i + 1) {
          for (z = 0; z <= profiles_json.length - 1; z = z + 1) {
            if (profiles_json[z].pk == comments_json[i].fields.author) {
              profiles.push(
                new Profile(
                  profiles_json[z].fields.first_name,
                  BASE_PHOTO_DIR + profiles_json[z].fields.photo
                )
              );
              mess.push(
                new Post(
                  "post",
                  profiles_json[z].fields.first_name,
                  comments_json[i].fields.title,
                  comments_json[i].fields.body,
                  getDateFromDjangoDate(comments_json[i].fields.publish),
                  BASE_PHOTO_DIR + profiles_json[z].fields.photo,
                  comments_json[i].pk
                )
              );
              createPostArea(mess[indexX]);
              htmlIframeWidthHeight(document.getElementById("blog"));
              break;
            }
          }
          z = 0;
          for (y = resps_json.length - 1; y >= 0; y = y - 1) {
            if (comments_json[i].pk == resps_json[y].fields.commento) {
              for (z2 = 0; z2 <= profiles_json.length - 1; z2 = z2 + 1) {
                if (profiles_json[z2].pk == resps_json[y].fields.author) {
                  photoResp = BASE_PHOTO_DIR + profiles_json[z2].fields.photo;
                  break;
                }
              }
              for (var z3 = 0; z3 <= profiles_json.length - 1; z3 = z3 + 1) {
                if (profiles_json[z3].pk == resps_json[y].fields.respToUser) {
                  respToUser = profiles_json[z3].fields.first_name;
                  break;
                }
              }
              resps.push(
                new Resp(
                  profiles_json[z2].fields.first_name,
                  resps_json[y].fields.body,
                  getDateFromDjangoDate(resps_json[y].fields.publish),
                  mess[indexX],
                  photoResp,
                  resps_json[y].pk,
                  "resp",
                  resps_json[y].fields.idRespTo,
                  resps_json[y].fields.postType,
                  respToUser
                )
              );
              mess[indexX].risposte.push(resps.at(-1));
              var elementToAppend = resps.at(-1).respToID;
              if (resps_json[y].fields.postType === "respToPost") {
                elementToAppend =
                  "divuserblog_" +
                  elementToAppend +
                  "." +
                  resps.at(-1).post.type +
                  "_" +
                  elementToAppend;
              } else if (resps_json[y].fields.postType === "respToResp") {
                _character_1 = resps.at(-1).post.pk;
                elementToAppend =
                  "divuserblog_" + _character_1 + "_" + elementToAppend;
              }
              elementToAppend = $("#" + elementToAppend);
              if (!elementToAppend.length > 0) {
                break;
              } else {
                createPostArea(resps.at(-1), elementToAppend);
                htmlIframeWidthHeight(document.getElementById("blog"));
              }
            }
          }
          y = 0;
          indexX = indexX + 1;
        }
      } else {
        mess.push(
          new Post(
            "post",
            "tinkyblink",
            "Commenta Per Primo",
            ".....",
            "",
            BASE_URL + "static/images/user-secret-solid.gif",
            "0"
          )
        );
        createPostArea(mess[0]);
        htmlIframeWidthHeight(document.getElementById("blog"));
      }
    },
  });
}

function htmlIframeWidthHeight(elem) {
  var height, width;
  //var bsectionHeight = document.getElementById("blog");
  height = elem.scrollHeight + 340;
  width = elem.scrollWidth + 200;
  window.top.postMessage(
    {
      height: height,
      base: width,
    },
    "*"
  );
  return elem;
}
/* esegui se l'uiser è loggato */
$(bbutton).click(function () {
  openNewCommentArea();
});

window.buttonLinkComment.addEventListener("click", function () {
  openNewCommentArea();
});

function openNewCommentArea() {
  if (userThatLogin.toString() !== "false") {
    if (isOpen == false) {
      buttonCommentClick();
    } else {
      msgIsTexareaOpen();
    }
  } else {
    window.location.href = XMLHTTPURL_LOGIN;
  }
}

function buttonCommentClick() {
  function instancePost() {
    let mess = {};
    if (!(mess instanceof Post) && !(mess instanceof Resp)) {
      exist = false;
      mess = new Post("newpost", userThatLogin);
      if (exist == false) {
        createNewComment(mess);
        location.href = "#blog";
      }
    }
    exist = true;
    Boolean(exist);
  }
  if (!(post instanceof postArea)) {
    post = instancePost();
  }
}

function createNewComment(mess) {
  mess.titled = "nuovo";
  newPostId = newPostId + 1;
  mess.type = "newpost";
  mess.publish = getDateFromDjangoDate();
  mess.author = userThatLogin[0].fields.first_name;
  userThatLogin[0].fields.photo == "undefined"
    ? alert("non ho la photo dell user !")
    : (mess.photo = BASE_PHOTO_DIR + userThatLogin[0].fields.photo); //la cartella media si trova nel path del progetto :"tutorial"
  mess.pk = newPostId;
  createPostArea(mess);
  htmlIframeWidthHeight(document.getElementById("blog"));
  if (exist == false) {
    Boolean(exist);
    return mess;
  }
  //return htmlIframeWidthHeight();
}

function getDateFromDjangoDate(data = "") {
  var dateNow = new Date();
  var dataDjango;
  var data1;
  var data2;
  isNow = function () {
    data1 = dataDjango.getDate();
    data2 = dateNow.getDate();
    return data1 == data2;
  };
  var newDate;
  var day, month, year, hour;
  if (data == "") {
    var dataDjango = new Date();
    var today = new Date();
    day = String(today.getDate()).padStart(2, "0");
    day = isNow();
    month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    month = getMonth(month);
    year = today.getFullYear();
    hour = today.getHours().toString() + ":" + today.getMinutes().toString();
    data = getMsg();
    var dataDjango = new Date(data);
  } else {
    var dataDjango = new Date(data);
    day = data.slice("8", "10");
    month = data.slice("5", "7");
    month = getMonth(month);
    year = data.slice("0", "4");
    hour = data.slice("11", "16");
    data = getMsg();
  }

  function getMonth(month) {
    var res;
    switch (month) {
      case "01":
        res = "gennaio";
        break;
      case "02":
        res = "febbraio";
        break;
      case "03":
        res = "marzo";
        break;
      case "04":
        res = "aprile";
        break;
      case "05":
        res = "maggio";
        break;
      case "06":
        res = "giugno";
        break;
      case "07":
        res = "luglio";
        break;
      case "08":
        res = "agosto";
        break;
      case "09":
        res = "settembre";
        break;
      case "10":
        res = "ottobre";
        break;
      case "11":
        res = "novembre";
        break;
      case "12":
        res = "dicembre";
        break;
    }
    return res;
  }

  function getMsg() {
    if (isNow()) {
      data = "Oggi alle" + " " + hour;
    } else {
      day = day.replace("0", "");
      data = day + " " + month + " " + year + " alle " + hour;
    }
    return data;
  }
  newDate = data;
  return newDate;
}

function cleanJson(json) {
  this.data = json.toString();
  s = this.data
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  return s;
}

function createPostArea(messOrResp, elementToAppendArea) {
  if (!(isOpen == true)) {
    paPostOrResp = new postArea(messOrResp);
    paPostOrResp.makeHeadBlog(messOrResp, paPostOrResp, elementToAppendArea);
    $(paPostOrResp.postarea).css("overflow-y", "hidden");
    paPostOrResp.createButtonRispostaPost(messOrResp, paPostOrResp);
  } else {
    msgIsTexareaOpen();
  }
  if (messOrResp.type == "newresp" || messOrResp.type == "newpost") {
    isOpen = true;
  } else {
    if (messOrResp.type == "post" || messOrResp.type == "resp") {
      isOpen = false;
    }
  }
  return paPostOrResp;
}

function msgIsTexareaOpen() {
  alert("Hai un post già aperto !");
}

function sendToServer(post, url) {
  if (post.type == "newresp") {
    data = {
      publish: post.publish,
      commento: post.post.pk,
      type: post.type,
      username: userThatLogin[0].fields.first_name,
      useradmin: user,
      body: post.body,
      respTo: post.respToID,
      id: post.pk,
      respToType: post.respToType,
      respToUser: post.respToUser,
    };
  } else if (post.type == "newpost") {
    data = {
      type: post.type,
      tutorial: post.thisTutorialTitle,
      useradmin: user,
      username: userThatLogin[0].fields.first_name,
      body: post.body,
    };
  }
  if (post.type == "newpost" || post.type == "newresp") {
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      success: function (data) {
        var userPhoto = data.photo;
        if (post.type == "newpost" || post.type == "newresp") {
          isOpen = false;
          //  paPostOrResp.makeHeadBlog(data.type,data.photo,this,data.aggiornato)
        }
      },
    });
  }
  return 0;
}

