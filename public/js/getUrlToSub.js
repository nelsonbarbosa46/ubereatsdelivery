function getUrlToSubmit() {
    var urlOrigin = window.location.origin;
    var url;
    if (urlOrigin == 'file://') {
        url = 'http://localhost:3000';
    } else {
        url = urlOrigin;
    }

    return url;
}