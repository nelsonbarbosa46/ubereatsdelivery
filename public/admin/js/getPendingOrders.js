function getDriversUnchecked() {
    var url = getUrlToSubmit();
    $.ajax({
        url: url+'/api/user/getDriversUncheck/',
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function (data) {
            if (data.listUsers.length != 0) {
                let html = '\
                    <div class="row">\
                ';
                //show drivers unchecked
                for (let i = 0; i < data.listUsers.length; i++) {
                    html += '\
                    <div id="divDriver'+data.listUsers[i].idDriver+'" class="divDriversMerchantPending">\
                        <div class="col s2 mt-2">'+data.listUsers[i].name+'</div>\
                        <div class="col s10">\
                            <div class="col s1">\
                                <!-- Modal Trigger -->\
                                <button id="'+data.listUsers[i].idDriver+'" class="btn mt-1 btn-small blue btnInfoDriver"><i class="material-icons round">info</i></button>\
                            </div>\
                            <form action="#" class="checkedDriver" id="'+data.listUsers[i].idDriver+'"> \
                                <div class="row m-0">\
                                    <div class="col s5">\
                                        <div class="input-field col s12 m-0">\
                                            <input id="reasonCanWork'+data.listUsers[i].idDriver+'" name="reason" data-field="Razão" type="text" class="validate">\
                                            <label for="reasonCanWork'+data.listUsers[i].idDriver+'">Razão</label>\
                                        </div>\
                                    </div>\
                                    <div class="col s3 mt-1">\
                                        <div class="switch">\
                                            <label>\
                                                Rejeitar\
                                                <input type="checkbox">\
                                                <span class="lever"></span>\
                                                Aceitar\
                                            </label>\
                                        </div>\
                                    </div>\
                                    <div class="col s1 divButtonPending">\
                                        <button type="submit" id="'+data.listUsers[i].idDriver+'" class="btn success waves-effect canWorkContinue"><i class="material-icons round">\
                                            check\
                                        </i></button>\
                                    </div>\
                                </div>\
                            </form>\
                        </div>\
                    </div>\
                    <div class="divClassInfoDriver col s12" id="divInfoDriver'+data.listUsers[i].idDriver+'">\
                        <div class="divider"></div>\
                        <div>\
                            <h6>Informações '+data.listUsers[i].name+'</h6>\
                            <div class="row">\
                                <div class="col s4"><p>Email:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].email+'</p></div>\
                                <div class="col s4"><p>Morada:</p></div> \
                                <div class="col s8"><p>'+data.listUsers[i].address+'</p></div>\
                                <div class="col s4"><p>Código Postal:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].zipCode+'</p></div>\
                                <div class="col s4"><p>Localidade:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].location+'</p></div>\
                                <div class="col s4"><p>NIF:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].nif+'</p></div>\
                                <div class="col s4"><p>Número de contacto:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].contactNumber+'</p></div>\
                                <div class="col s4"><p>Email:</p></div>\
                                <div class="col s8"><p>'+data.listUsers[i].email+'</p></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col s12 divider"></div>\
                    ';
                    let modal = "#modalInfoDriver"+data.listUsers[i].idDriver;
                    $(modal).modal();
                }
                html += '</div>';
                $("#tablePendingDrivers").html(html);
            } else {
                $("#tablePendingDrivers").html("<b>Não existe condutores com pedidos pendentes</b>");
            }
        }, 
        error: function (jqXHR, textStatus, err) {
            console.log(jqXHR);
            M.toast({html: 'Erro a obter os dados!'});
        }
    });
}

function submitDriverCheck(e, id, form) {
    e.preventDefault();
    console.log(id);
    
    var errFields = [];

    var reasonInput = jQuery("[name='reason']", form);
    var reason = reasonInput.val();
    var typeSubmit = jQuery("[type='checkbox']", form);
    var checkType = $(typeSubmit).prop('checked');
    var canWork;
    if (checkType) {
        canWork = 1;
    } else {
        canWork = 0;
    }
    /*
    */
   verifyFieldsFormDriverMerchantCheck(errFields, reason, reasonInput);
    
    if (errFields.length === 0) {
        url = getUrlToSubmit();
        $.ajax({
            url: url+'/api/user/checkDriver/'+id,
            type: 'PUT',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: { 
                canWork: canWork,
                reasonCanWork: reason
            },
            success: function (data) {   
                var divId = "#divDriver"+id;
                $(divId).slideUp(500, function () {    
                    $(divId).remove();
                });
                M.toast({html: 'Verificado com sucesso'});
            }, 
            error: function (jqXHR, textStatus, err) {
                console.log(jqXHR);
                M.toast({html: 'Erro Ao Verificar!'});
            }
        });

    } else {
        toastErrForm(errFields);
    }
}

function verifyFieldsFormDriverMerchantCheck(errFields, reason, reasonInput) {
    //check if its empty
    if (!reason) errFields.push({"error": "empty", "field": $(reasonInput).data("field")});
}