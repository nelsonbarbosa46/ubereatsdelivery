function toggleSectionOrders() {
    var display = $("#sectionOrders").css('display');
    if (display == 'none') {
        $("#sectionProducts").css('display', 'none');
        $("#sectionOrders").fadeIn(500);
    }
}