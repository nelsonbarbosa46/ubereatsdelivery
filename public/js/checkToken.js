var token = getCookie("tokenSession")

if (token !== '' && token !== null) {
    var url = getUrlToSubmit();
    //check if token is right
    $.ajax({
        url: url+'/api/check/checkTokenInitialPage',
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function (data) {
            let redirect = data.pageRedirect;
            switch (redirect) {
                case "/client/":
                    window.location.replace(url + redirect + "index.html");
                    break;

                case "/merchant/":
                    window.location.replace(url + redirect + "index.html");
                    break;

                case "/admin/":
                    window.location.replace(url + redirect + "index.html");
                    break;
                default:
                    break;
            }
        }, error: function () {
            delCookie("tokenSession");
        }

    })
}