$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').formSelect();

    $('input#registerClientNIF, input#registerClientContactNumber, #registerMerchantDescription').characterCounter();

    $("#openFormRegisterMerchant").click(function(){
        if ($("#divFormRegisterClient").css('display') !== 'none') {
            $("#divFormRegisterClient").slideToggle(700);
        }
        $("#divFormRegisterMerchant").slideToggle(700);
    });

    $("#isDriver").click(function () {
       if ($("#isDriver").is(":checked")) {
           $("#formDriver").fadeIn();
       } else {
           $("#formDriver").fadeOut();
       }
    });

    $("#openFormRegisterClient").click(function(){
        if ($("#divFormRegisterMerchant").css('display') !== 'none') {
            $("#divFormRegisterMerchant").slideToggle(700);
        }
        $("#divFormRegisterClient").slideToggle(700);
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

    //submit form create merchant
    $("#formRegisterMerchant").submit(function (event) {
        event.preventDefault();

        var name =$("#registerMerchantName").val();
        var email = $("#registerMerchantEmail").val();
        var password = $("#registerMerchantPassword").val();
        var repeatPassword = $("#registerMerchantRepeatPassword").val();
        var address = $("#registerMerchantAddress").val();
        var zipCode = $("#registerMerchantZipCode").val();
        var location = $("#registerMerchantLocation").val();
        var nipc = $("#registerMerchantNIPC").val();
        var category = $("#registerMerchantCategory").val();
        var description = $("#registerMerchantDescription").val();
        var contactNumber = $("#registerMerchantContactNumber").val();
        
        console.log("submit working");

        var errFields = false;

        //handling file
        var fd = new FormData();
        var file = $('#registerMerchantFile')[0].files[0];
        fd.append('logo', file);


        //check email
        if (!validateEmail(email)) {
            errFields = true;
            M.toast({html: 'Email inválido!'})
        }

        //check if passwords are equal
        if (password !== repeatPassword) {
            errFields = true;
            M.toast({html: 'Palavras passe não coincidem!'})
        }

        //check if its empty fields
        if (name === '' || email === '' || password === '' || repeatPassword === '' ||
        address === '' || zipCode === '' || location === '' || nipc === '' || category === '' ||
        description === '' || contactNumber === '') {
            errFields = true;
            M.toast({html: 'Campos vazios!'})
        }

        //check if type files is correct
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            console.log("type file correct");
        } else {
            errFields = true;
            M.toast({html: 'Tipo de ficheiro não suportado!'})
        }

        console.log ( {
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            address: address,
            zipCode: zipCode,
            location: location,
            nipc: nipc,
            category: category,
            description: description,
            contactNumber: contactNumber,
            file: file,
            typeFile: file.type
        })

        fd.append('email', email);
        fd.append('password', password);
        fd.append('address', address);
        fd.append('zipCode', zipCode);
        fd.append('location', location);
        fd.append('name', name);
        fd.append('nipc', nipc);
        fd.append('category', category);
        fd.append('description', description);
        

        //check if not have errors
        if (!errFields) {
            console.log(true);
            
            $.ajax({
                url: 'http://localhost:3000/api/register/signupMerchant',
                type: 'POST',
                cache: false,
                data: fd,
                contentType: false,
                processData: false,
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
    });
});

