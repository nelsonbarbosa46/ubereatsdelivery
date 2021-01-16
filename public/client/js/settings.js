

//submit form change info
function submitFormChangeInfo(e) {
    e.preventDefault();
    var errFields = [];
    

    var name = $("#formChangeInfoName").val();
    var address = $("#formChangeInfoAddress").val();
    var zipCode = $("#formChangeInfoZipCode").val();
    var location = $("#formChangeInfoLocation").val();
    location = location.toLowerCase();
    var nif = $("#formChangeInfoNIF").val();
    var contactNumber = $("#formChangeInfoContactNumber").val();
    
    verifyFieldsEmpty(errFields, name, address, zipCode, location, nif, contactNumber);

    if (errFields.length === 0) {
        $.ajax({
            url: 'http://localhost:3000/api/user/changeEP/'+idUser,
            type: 'PUT',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: { 
                name: name,
                address: address,
                zipCode: zipCode,
                location: location,
                nif: nif,
                contactNumber: contactNumber
            },
            success: function () {   
                M.toast({html: 'Alterado com sucesso'});
            }, 
            error: function (jqXHR, textStatus, err) {
                console.log(jqXHR);
                M.toast({html: 'Erro Ao Alterar!'});
            }
        });
    } else {
        toastErrForm(errFields);
    }
}

function verifyFieldsEmpty(errFields, name, address, zipCode, location, nif, contactNumber) {

    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formChangeInfoName").data("field")});
    //check if its empty
    if (!address) errFields.push({"error": "empty", "field": $("#formChangeInfoAddress").data("field")});
    
    //check if its empty
    if (!zipCode) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoZipCode").data("field")});
    //check if its valid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoZipCode").data("field")});
    }
    
    //check if its empty
    if (!location) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoLocation").data("field")});
    //check if county is correct
    } else if (jQuery.inArray(location.toLowerCase(), arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoLocation").data("field")});
    }
    
    //check if its empty
    if (!nif) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoNIF").data("field")});
    //check if its diferent 9 chars
    } else if (nif.length !== 9) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoNIF").data("field")});
    //check if its valid
    } else if (!nif.match('[2,3,5]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoNIF").data("field")})
    }
    
    //check if its empty
    if (!contactNumber) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoContactNumber").data("field")});
    //check if has diferent 9 chars
    } else if (contactNumber.length !== 9) {
            errFields.push({"error": "invalid", "field": $("#formChangeInfoContactNumber").data("field")});
    //check if its valid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoContactNumber").data("field")});
    }
}