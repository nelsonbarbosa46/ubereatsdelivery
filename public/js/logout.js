$("#btnTermissaoSessao").click(function () {
    //delete token
    delCookie("tokenSession");
    delCookie("name");
    delCookie("email");
    //get origin url
    var url = getUrlToSubmit();
    window.location.replace(url);
});