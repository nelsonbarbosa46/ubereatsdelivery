$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').formSelect();

    $('input#registerClientNIF, input#registerClientContactNumber').characterCounter();

    $("#openFormRegisterMerchant").click(function(){
        if ($("#formRegisterClient").css('display') !== 'none') {
            $("#formRegisterClient").slideToggle(700);
        }
        $("#formRegisterMerchant").slideToggle(700);
    });

    $("#isDriver").click(function () {
       if ($("#isDriver").is(":checked")) {
           $("#formDriver").fadeIn();
       } else {
           $("#formDriver").fadeOut();
       }
    });

    $("#openFormRegisterClient").click(function(){
        if ($("#formRegisterMerchant").css('display') !== 'none') {
            $("#formRegisterMerchant").slideToggle(700);
        }
        $("#formRegisterClient").slideToggle(700);
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //submit form create client/driver
    $("#submitFormCreateClient").click(function (event) {
        event.preventDefault();

    
        var email = $("#registerClientEmail").val();
        var name =$("#registerClientName").val();
        var password = $("#registerClientPassword").val();
        var repeatPassword = $("#registerClientRepeatPassword").val();
        var address = $("#registerClientAddress").val();
        var zipCode = $("#registerClientZipCode").val();
        var location = $("#registerClientLocation").val();
        var nif = $("#registerClientNIF").val();
        var contactNumber = $("#registerClientContactNumber").val();
        var isDriver = $("#isDriver").is(":checked");
        if ($("#isDriver").is(":checked")) {
            var typeVehicle = $("#registerClientTypeVehicle").val();
        }
        var valueIsDriver;
        if (isDriver) {
            //change to 1 because of API
            valueIsDriver = 1;
        } else {
            //change to 0 because of API
            valueIsDriver = 0;
        }

        console.log({
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            address: address,
            zipCode: zipCode,
            location: location,
            nif: nif,
            isDriver: valueIsDriver,
            contactNumber: contactNumber,
            typeVehicle: typeVehicle
        });

        var errFields = false;

        //check email
        if (!validateEmail(email)) {
            errFields = true;
            M.toast({html: 'Email inválido!'})
        }

        //check if passwords are correct
        if (password !== repeatPassword) {
            errFields = true;
            M.toast({html: 'Palavras passe não coincidem!'})
        }

        //check if fields are empty
        if (email === "" || password === "" || repeatPassword === '' || address === '' || zipCode === '' 
        || location === '' || nif === '' || contactNumber === '') {
            errFields = true;
            M.toast({html: 'Campos vazios!'})
        }

        //if its Driver, check variable typeVehicle
        if (isDriver) {
            if (typeVehicle === null) {
                errFields = true;
                M.toast({html: 'Campos vazios!'})
            }
        }

        if (!errFields) {
            if (isDriver) {
                $.ajax({
                    url: 'http://localhost:3000/api/register/signupClientDriver',
                    type: 'POST',
                    cache: false,
                    data: { 
                        email: email,
                        password: password,
                        address: address,
                        zipCode: zipCode,
                        location: location,
                        name: name,
                        nif: nif,
                        contactNumber: contactNumber,
                        isDriver: auxIsDriver,
                        typeVehicle: typeVehicle,
                        isDriver: valueIsDriver
                    },
                    success: function (data) {
                        console.log(data);
                        M.toast({html: 'Registado com sucesso!'});
    
                    }, 
                    error: function (jqXHR, textStatus, err) {
                        console.log(jqXHR);
                        console.log(err,textStatus);
                        M.toast({html: 'Erro ao registar!'});
                    }
                })
            } else {
                //change to 0 because of API
                var auxIsDriver = "0";
                console.log(isDriver);
                $.ajax({
                    url: 'http://localhost:3000/api/register/signupClientDriver',
                    type: 'POST',
                    cache: false,
                    data: {
                        email: email,
                        password: password,
                        address: address,
                        zipCode: zipCode,
                        location: location,
                        name: name,
                        nif: nif,
                        contactNumber: contactNumber,
                        isDriver: valueIsDriver
                    },
                    success: function (data) {
                        console.log(data);
                        M.toast({html: 'Registado com sucesso!'});
    
                    }
                    , error: function (jqXHR, textStatus, err) {
                        console.log(err,textStatus);
                        M.toast({html: 'Erro ao registar!'});
                    }
                })
            }
        }
    });
});

