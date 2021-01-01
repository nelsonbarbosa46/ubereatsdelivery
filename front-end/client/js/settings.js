var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

//get values for the form to change info
function getValuesFormChangeInfo() {
    
    $.ajax({
        url: 'http://localhost:3000/api/user/infoUser/'+idUser,
        type: 'GET',
        cache: false,
        headers: {
            "Authorization": 'Bearer ' + token
        },
        success: function (data) {
            $("#formChangeInfoName").val(data.user.name);
            $("#formChangeInfoAddress").val(data.user.address);
            $("#formChangeInfoZipCode").val(data.user.zipCode);
            $("#formChangeInfoLocation").val(data.user.location);
            $("#formChangeInfoNIF").val(data.user.nif);
            $("#formChangeInfoContactNumber").val(data.user.contactNumber);
            M.updateTextFields();
        }, 
        error: function (jqXHR, textStatus, err) {
            console.log(jqXHR);
            M.toast({html: 'Erro a obter os dados!'});
        }
    });
    
}

//verify if on change input on form change email/password is empty or not, if its empty disabled button
//to submit, if not, button is enabled
function verifyInputsFormEP() {
    var email = $("#formChangeEPEmail").val();
    var password = $("#formChangeEPPassword").val();
    var repeatPassword = $("#formChangeEPRepeatPassword").val();
    if (email === '' && password === '' && repeatPassword === '') {
        $('#formSubmitChangeEP').prop('disabled', true);
    } else {
        $('#formSubmitChangeEP').prop('disabled', false);
    }
}

//check if password has at least 8 characters and no more than 15 characters,
//one uppercase, one lowercase and one number
function checkIfPasswordValid() {
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
}

//check if repeatPasssword is equal to password on form change email/password
function checkPassEqualRepeat() {
    var repeat = $(this).val();
    var password = $("#formChangeEPPassword").val();
    
    if (repeat === password) {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
    } else {
        $(this).addClass("invalid");
        $(this).removeClass('valid');
    }
}

//submit form Change Email/Password
function submitFormChangeEP(e) {
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
}

//on writing on input check if its empty or not on field Address(County) on form change info
function checkCounty() {
    var text = $(this).val();
    if (text) {
        var textLowerCase = text.toLowerCase();
        //check if field are corresponding to the county 
        if (jQuery.inArray(textLowerCase, arrCountiesLowerCase) != -1) {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        } else {
            $(this).removeClass("valid");
            $(this).addClass("invalid");
        }
    } else {
        $(this).removeClass("valid");
        $(this).addClass("invalid");
    }
}

//change color on label and check if its valid - autocomplete out focus - form change info
function colorLabelLocation() {
    var text = $(this).val();
    $('#labelFormChangeInfoLocation').css("color", "#212121");
    //check if field are corresponding to the county 
    
    var textLowerCase = text.toLowerCase();
    if (jQuery.inArray(textLowerCase, arrCountiesLowerCase) != -1) {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
    } else {
        $(this).removeClass("valid");
        $(this).addClass("invalid");
    }  
    var interval;
    var counterLimit = 0;
    //check if field are correct until its valid (loop has a limit(7,5s))
    //need this because if user select county from the list, field continues invalid
    interval = setInterval(checkFieldCorrect, 250)
    function checkFieldCorrect() {
        var newText = $("#formChangeInfoLocation").val();
        var newTextLowerCase = newText.toLowerCase();
        //compare, if its correct change class and stop the loop, if not continue to loop
        if (jQuery.inArray(newTextLowerCase, arrCountiesLowerCase) != -1) {
            $('#formChangeInfoLocation').removeClass("invalid");
            $('#formChangeInfoLocation').addClass("valid");
            clearInterval(interval);
        } else {
            //count limit
            counterLimit = counterLimit + 250;
            //if count limit is higher than 7500 (7,5s), stop the loop to save usage
            if (counterLimit > 7500) {
                clearInterval(interval);
            }
        }
    }
}

//submit form change info
function submitFormChangeInfo(e) {
    e.preventDefault();
    var errFields = [];
    var name = $("#formChangeInfoName").val();
    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formChangeInfoName").data("field")});
    var address = $("#formChangeInfoAddress").val();
    //check if its empty
    if (!address) errFields.push({"error": "empty", "field": $("#formChangeInfoAddress").data("field")});
    
    var zipCode = $("#formChangeInfoZipCode").val();
    //check if its empty
    if (!zipCode) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoZipCode").data("field")});
    //check if its valid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoZipCode").data("field")});
    }
    
    var location = $("#formChangeInfoLocation").val();
    location = location.toLowerCase();
    //check if its empty
    if (!location) {
        errFields.push({"error": "empty", "field": $("#formChangeInfoLocation").data("field")});
    //check if county is correct
    } else if (jQuery.inArray(location, arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoLocation").data("field")});
    }
    
    var nif = $("#formChangeInfoNIF").val();
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
    
    var contactNumber = $("#formChangeInfoContactNumber").val();
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
                contactNumber: contactNumber,
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
        toastErrFormChangeInfo(errFields);
    }
}

function toastErrFormChangeInfo(errFields) {
    var htmlErrors = '';
    var typeErrors = [];
    var showHtmlErrors = [];
    var countErrorEmpty = 0;
    var countErrorInvalid = 0;
    for (let i = 0; i < errFields.length; i++) {
        //couting unique errors to save on array typeErrors
        if (jQuery.inArray(errFields[i].error, typeErrors) == -1) {
            typeErrors.push(errFields[i].error);
            //save custom html messages on errors
            if (errFields[i].error == 'empty') {
                showHtmlErrors.push('O seguinte campo está vazio: </br>');
            } else if (errFields[i].error == 'invalid') {
                showHtmlErrors.push('O seguinte campo está inválido: </br>');
            }
        }
        //counting how many times repeting the error
        if (errFields[i].error == 'empty') {
            countErrorEmpty = countErrorEmpty + 1;
        } else if (errFields[i].error == 'invalid') {
            countErrorInvalid = countErrorInvalid + 1;
        }
    }
    //change custom html error if has counter has greater than 1
    if (countErrorEmpty > 1) {
        var i = showHtmlErrors.indexOf("O seguinte campo está vazio: </br>");
        if (i !== -1) {
            showHtmlErrors[i] = "Os seguintes campos estão vazios: </br>";
        }
    } 
    //change custom html error if has counter has greater than 1
    if (countErrorInvalid > 1) {
        var i = showHtmlErrors.indexOf("O seguinte campo está inválido: </br>");
        if (i !== -1) {
            showHtmlErrors[i] = "Os seguintes campos estão inválidos: </br>";
        }
    }
    htmlErrors += '<span>';
    //save in the variable, the fields that have errors
    for (let i = 0; i < showHtmlErrors.length; i++) {
        htmlErrors += showHtmlErrors[i];
        for (let j = 0; j < errFields.length; j++) {
            if (typeErrors[i] == errFields[j].error) {
                if ((errFields[j].length-1) == j) {
                    htmlErrors += '<small class="sm-toast"> • '+errFields[j].field+'</small></br>';
                } else {
                    htmlErrors += '<small class="sm-toast"> • '+errFields[j].field+'</small></br>';
                }
            }
        }
    }
    htmlErrors += '</span>';
    M.toast({html: htmlErrors});
}