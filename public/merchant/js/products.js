function toggleSectionProducts() {
    var display = $("#sectionProducts").css('display');
    if (display == 'none') {
        $("#sectionOrders").css('display', 'none');
        $("#sectionProducts").fadeIn(500);
    }
}

function submitFormCreateProduct(e) {
    e.preventDefault();

    var errFields = [];

    var name = $("#formCreateProductName").val();
    var price = $("#formCreateProductPrice").val();
    var quantity = $("#formCreateProductQuantity").val();
    var description = $("#formCreateProductDescription").val();

    //handling file
    var fd = new FormData();
    var file = $('#formCreateProductImage')[0].files[0];

    verifyFieldsFormCreateProduct(errFields, name, price, quantity, file);

    if (errFields.length === 0) {

        var url = getUrlToSubmit();

        fd.append('idUser', idUser);
        fd.append('name', name);
        fd.append('price', price);
        fd.append('quantity', quantity);
        fd.append('description', description);
        fd.append('logo', file);
        
        $.ajax({
            url: url+'/api/product/createProduct/',
            type: 'POST',
            cache: false,
            data: fd,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            success: function (data) {
                M.toast({html: 'Criado com sucesso'});
            }
            , error: function (jqXHR, textStatus, err) {
                console.log(err,textStatus);
                M.toast({html: 'Erro ao Registar!'});
            }
        })
        
    } else {
        toastErrForm(errFields);
    }
}

function getProductsToShow() {
    var url = getUrlToSubmit();

    $.ajax({
        url: url+'/api/product/getProducts/'+idUser,
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function (data) {
            M.toast({html: 'Sucesso!'});
        }
        , error: function (jqXHR, textStatus, err) {
            console.log(err,textStatus);
            M.toast({html: 'Erro ao obter produtos!'});
        }
    })
}