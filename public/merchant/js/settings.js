var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

function submitFormChangeInfo(e) {
    e.preventDefault();
    var errFields = [];

    
    var name = $("#formChangeInfoName").val();
    var address = $("#formChangeInfoAddress").val();
    var zipCode = $("#formChangeInfoZipCode").val();
    var location = $("#formChangeInfoLocation").val();
    location.toLowerCase();
    var nipc = $("#formChangeInfoNIPC").val();
    var contactNumber = $("#formChangeInfoContactNumber").val();
    var description = $("#formChangeInfoDescription").val();
    var category = $("#formChangeInfoCategory").val();

    verifyFieldsChangeInfo(errFields, name, address, zipCode, location, nipc, contactNumber, description, category);

    if (errFields.length === 0) {
        $.ajax({
            url: 'http://localhost:3000/api/user/changeInfoMe/'+idUser,
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
                nipc: nipc,
                contactNumber: contactNumber,
                description: description,
                category: category
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

function submitFormChangeLogo(e) {
    e.preventDefault();

    //handling file
    var fd = new FormData();
    var file = $('#formChangeLogoFile')[0].files[0];

    var errFields = [];

    //check if its empty
    if (!file) {
        errFields.push({"error": "empty", "field": $("#formChangeLogoFile").data("field")});
    //check if type file is incorrect
    } else if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        errFields.push({"error": "invalid", "field": $("#formChangeLogoFile").data("field")});
    }

    if (errFields.length === 0) {
        
        fd.append('logo', file);
        var url = getUrlToSubmit();
        $.ajax({
            url: url+'/api/user/changeLogoMe/'+idUser,
            type: 'PUT',
            cache: false,
            data: fd,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            success: function () {
                M.toast({html: 'Alterado com sucesso'})

            }
            , error: function (jqXHR, textStatus, err) {
                console.log(err,textStatus);
                M.toast({html: 'Erro ao Registar!'});
            }
        });

    } else {
        toastErrForm(errFields);
    }

}

//get values for the form to change info
function getValuesFormChangeInfo() {
    
    var url = getUrlToSubmit();
    $.ajax({
        url: url+'/api/user/getInfoMe/'+idUser,
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
            $("#formChangeInfoNIPC").val(data.user.nipc);
            $("#formChangeInfoContactNumber").val(data.user.contactNumber);
            $("#formChangeInfoDescription").val(data.user.description);
            $("#formChangeInfoCategory").val(data.user.category);
            M.updateTextFields();
        }, 
        error: function (jqXHR, textStatus, err) {
            console.log(jqXHR);
            M.toast({html: 'Erro a obter os dados!'});
        }
    });
}