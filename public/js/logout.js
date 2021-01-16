$("#btnTermissaoSessao").click(function () {
    //delete token
    delCookie("tokenSession");
    //get origin url
    var url = getUrlToSubmit();
    window.location.replace(url);
});