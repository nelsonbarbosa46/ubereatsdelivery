var token = sessionStorage.getItem("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            //2=merchant 
            url: 'http://localhost:3000/api/check/checkToken/2',
            type: 'PUT',
            cache: false,
            data: {
                token: token
            }, 
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

if (token !== '' && token !== null) {
    ajaxToken().then((data) => {
        typeUser = data.typeUser;
        continueScript();
    }).catch((error) => {
        console.log(error);
        sessionStorage.removeItem("tokenSession");
        //get current url
        var urlPage = window.location.href;
        //remove merchant/index.html
        urlPage = urlPage.replace("/merchant/index.html", "/index.html");
        location.replace(urlPage);
    })
} else {
    //get current url
    var urlPage = window.location.href;
    //remove merchant/index.html
    urlPage = urlPage.replace("/merchant/index.html", "/index.html");
    location.replace(urlPage);
}
