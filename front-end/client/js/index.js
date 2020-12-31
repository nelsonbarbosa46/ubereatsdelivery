function continueScript() {
    $(document).ready(function () {
        $(".modal").modal();
        $('.sidenav').sidenav({
           edge: 'right'
        }); 
       
        $(document).on('change', '#formChangeEP input', function() {
            var email = $("#formChangeEPEmail").val();
            var password = $("#formChangeEPPassword").val();
            var repeatPassword = $("#formChangeEPRepeatPassword").val();

            if (email === '' && password === '' && repeatPassword === '') {
                $('#formSubmitChangeEP').prop('disabled', true);
            } else {
                $('#formSubmitChangeEP').prop('disabled', false);
            }
        });

        /*check if password has at least 8 characters and no more than 15 characters,
        one uppercase, one lowercase and one number*/
        $("#formChangeEPPassword").on("keyup", function () {
            var password = $(this).val();
            if (password.match(/[a-z]/g) === null || 
            password.match( /[A-Z]/g) === null || 
            null === password.match( /[0-9]/g) || password.length < 8 || password.length > 15) {
                $(this).addClass("invalid");
                $(this).removeClass("valid");
            } else {
                $(this).removeClass("invalid");
                $(this).addClass("valid");
            }
        });

        //check if repeatPasssword is equal to password
        $("#formChangeEPRepeatPassword").on("keyup", function () {
            var repeat = $(this).val();
            var password = $("#formChangeEPPassword").val();
            
            if (repeat === password) {
                $(this).removeClass("invalid");
                $(this).addClass("valid");
            } else {
                $(this).addClass("invalid");
                $(this).removeClass('valid');
            }
        });

        $("#formChangeEP").submit(function (e) {
            e.preventDefault();

            var email = $("#formChangeEPEmail").val();
            var password = $("#formChangeEPPassword").val();
            var repeatPassword = $("#formChangeEPRepeatPassword").val();

            $.ajax({
                url: 'http://localhost:3000/api/user/changeEP/'+idUser,
                type: 'PUT',
                cache: false,
                headers: {
                    "Authorization": 'Bearer ' + token
                },
                data: { 
                    email: email,
                    password: password,
                    repeatPassword: repeatPassword
                },
                
                success: function () {
                    //clean fields and change button to disabled
                    $("#formChangeEPEmail").val('');
                    $("#formChangeEPEmail").removeClass('valid');
                    $("#formChangeEPPassword").val('');
                    $("#formChangeEPPassword").removeClass('valid');
                    $("#formChangeEPRepeatPassword").val('');
                    $("#formChangeEPRepeatPassword").removeClass('valid');
                    $('#formSubmitChangeEP').prop('disabled', true);   
                    M.toast({html: 'Alterado com sucesso'});

                }, 
                error: function (jqXHR, textStatus, err) {
                    console.log(jqXHR);
                    console.log(err,textStatus);
                    M.toast({html: 'Erro Ao Alterar!'});
                }
            })

        });

    });



}