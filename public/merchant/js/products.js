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

function deleteProduct(id) {
    var url = getUrlToSubmit();
    
    $.ajax({
        url: url+'/api/product/deleteProduct/'+id,
        type: 'DELETE',
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            console.log("Produto eliminado com sucesso");
        }
    })
}

function getProductsToShow() {
    var url = getUrlToSubmit();

    $.ajax({
        url: url+'/api/product/getProductsMe/'+idUser,
        type: 'GET',
        cache: false,
        processData: false,
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function (data) {
            console.log(data);
            if (data.listProducts.length != 0) {
                var listProducts = data.listProducts;
                //update how many products has
                productsShowCount = listProducts.length;
                
                for (let i = 0; i < listProducts.length; i++) {
                    $("#rowShowProducts").append(showCardAndModals(listProducts[i]));
                    $(".modal").modal();
                    M.updateTextFields();
                }
            }
        }
        , error: function (jqXHR, textStatus, err) {
            console.log(err,textStatus);
            M.toast({html: 'Erro ao obter produtos!'});
        }
    })
}

function showCardAndModals(listProducts) {
    var html = '';

    html += '<!--Card-->\
    <div class="col s12 l4">\
        <div class="card sticky-action small">\
            <div class="card-image waves-effect waves-block waves-light">\ ';
    if (listProducts.image) {
        html += '<img class="activator" id="imgProduct'+listProducts.id+'" src="../../'+listProducts.image+'">';
    } else {
        //dont has image
        html += '<img class="activator" id="imgProduct'+listProducts.id+'" src="../img/produtosemimagem.svg">';
    }
    html += '</div>\
            <div class="card-content">\
                <span class="card-title activator grey-text text-darken-4" id="span1NameProduct'+listProducts.id+'">'+listProducts.name+'<i class="material-icons right">more_vert</i></span>\
            </div>\
            <div class="card-action">\
                <a href="#modalProductChangeQuantity'+listProducts.id+'" class="tooltipped modal-trigger" data-position="bottom" data-tooltip="Alterar Quantidade">\
                    <i class="material-icons round">\
                        add\
                    </i>\
                </a>\
                <a href="#modalProductChangeInfo'+listProducts.id+'" class="tooltipped modal-trigger" data-position="bottom" data-tooltip="Alterar Informações">\
                    <i class="material-icons round">\
                        edit\
                    </i>\
                </a>\
                <a href="#modalProductChangeImage'+listProducts.id+'" class="tooltipped modal-trigger" data-position="bottom" data-tooltip="Alterar Imagem">\
                    <i class="material-icons round">\
                        wallpaper\
                    </i>\
                </a>\
                <a href="#modalProductDelete'+listProducts.id+'" class="right tooltipped modal-trigger" data-position="bottom" data-tooltip="Eliminar Produto">\
                    <i class="material-icons round iconDeleteProduct red-text waves-red waves-effect">\
                        delete\
                    </i>\
                </a>\
            </div>\
            <div class="card-reveal">\
                <span class="card-title grey-text text-darken-4" id="span2NameProduct'+listProducts.id+'">'+listProducts.name+'<i class="material-icons right">close</i></span>\
                <p><b>Preço: </b><span id="spanPrice'+listProducts.id+'">'+listProducts.price+'€</span><br><b>Quantidade: </b>\
                <span id="spanQuantity'+listProducts.id+'">'+listProducts.quantity+'</span><br>\ ';
    if (listProducts.description) {
        html += '<b>Descrição: </b><span id="spanDescription'+listProducts.id+'">'+listProducts.description+'</span>';
    } else {
        html += '<b>Descrição: </b><span id="spanDescription'+listProducts.id+'">Não existe</span>';
    }
    html += '   </p>\
            </div>\
        </div>\
    </div>\
    <!--/Card-->\
    ';

    //modal change quantity
    html += '\
        <div id="modalProductChangeQuantity'+listProducts.id+'" class="modal">\
            <div class="modal-content">\
                <h4>Alterar Quantidade</h4>\
                <form action="#" class="formProductChangeQuantity" id="'+listProducts.id+'">\
                    <div class="col s12">\
                        <div class="input-field col s12">\
                            <input id="formChangeProductQuantity'+listProducts.id+'" data-field="Quantidade" name="quantity" value="'+listProducts.quantity+'" type="number">\
                            <label for="formChangeProductQuantity'+listProducts.id+'"">Quantidade</label>\
                            <span class="helper-text">Campo obrigatório</span>\
                        </div>\
                    </div>\
                    <div class="col s12 mb-2">\
                        <button type="submit" class="btn waves-effect waves-orange orange lighten-2">Alterar Quantidade</button>\
                        <a href="#!" class="modal-close waves-effect btn">Cancelar</a>';
    
    html += '       </div>';
    html += '   </form>\
            </div>\
        </div>';

    //modal change info
    html += ' \
        <div id="modalProductChangeInfo'+listProducts.id+'" class="modal">\
        <div class="modal-content">\
            <h4>Alterar Informações</h4>\
            <form action="#" class="formProductChangeInfo" id="'+listProducts.id+'">\
                <div class="col s12">\
                    <div class="row">\
                        <div class="input-field col s12 l6">\
                            <input id="formChangeProductName'+listProducts.id+'" data-field="Nome" name="name" value="'+listProducts.name+'" type="text">\
                            <label for="formChangeProductName"'+listProducts.id+'">Nome</label>\
                            <span class="helper-text">Campo obrigatório</span>\
                        </div>\
                        <div class="input-field col s12 l6">\
                            <input id="formChangeProductPrice'+listProducts.id+'" data-field="Preço" name="price" value="'+listProducts.price+'" type="number">\
                            <label for="formChangeProductPrice'+listProducts.id+'">Preço</label>\
                            <span class="helper-text">Campo obrigatório. Apenas coloque o valor e use ponto. Ex. "4.4"</span>\
                        </div>\
                        <div class="input-field col s12">\
                            <textarea id="formChangeProductDescription'+listProducts.id+'" name="description" data-field="Description" class="materialize-textarea" data-length="120">';
    if (listProducts.description) {
        html += listProducts.description;
    }
    html +=                 '</textarea>\
                            <label for="formChangeProductDescription'+listProducts.id+'">Descrição</label>\
                        </div>\
                    </div>\
                </div>\
                <div class="col s12 mb-2">\
                    <button type="submit" class="btn waves-effect waves-orange orange lighten-2">Alterar Informações</button>\
                    <a href="#!" class="modal-close waves-effect btn">Cancelar</a>\
                </div>\
            </form>\
        </div>\
    </div>\
    ';

    //modal change image
    html += ' \
    <div id="modalProductChangeImage'+listProducts.id+'" class="modal">\
        <div class="modal-content">\
            <h4>Alterar Imagem</h4>\
            <form action="#" class="formProductChangeImage" id="'+listProducts.id+'">\
                <div class="row">\
                    <div class="file-field input-field col s12 l6">\
                        <div class="btn grey darken-3">\
                            <span>Imagem</span>\
                            <input type="file" id="formChangeProductImage'+listProducts.id+'" data-field="Logótipo" name="file" accept="image/png, image/jpg, image/jpeg">\
                        </div>\
                        <div class="file-path-wrapper">\
                            <input class="file-path" name="textFile" type="text">\
                        </div>\
                        <small>Só é aceite ficheiros tipo PNG, JPEG e JPG</small>\
                    </div>\
                    <div class="col s12 l6">\
                        <div id="divImgChangeProduct'+listProducts.id+'">';
                    
    if (listProducts.image) {
        html += '<p>Imagem Atual: </p><img width="100%" src="../../'+listProducts.image+'">';
    } else {
        html += '<p>Não tem imagem no momento</p>';
    }
    html += '           </div>\
                    </div>\
                </div>\
                <div class="col s12 mb-2">\
                    <button type="submit" class="btn waves-effect waves-orange orange lighten-2">Alterar Imagem</button>\
                    <a href="#!" class="modal-close waves-effect btn">Cancelar</a>\
                </div>\
            </form>\
        </div>\
    </div>\
    ';

    //modal delete
    html += ' \
    <div id="modalProductDelete'+listProducts.id+'" class="modal">\
        <div class="modal-content">\
            <h4>Eliminar Produto</h4>\
            <form action="#" class="formProductDelete" id="'+listProducts.id+'">\
                <div class="row">\
                    <div class="col s12">\
                        <p>Pretende mesmo eliminar o produto?</p>\
                        <button id="formDeleteProduct" type="submit" class="btn waves-effect waves-red red">Eliminar Produto</button>\
                        <a href="#!" class="modal-close waves-effect btn">Cancelar</a>\
                    </div>\
                </div>\
            </form>\
        </div>\
    </div>';


    return html;
}

function submitFormChangeInfoProduct(e, idProduct, form) {
    e.preventDefault();

    var errFields = [];

    var nameInput = jQuery("[name='name']", form);
    var priceInput = jQuery("[name='price']", form);
    var descriptionInput = jQuery("[name='description']", form);
    var name = nameInput.val();
    var price = priceInput.val();
    var description = descriptionInput.val();

    verifyFieldsFormChangeInfoProduct(errFields, nameInput, name, priceInput, price);

    if (errFields.length === 0) {

        var url = getUrlToSubmit();

        $.ajax({
            url: url+'/api/product/changeInfoProduct/'+idUser+'/'+idProduct,
            type: 'PUT',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: { 
                name: name,
                price: price,
                description: description
            },
            success: function (data) {   
                M.toast({html: 'Alterado com sucesso'});
                //change info
                if (data.updateInfo.description) {    
                    $("#spanDescription"+idProduct).text(data.updateInfo.description);
                } else {
                    $("#spanDescription"+idProduct).text("Não existe");
                }
                $("#spanPrice"+idProduct).text(data.updateInfo.price+"€");
                $("#span1NameProduct"+idProduct).text(data.updateInfo.name);
                $("#span2NameProduct"+idProduct).text(data.updateInfo.name);
            }, 
            error: function (jqXHR, textStatus, err) {
                console.log(jqXHR);
                M.toast({html: 'Erro Ao Alterar!'});
            }
        })
    } else {
        toastErrForm(errFields);
    }
}

function submitFormChangeImageProduct(e, idProduct, form) {
    e.preventDefault();

    var errFields = [];

    var inputFile = jQuery("[name='file']", form);
    var inputTextFile = jQuery("[name='textFile']", form);
    var file = inputFile[0].files[0];

    //handling file
    var fd = new FormData();

    if (errFields.length === 0) {
        fd.append('logo', file);

        var url = getUrlToSubmit();

        $.ajax({
            url: url+'/api/product/changeLogoProduct/'+idUser+'/'+idProduct,
            type: 'PUT',
            cache: false,
            data: fd,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            success: function (data) {
                M.toast({html: 'Alterado com sucesso!'});
                if (data.newImage) {
                    inputFile.replaceWith( inputFile.val('').clone( true ) );
                    $(inputTextFile).val("");
                    $("#imgProduct"+idProduct).attr('src', '../../'+data.newImage);
                    $("#divImgChangeProduct"+idProduct).empty();
                    var appendNewImg = '<p>Imagem Atual: </p><img width="100%" src="../../'+data.newImage+'">';
                    $("#divImgChangeProduct"+idProduct).append(appendNewImg);
                } else {
                    $("#imgProduct"+idProduct).attr('src', '../img/produtosemimagem.svg');
                    $("#divImgChangeProduct"+idProduct).empty();
                    $("#divImgChangeProduct"+idProduct).append('<p>Não tem imagem no momento</p>');
                }
            }
            , error: function (jqXHR, textStatus, err) {
                console.log(err,textStatus);
                M.toast({html: 'Erro ao Alterar!'});
            }
        })

    } else {
        
    }
}