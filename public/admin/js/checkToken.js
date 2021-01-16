var token = getCookie("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        var url = getUrlToSubmit();
        $.ajax({
            //3=admin (on backend is going to check if token has typeUser=3 or typeUser=4)
            url: url+'/api/check/checkToken/3',
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
        idUser = data.id;
        nameUser = data.name;
        emailUser = data.email;
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
