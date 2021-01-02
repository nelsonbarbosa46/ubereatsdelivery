function verifyFieldsRegisterClient(errFields, name, email, password, repeatPassword, 
    address, zipCode, location, nif, contactNumber, typeVehicle, isDriver) {
    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formRegisterClientName").data("field")});
    if (!email) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientEmail").data("field")});
    //check if email is invalid
    } else if (!validateEmail(email)) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientEmail").data("field")});
    }
    //check if its empty
    if (!password) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientPassword").data("field")});
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15
    ) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientPassword").data("field")});
    }
    //check if its empty
    if (!repeatPassword) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientRepeatPassword").data("field")});
    //check if its not equal
    } else if (password != repeatPassword) {
        errFields.push({"error": "notcorrespond", "field": $("#formRegisterClientRepeatPassword").data("field")});
    }
    //check if its empty
    if (!address) errFields.push({"error": "empty", "field": $("#formRegisterClientAddress").data("field")});
    //check if its empty
    if (!zipCode) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientZipCode").data("field")});
    //check if its valid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientZipCode").data("field")});
    }
    //check if its empty
    if (!location) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientLocation").data("field")});
    //check if county is correct
    } else if (jQuery.inArray(location.toLowerCase(), arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientLocation").data("field")});
    }
    //check if its empty
    if (!nif) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientNIF").data("field")});
    //check if its diferent 9 chars
    } else if (nif.length !== 9) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientNIF").data("field")});
    //check if its valid
    } else if (!nif.match('[1,2,5]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientNIF").data("field")})
    }
    //check if its empty
    if (!contactNumber) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientContactNumber").data("field")});
    //check if has diferent 9 chars
    } else if (contactNumber.length !== 9) {
            errFields.push({"error": "invalid", "field": $("#formRegisterClientContactNumber").data("field")});
    //check if its valid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientContactNumber").data("field")});
    }
    //check if its driver
    if (isDriver) {
        //check if its empty
        if (!typeVehicle) {
            errFields.push({"error": "empty", "field":  $("#formRegisterClientTypeVehicle").data("field")});
        } else if (typeVehicle < 1 || typeVehicle > 3) {
            errFields.push({"error": "invalid", "field":  $("#formRegisterClientTypeVehicle").data("field")});
        }
    }
}

function verifyFieldsRegisterMerchant(errFields, name, email, password, repeatPassword, 
    address, zipCode, location, nif, contactNumber, typeVehicle, isDriver) {
    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formRegisterClientName").data("field")});
    if (!email) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientEmail").data("field")});
    //check if email is invalid
    } else if (!validateEmail(email)) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientEmail").data("field")});
    }
    //check if its empty
    if (!password) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientPassword").data("field")});
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15
    ) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientPassword").data("field")});
    }
    //check if its empty
    if (!repeatPassword) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientRepeatPassword").data("field")});
    //check if its not equal
    } else if (password != repeatPassword) {
        errFields.push({"error": "notcorrespond", "field": $("#formRegisterClientRepeatPassword").data("field")});
    }
    //check if its empty
    if (!address) errFields.push({"error": "empty", "field": $("#formRegisterClientAddress").data("field")});
    //check if its empty
    if (!zipCode) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientZipCode").data("field")});
    //check if its valid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientZipCode").data("field")});
    }
    //check if its empty
    if (!location) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientLocation").data("field")});
    //check if county is correct
    } else if (jQuery.inArray(location.toLowerCase(), arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientLocation").data("field")});
    }
    //check if its empty
    if (!nif) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientNIF").data("field")});
    //check if its diferent 9 chars
    } else if (nif.length !== 9) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientNIF").data("field")});
    //check if its valid
    } else if (!nif.match('[1,2,5]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientNIF").data("field")})
    }
    //check if its empty
    if (!contactNumber) {
        errFields.push({"error": "empty", "field": $("#formRegisterClientContactNumber").data("field")});
    //check if has diferent 9 chars
    } else if (contactNumber.length !== 9) {
            errFields.push({"error": "invalid", "field": $("#formRegisterClientContactNumber").data("field")});
    //check if its valid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterClientContactNumber").data("field")});
    }
    //check if its driver
    if (isDriver) {
        //check if its empty
        if (!typeVehicle) {
            errFields.push({"error": "empty", "field":  $("#formRegisterClientTypeVehicle").data("field")});
        } else if (typeVehicle < 1 || typeVehicle > 3) {
            errFields.push({"error": "invalid", "field":  $("#formRegisterClientTypeVehicle").data("field")});
        }
    }
}