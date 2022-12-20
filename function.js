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
