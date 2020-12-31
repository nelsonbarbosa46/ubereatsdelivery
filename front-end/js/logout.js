$("#btnTermissaoSessao").click(function () {
    //delete token
    sessionStorage.removeItem("tokenSession");
    //get current url
    var urlPage = window.location.href;
    //search url (if returns -1, mean dont found the sentence)
    if (urlPage.search('/admin/index.html') != -1) {
        //remove admin/index.html
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/admin/index.html", "!delete");

    } else if (urlPage.search('/merchant/index.html') != -1) {
        //remove merchant/index.html
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/merchant/index.html", "!delete");

    } else {
        //remove client/index.html
        //change to !delete because after is going to delete everything after a "!delete"
        urlPage = urlPage.replace("/client/index.html", "!delete");
    }
    //Remove everything after a "!delete" and after add "/index.html"
    urlPage = urlPage.replace(/\!delete.*/, "/index.html");
    window.location.replace(urlPage);
});