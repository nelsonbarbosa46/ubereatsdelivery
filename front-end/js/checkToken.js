var token = sessionStorage.getItem("tokenSession");

//current url page
var urlPage = window.location.href;
//remove index.html
urlPage = urlPage.replace("/index.html", "");
if (token !== '' && token !== null) {
    //check if token is right
    $.ajax({
        url: 'http://localhost:3000/api/check/checkTokenInitialPage',
        type: 'POST',
        cache: false,
        data: {
            token: token
        },
        success: function (data) {
            let redirect = data.pageRedirect;
            switch (redirect) {
                case "/client/":
                    location.replace(urlPage + redirect + "index.html");
                    break;

                case "/merchant/":
                    location.replace(urlPage + redirect + "index.html");
                    break;

                case "/admin/":
                    location.replace(urlPage + redirect + "index.html");
                    break;
                default:
                    break;
            }
        }
    })

}