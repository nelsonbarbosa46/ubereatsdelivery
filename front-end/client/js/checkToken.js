var token = sessionStorage.getItem("tokenSession");
function ajaxToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            //0=client (on backend is going to check if token has typeUser=0 or typeUser=1)
            url: 'http://localhost:3000/api/check/checkToken/0',
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
        idUser = data.id;
        nameUser = data.name;
        emailUser = data.email;
        //continueScript is on file index.js
        continueScript();
    }).catch((error) => {
        console.log(error);
        sessionStorage.removeItem("tokenSession");
        //get current url
        var urlPage = window.location.href;
        //remove client/index.html
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/client/index.html", "!delete");
        //Remove everything after a "!delete" and after add "/index.html"
        urlPage = urlPage.replace(/\!delete.*/, "/index.html");
        location.replace(urlPage);
    })
} else {
    //get current url
    var urlPage = window.location.href;
    //remove client/index.html
    //change to !delete because after is going to delete everything after a "!delete"
    urlPage = urlPage.replace("/client/index.html", "!delete");
    //Remove everything after a "!delete" and after add "/index.html"
    urlPage = urlPage.replace(/\!delete.*/, "/index.html");
    location.replace(urlPage);
}
