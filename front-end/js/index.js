$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').formSelect();

    $('input#registerClientNIF, input#registerClientContactNumber, #registerMerchantDescription').characterCounter();

    //toggle form merchant/client
    $("#openFormRegisterMerchant").click(function(){
        if ($("#divFormRegisterClient").css('display') !== 'none') {
            $("#divFormRegisterClient").slideToggle(700);
        }
        $("#divFormRegisterMerchant").slideToggle(700);
    });

    //toggle form merchant/client
    $("#openFormRegisterClient").click(function(){
        if ($("#divFormRegisterMerchant").css('display') !== 'none') {
            $("#divFormRegisterMerchant").slideToggle(700);
        }
        $("#divFormRegisterClient").slideToggle(700);
    });

    //open form driver
    $("#isDriver").click(function () {
       if ($("#isDriver").is(":checked")) {
           $("#formDriver").fadeIn();
       } else {
           $("#formDriver").fadeOut();
       }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //submit form login
    $("#formLoginSubmit").click(function (event) {
        event.preventDefault();
        
        var email = $("#formLoginEmail").val();
        var password = $("#formLoginPassword").val();

        console.log({
            email: email,
            password: password
        })

        var errFields = false;

        //check if email is valid
        if (!validateEmail(email)) {
            errFields = true;
            M.toast({html: 'Email Inválido!'})
        }

        //check if fields are empty
        if (email === '' || password === '') {
            errFields = true;
            M.toast({html: 'Campos Vazios!'})
        }

        if (!errFields) {
            
            $.ajax({
                url: 'http://localhost:3000/api/login/',
                type: 'POST',
                cache: false,
                data: { 
                    email: email,
                    password: password
                },
                success: function (data) {
                    console.log(data);
                    let token = data.login.typeUser;
                    console.log(token);
                    sessionStorage.setItem("tokenSession", data.login.token);
                    console.log(sessionStorage.getItem("tokenSession"));
                    
                    M.toast({html: 'Registado Com Sucesso!'});

                }, 
                error: function (jqXHR, textStatus, err) {
                    console.log(jqXHR);
                    console.log(err,textStatus);
                    M.toast({html: 'Erro Ao Registar!'});
                }
            })
            
           console.log("Sucesso");
        }
    });

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

        var errFields = false;

        //check email
        if (!validateEmail(email)) {
            errFields = true;
            M.toast({html: 'Email Inválido!'})
        }

        //check password if has one uppercase, one lowercase, one number and at least 8 characters
        if (password.match(/[a-z]/g) === null || 
            password.match( /[A-Z]/g) === null || 
            null === password.match( /[0-9]/g) || password.length < 8) { 
            errFields = true;
            M.toast({html: 'Palavras-passes Diferentes Dos Parâmetros!'})
        }

        //check if passwords are correct
        if (password !== repeatPassword) {
            errFields = true;
            M.toast({html: 'Palavras-passes Não Coincidem!'})
        }

        //check if fields are empty
        if (email === "" || password === "" || repeatPassword === '' || address === '' || zipCode === '' 
        || location === '' || nif === '' || contactNumber === '') {
            errFields = true;
            M.toast({html: 'Campos Vazios!'})
        }

        //if its Driver, check variable typeVehicle
        if (isDriver) {
            if (typeVehicle === null) {
                errFields = true;
                M.toast({html: 'Campos Vazios!'})
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
                        M.toast({html: 'Registado Com Sucesso!'});
    
                    }, 
                    error: function (jqXHR, textStatus, err) {
                        console.log(jqXHR);
                        console.log(err,textStatus);
                        M.toast({html: 'Erro Ao Registar!'});
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
                        M.toast({html: 'Registado Com Sucesso!'});
    
                    }
                    , error: function (jqXHR, textStatus, err) {
                        console.log(err,textStatus);
                        M.toast({html: 'Erro Ao Registar!'});
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

        var errFields = false;

        //handling file
        var fd = new FormData();
        var file = $('#registerMerchantFile')[0].files[0];
        fd.append('logo', file);

        //check email
        if (!validateEmail(email)) {
            errFields = true;
            M.toast({html: 'Email Inválido!'})
        }

        //check if passwords are equal
        if (password !== repeatPassword) {
            errFields = true;
            M.toast({html: 'Palavras-passes Não Coincidem!'})
        }

        //check password if has one uppercase, one lowercase, one number and at least 8 characters
        if (password.match(/[a-z]/g) === null || 
        password.match( /[A-Z]/g) === null || 
        null === password.match( /[0-9]/g) || password.length < 8) { 
            errFields = true;
            M.toast({html: 'Palavras-passes Diferentes dos Parâmetros!'})
        }

        //check if its empty fields
        if (name === '' || email === '' || password === '' || repeatPassword === '' ||
        address === '' || zipCode === '' || location === '' || nipc === '' || category === '' ||
        description === '' || contactNumber === '') {
            errFields = true;
            M.toast({html: 'Campos Vazios!'})
        }

        //check if type files is correct
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            console.log("type file correct");
        } else {
            errFields = true;
            M.toast({html: 'Ficheiro Não Suportado!'})
        }

        fd.append('email', email);
        fd.append('password', password);
        fd.append('repeatPassword', repeatPassword);
        fd.append('address', address);
        fd.append('zipCode', zipCode);
        fd.append('location', location);
        fd.append('name', name);
        fd.append('nipc', nipc);
        fd.append('category', category);
        fd.append('description', description);
        

        //check if not have errors
        if (!errFields) {
            
            $.ajax({
                url: 'http://localhost:3000/api/register/signupMerchant',
                type: 'POST',
                cache: false,
                data: fd,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    M.toast({html: 'Registado com Sucesso!'});

                }
                , error: function (jqXHR, textStatus, err) {
                    console.log(err,textStatus);
                    M.toast({html: 'Erro ao Registar!'});
                }
            })
            
        }
    });
});

