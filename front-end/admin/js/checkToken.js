var token = sessionStorage.getItem("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            //3=admin (on backend is going to check if token has typeUser=3 or typeUser=4)
            url: 'http://localhost:3000/api/check/checkToken/3',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            }, 
            success: function (data) {
                console.log(data);
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
        console.log(typeUser);
        idUser = data.id;
        nameUser = data.name;
        emailUser = data.email;
        continueScript();
    }).catch((error) => {
        console.log(error);
        sessionStorage.removeItem("tokenSession");
        //get current url
        var urlPage = window.location.href;
        
        //remove admin/index.html
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/admin/index.html", "!delete");
        //Remove everything after a "!delete" and after add "/index.html"
        urlPage = urlPage.replace(/\!delete.*/, "/index.html");
        location.replace(urlPage);
    })
} else {
    //get current url
    var urlPage = window.location.href;
    //remove admin/index.html
    //change to !delete because after is going to delete everything after a "!delete"
    urlPage = urlPage.replace("/admin/index.html", "!delete");
    //Remove everything after a "!delete" and after add "/index.html"
    urlPage = urlPage.replace(/\!delete.*/, "/index.html");
    location.replace(urlPage);
}
