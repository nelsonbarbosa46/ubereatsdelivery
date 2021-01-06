var token = sessionStorage.getItem("tokenSession");

//current url page
var urlPage = window.location.href;
//change to !delete because after is going to delete everything after a "!delete"
urlPage = urlPage.replace("/index.html", "!delete");
//Remove everything after a "!delete"
urlPage = urlPage.replace(/\!delete.*/, "");
if (token !== '' && token !== null) {
    //check if token is right
    $.ajax({
        url: 'http://localhost:3000/api/check/checkTokenInitialPage',
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
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