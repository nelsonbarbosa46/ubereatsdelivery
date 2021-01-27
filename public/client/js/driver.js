function toogleSectionOrders() {
    var display = $("#sectionOrders").css('display');
    if (display == 'none') {
        $("#sectionInitial").css('display', 'none');
        $("#sectionOrders").fadeIn(500);
    }
}

function toogleSectionInitial() {
    var display = $("#sectionInitial").css('display');
    if (display == 'none') {
        $("#sectionOrders").css('display', 'none');
        $("#sectionInitial").fadeIn(500);
    }
}