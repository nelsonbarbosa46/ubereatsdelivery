var token = getCookie("tokenSession");

function ajaxToken() {
    return new Promise((resolve, reject) => {
        var url = getUrlToSubmit();
        $.ajax({
            //2=merchant 
            url: url+'/api/check/checkToken/2',
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
        //create variable to use when show products
        productsShowCount = 0;
        continueScript();
    }).catch((error) => {
        console.log(error);
        alert(error);
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
