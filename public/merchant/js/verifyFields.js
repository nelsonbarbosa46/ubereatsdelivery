function verifyFieldsChangeInfo(errFields, name, address, zipCode, location, nipc, contactNumber, description, category) {

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
    //check if location is invalid
    } else if (jQuery.inArray(location, arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoLocation").data("field")});
    }
    //check if its empty
    if (!nipc) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoNIPC").data("field")});
    //check if its invalid
    } else if (!nipc.match('[2,3,5]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoNIPC").data("field")})
    }
    //check if its empty
    if (!contactNumber) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoContactNumber").data("field")});
    //check if has diferent 9 chars
    } else if (contactNumber.length !== 9) {
            errFields.push({"error": "invalid", "field": $("#formChangeInfoContactNumber").data("field")});
    //check if its invalid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoContactNumber").data("field")});
    }
    //check if its empty
    if (!description) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoDescription").data("field")});
    }
    //check if its empty
    if (!category) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoCategory").data("field")});
    //check if its invalid
    } else if (category < 1 || category > 5) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoCategory").data("field")});
    }
}

function verifyFieldsFormCreateProduct(errFields, name, price, quantity, file) {
    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formCreateProductName").data("field")});
    //check if its empty
    if (!price) {
        errFields.push({"error": "empty", "field": $("#formCreateProductPrice").data("field")});
    //check if price is invalid
    } else if (isNaN(price) || price < 0) {
        errFields.push({"error": "invalid", "field": $("#formCreateProductPrice").data("field")});
    }
    //check if its empty
    if (!quantity) {
        errFields.push({"error": "empty", "field": $("#formCreateProductQuantity").data("field")});
    } else if (quantity < 0) {
        errFields.push({"error": "invalid", "field": $("#formCreateProductQuantity").data("field")});
    }
    if (file) {
        //check if type file is incorrect
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            errFields.push({"error": "invalid", "field": $("#formCreateProductImage").data("field")});
        }
    }
}
