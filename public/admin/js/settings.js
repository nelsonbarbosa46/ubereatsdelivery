var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//submit form change info
function submitFormChangeInfo(e) {
    e.preventDefault();
    var errFields = [];
    console.log("Entrou");
    var name = $("#formChangeInfoName").val();
    var address = $("#formChangeInfoAddress").val();
    var zipCode = $("#formChangeInfoZipCode").val();
    var location = $("#formChangeInfoLocation").val();
    location = location.toLowerCase();
    
    verifyFieldsChangeInfo(errFields, name, address, zipCode, location);

    if (errFields.length === 0) {
        var url = getUrlToSubmit();
        $.ajax({
            url: url+'/api/user/changeInfoAd/'+idUser,
            type: 'PUT',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: { 
                name: name,
                address: address,
                zipCode: zipCode,
                location: location
            },
            success: function () {
                setCookie("name", name, 1);
                $("#pageNameUser").text(name);   
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

function verifyFieldsChangeInfo(errFields, name, address, zipCode, location) {

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
    } else if (jQuery.inArray(location, arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formChangeInfoLocation").data("field")});
    }
}

function submitFormRegisterAdmin(e) {
    e.preventDefault();

    var errFields = [];
    var name = $("#formRegisterAdminName").val();
    var email = $("#formRegisterAdminEmail").val();
    var password = $("#formRegisterAdminPassword").val();
    var repeatPassword = $("#formRegisterAdminRepeatPassword").val();
    var address = $("#formRegisterAdminAddress").val();
    var zipCode = $("#formRegisterAdminZipCode").val();
    var location = $("#formRegisterAdminLocation").val();
    
    verifyFieldsRegisterClient(errFields, name, email, password, repeatPassword,
        address, zipCode, location);
        
    if (errFields.length === 0) {
        
        var url = getUrlToSubmit();
        $.ajax({
            url: url+'/api/register/signupAdmin/',
            type: 'POST',
            cache: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            data: { 
                name: name,
                email: email,
                password: password,
                repeatPassword: repeatPassword,
                address: address,
                zipCode: zipCode,
                location: location
            },
            success: function () {   
                let htmlSuccess = '<span>Administrador criado com sucesso: </br>';
                htmlSuccess += '<small class="sm-toast">E-mail: '+email+' </br>Palavra passe: '+password+'</small></span>';
                M.toast({html:htmlSuccess,
                    displayLength: 5000})
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

function verifyFieldsRegisterClient(errFields, name, email, password, repeatPassword,
    address, zipCode, location) {
    
    //check if its empty
    if (!name) errFields.push({"error": "empty", "field": $("#formRegisterAdminName").data("field")});
    //check if its empty
    if (!address) errFields.push({"error": "empty", "field": $("#formRegisterAdminAddress").data("field")});
    //check if its empty
    if (!email) {
        errFields.push({"error": "empty", "field": $("#formRegisterAdminEmail").data("field")});
    } else if (!validateEmail(email)) {
        errFields.push({"error": "invalid", "field": $("#formRegisterAdminEmail").data("field")});
    }
    //check if its empty
    if (!password) {
        errFields.push({"error": "empty", "field": $("#formRegisterAdminPassword").data("field")});
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15
    ) {
        errFields.push({"error": "invalid", "field": $("#formRegisterAdminPassword").data("field")});
    }
    //check if its empty
    if (!repeatPassword) {
        errFields.push({"error": "empty", "field": $("#formRegisterAdminRepeatPassword").data("field")});
    //check if its not equal
    } else if (password != repeatPassword) {
        errFields.push({"error": "invalid", "field": $("#formRegisterAdminRepeatPassword").data("field")});
    }
    //check if its empty
    if (!zipCode) {
        errFields.push({"error": "empty", "field": $("#formRegisterAdminZipCode").data("field")});
    //check if its valid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        errFields.push({"error": "invalid", "field": $("#formRegisterAdminZipCode").data("field")});
    }
    
    //check if its empty
    if (!location) {
        errFields.push({"error": "empty", "field": $("#formRegisterAdminLocation").data("field")});
    //check if county is correct
    } else if (jQuery.inArray(location.toLowerCase(), arrCountiesLowerCase) == -1) {
        errFields.push({"error": "invalid", "field": $("#formRegisterAdminLocation").data("field")});
    }
}

//get values for the form to change info
function getValuesFormChangeInfo() {
    
    var url = getUrlToSubmit();
    $.ajax({
        url: url+'/api/user/getInfoAd/'+idUser,
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
            M.updateTextFields();
        }, 
        error: function (jqXHR, textStatus, err) {
            console.log(jqXHR);
            M.toast({html: 'Erro a obter os dados!'});
        }
    });
}