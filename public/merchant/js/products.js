function toggleSectionProducts() {
    console.log(11);
    var display = $("#sectionProducts").css('display');
    if (display == 'none') {
        $("#sectionOrders").css('display', 'none');
        $("#sectionProducts").fadeIn(500);
    }
}