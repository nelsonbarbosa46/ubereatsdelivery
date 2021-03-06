var token = getCookie("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        url = getUrlToSubmit();
        $.ajax({
            //0=client (on backend is going to check if token has typeUser=0 or typeUser=1)
            url: url+'/api/check/checkToken/0',
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

function ajaxNameEmail() {
    return new Promise((resolve, reject) => {
        url = getUrlToSubmit();

        $.ajax({
            url: url+'',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            }, success: function (data) {
                resolve(data);     
            }
        });
    });
}

if (token) {
    ajaxToken().then((data) => {
        nameUser = getCookie("name");
        emailUser = getCookie("email");
        typeUser = data.typeUser;
        idUser = data.id;
        //continueScript is on file index.js
        continueScript();
    }).catch((error) => {
        console.log(error);
        delCookie("tokenSession");
        //get origin url
        var urlOrigin = getUrlToSubmit();
        //redirect
        window.location.replace(urlOrigin+'/index.html');
    })
} else {
    delCookie("tokenSession");
    //get origin url
    var urlOrigin = getUrlToSubmit();
    //redirect
    window.location.replace(urlOrigin+'/index.html');
}
