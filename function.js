    const request = new Request(
XMLHTTPURL_LOGIN,
{
    method: 'POST',
    credentials: 'include' ,
    headers:{ 'X-CSRFToken' : 'bfz4x8-c1af485ef2143589290ab28462f5e6f6' },
    mode: 'cors' ,// Do not send CSRF token to another domain.
    data:{'user':newUserLogin,'password':newUserpassword,'requestSite':CURRENT_URL},
}
);


//document ready in javascrip :

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World!");
});

// prendi fields di object  in models
User._meta.get_fields()

// javascript on page load
document.addEventListener("DOMContentLoaded", () => {
})

// recuperare url della pagina :

location.href

################### django # set token by user object

token =default_token_generator.make_token(user)

################ ALTEZZA DELL CONTENUTO NELL' IFRAME HTML . COMUNCATA ALLÌ IFRAME STESSO IN MODO CHE ### ////REGOLI L' ALTEZZA.

###DALL INTERNO IFRAME IN JAVASCRIPT
function htmlIframeHeight(){
    var bsectionHeight=document.getElementById('blog');
    var bsectionHeight=bsectionHeight.scrollHeight;
    localStorage.setItem("iframeheight",bsectionHeight.toString())


    window.top.postMessage({"ogetto":bsectionHeight}, '*');
    return bsectionHeight;
}

################RICEVENTE DEL MESSAGGIO

alert("received")
window.addEventListener("message", function (event) {
if (!(event.origin.includes('https://127.0.0.1:8000'))) {
   console.log("messaggio ignorato");
   return -1;
   ("mancata autorizzazione!")
   }
else{
   var msg = JSON.parse(event.data);
   var height=JSON.parse(msg.booldogheight)
   alert(height)
   }
});
</script>
