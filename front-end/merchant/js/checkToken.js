var token = sessionStorage.getItem("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            //2=merchant 
            url: 'http://localhost:3000/api/check/checkToken/2',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
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
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/merchant/index.html", "!delete");
        //Remove everything after a "!delete" and after add "/index.html"
        urlPage = urlPage.replace(/\!delete.*/, "/index.html");
        location.replace(urlPage);
    })
} else {
    //get current url
    var urlPage = window.location.href;
    //remove merchant/index.html
    //change to !delete because after is going to delete everything after a "!delete"
    urlPage = urlPage.replace("/merchant/index.html", "!delete");
    //Remove everything after a "!delete" and after add "/index.html"
    urlPage = urlPage.replace(/\!delete.*/, "/index.html");
    location.replace(urlPage);
}
