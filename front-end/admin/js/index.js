//function called from file checkToken when its valid
function continueScript() {
    
    $(".modal").modal();
    $('.sidenav').sidenav({
       edge: 'right'
    }); 
    //put email and name on sidenav (profile)
    $("#pageNameUser").text(nameUser);
    $("#pageEmailUser").text(emailUser);
    //delete option "Eliminar conta" if user is SuperAdmin
    console.log(typeUser);
    if (typeUser == 4) {
        $("#liModalDeleteAccount").remove();
        $("#modalDeleteAccount").remove();
    }
    //verify if on change input on form change email/password is empty or not, if its empty disabled button
    //to submit, if not, button is enabled
    $(document).on('change', '#formChangeEP input', verifyInputsFormEP);
    //check if password has at least 8 characters and no more than 15 characters,
    //one uppercase, one lowercase and one number
    $("#formChangeEPPassword").on("keyup", checkIfPasswordValid);
    //check if repeatPasssword is equal to password on form change email/password
    $("#formChangeEPRepeatPassword").on("keyup", checkPassEqualRepeat);
    //submit form Change Email/Password
    $("#formChangeEP").submit(function (e) {submitFormChangeEP(e);});
}