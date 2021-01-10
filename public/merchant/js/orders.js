function toggleSectionOrders() {
    console.log(12);
    var display = $("#sectionOrders").css('display');
    if (display == 'none') {
        $("#sectionProducts").css('display', 'none');
        $("#sectionOrders").fadeIn(500);
    }
}