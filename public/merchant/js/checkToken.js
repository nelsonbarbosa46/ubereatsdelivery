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

function ajaxGetImage() {
    var url = getUrlToSubmit();
    $.ajax({
        url: url+'/api/user/getLogoMe/'+idUser,
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        }, 
        success: function (data) {
            console.log(data.image);
            var urlImage = data.image;
            var urlImageRemoved = urlImage.replace("public"+String.fromCharCode(92), "");
            console.log(urlImageRemoved);
            $("#userIcon").attr("src", "../"+urlImageRemoved);
        }
    });
}

function checkCanWork() {
    var url = getUrlToSubmit();
    $.ajax({
        url: url+'/api/check/checkMerchantChecked/'+idUser,
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        }, 
        success: function () {
        }, error: function () {
            $("#errorCanWork").html("<div class='card-panel orange lighten-1 divErrorCanWork'><b>Não pode usar as funcionalidades pois o administrador\
            ainda não verificou ou rejeitou para usar as funcionalidades</b></div>");
        }
    });
}

if (token !== '' && token !== null) {
    ajaxToken().then((data) => {
        typeUser = data.typeUser;
        idUser = data.id;
        nameUser = getCookie("name");
        emailUser = getCookie("email");
        ajaxGetImage();
        checkCanWork();
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
