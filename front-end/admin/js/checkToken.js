var token = sessionStorage.getItem("tokenSession");
var typeUser;

if (token !== '' && token !== null) {
    //check if token is right
    $.ajax({
        //3=admin (on backend is going to check if token has typeUser=3 or typeUser=4)
        url: 'http://localhost:3000/api/check/checkToken/3',
        type: 'PUT',
        cache: false,
        data: {
            token: token
        }, success: function (data) {
            typeUser = data.typeUser;
        },
        error: function () {
            sessionStorage.removeItem("tokenSession");
            //get current url
            var urlPage = window.location.href;
            //remove admin/index.html
            urlPage = urlPage.replace("/admin/index.html", "/index.html");
        }
    })
}