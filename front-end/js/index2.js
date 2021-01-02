$(document).ready(function(){
    var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').formSelect();
    $('input#formRegisterClientNIF, input#formRegisterClientContactNumber, #formRregisterMerchantDescription').characterCounter();
    //autocomplete Field Address(County) on form to change info
    $('input.autocomplete').autocomplete({
        //data is compressed (counties)
        data: {"Águeda":null,"Albergaria-a-Velha":null,"Anadia":null,"Arouca":null,"Aveiro":null,"Castelo de Paiva":null,"Espinho":null,"Estarreja":null,"Santa Maria da Feira":null,"Ílhavo":null,"Mealhada":null,"Murtosa":null,"Oliveira de Azeméis":null,"Oliveira do Bairro":null,"Ovar":null,"São João da Madeira":null,"Sever do Vouga":null,"Vagos":null,"Vale de Cambra":null,"Aljustrel":null,"Almodôvar":null,"Alvito":null,"Barrancos":null,"Beja":null,"Castro Verde":null,"Cuba":null,"Ferreira do Alentejo":null,"Mértola":null,"Moura":null,"Odemira":null,"Ourique":null,"Serpa":null,"Vidigueira":null,"Amares":null,"Barcelos":null,"Braga":null,"Cabeceiras de Basto":null,"Celorico de Basto":null,"Esposende":null,"Fafe":null,"Guimarães":null,"Póvoa de Lanhoso":null,"Terras de Bouro":null,"Vieira do Minho":null,"Vila Nova de Famalicão":null,"Vila Verde":null,"Vizela":null,"Alfândega da Fé":null,"Bragança":null,"Carrazeda de Ansiães":null,"Freixo de Espada à Cinta":null,"Macedo de Cavaleiros":null,"Miranda do Douro":null,"Mirandela":null,"Mogadouro":null,"Torre de Moncorvo":null,"Vila Flor":null,"Vimioso":null,"Vinhais":null,"Belmonte":null,"Castelo Branco":null,"Covilhã":null,"Fundão":null,"Idanha-a-Nova":null,"Oleiros":null,"Penamacor":null,"Proença-a-Nova":null,"Sertã":null,"Vila de Rei":null,"Vila Velha de Ródão":null,"Arganil":null,"Cantanhede":null,"Coimbra":null,"Condeixa-a-Nova":null,"Figueira da Foz":null,"Góis":null,"Lousã":null,"Mira":null,"Miranda do Corvo":null,"Montemor-o-Velho":null,"Oliveira do Hospital":null,"Pampilhosa da Serra":null,"Penacova":null,"Penela":null,"Soure":null,"Tábua":null,"Vila Nova de Poiares":null,"Alandroal":null,"Arraiolos":null,"Borba":null,"Estremoz":null,"Évora":null,"Montemor-o-Novo":null,"Mora":null,"Mourão":null,"Portel":null,"Redondo":null,"Reguengos de Monsaraz":null,"Vendas Novas":null,"Viana do Alentejo":null,"Vila Viçosa":null,"Albufeira":null,"Alcoutim":null,"Aljezur":null,"Castro Marim":null,"Faro":null,"Lagoa (Algarve)":null,"Lagos":null,"Loulé":null,"Monchique":null,"Olhão":null,"Portimão":null,"São Brás de Alportel":null,"Silves":null,"Tavira":null,"Vila do Bispo":null,"Vila Real de Santo António":null,"Aguiar da Beira":null,"Almeida":null,"Celorico da Beira":null,"Figueira de Castelo Rodrigo":null,"Fornos de Algodres":null,"Gouveia":null,"Guarda":null,"Manteigas":null,"Mêda":null,"Pinhel":null,"Sabugal":null,"Seia":null,"Trancoso":null,"Vila Nova de Foz Côa":null,"Alcobaça":null,"Alvaiázere":null,"Ansião":null,"Batalha":null,"Bombarral":null,"Caldas da Rainha":null,"Castanheira de Pêra":null,"Figueiró dos Vinhos":null,"Leiria":null,"Marinha Grande":null,"Nazaré":null,"Óbidos":null,"Pedrógão Grande":null,"Peniche":null,"Pombal":null,"Porto de Mós":null,"Alenquer":null,"Arruda dos Vinhos":null,"Azambuja":null,"Cadaval":null,"Cascais":null,"Lisboa":null,"Loures":null,"Lourinhã":null,"Mafra":null,"Oeiras":null,"Sintra":null,"Sobral de Monte Agraço":null,"Torres Vedras":null,"Vila Franca de Xira":null,"Amadora":null,"Odivelas":null,"Alter do Chão":null,"Arronches":null,"Avis":null,"Campo Maior":null,"Castelo de Vide":null,"Crato":null,"Elvas":null,"Fronteira":null,"Gavião":null,"Marvão":null,"Monforte":null,"Nisa":null,"Ponte de Sor":null,"Portalegre":null,"Sousel":null,"Amarante":null,"Baião":null,"Felgueiras":null,"Gondomar":null,"Lousada":null,"Maia":null,"Marco de Canaveses":null,"Matosinhos":null,"Paços de Ferreira":null,"Paredes":null,"Penafiel":null,"Porto":null,"Póvoa de Varzim":null,"Santo Tirso":null,"Valongo":null,"Vila do Conde":null,"Vila Nova de Gaia":null,"Trofa":null,"Abrantes":null,"Alcanena":null,"Almeirim":null,"Alpiarça":null,"Benavente":null,"Cartaxo":null,"Chamusca":null,"Constância":null,"Coruche":null,"Entroncamento":null,"Ferreira do Zêzere":null,"Golegã":null,"Mação":null,"Rio Maior":null,"Salvaterra de Magos":null,"Santarém":null,"Sardoal":null,"Tomar":null,"Torres Novas":null,"Vila Nova da Barquinha":null,"Ourém":null,"Alcácer do Sal":null,"Alcochete":null,"Almada":null,"Barreiro":null,"Grândola":null,"Moita":null,"Montijo":null,"Palmela":null,"Santiago do Cacém":null,"Seixal":null,"Sesimbra":null,"Setúbal":null,"Sines":null,"Arcos de Valdevez":null,"Caminha":null,"Melgaço":null,"Monção":null,"Paredes de Coura":null,"Ponte da Barca":null,"Ponte de Lima":null,"Valença":null,"Viana do Castelo":null,"Vila Nova de Cerveira":null,"Alijó":null,"Boticas":null,"Chaves":null,"Mesão Frio":null,"Mondim de Basto":null,"Montalegre":null,"Murça":null,"Peso da Régua":null,"Ribeira de Pena":null,"Sabrosa":null,"Santa Marta de Penaguião":null,"Valpaços":null,"Vila Pouca de Aguiar":null,"Vila Real":null,"Armamar":null,"Carregal do Sal":null,"Castro Daire":null,"Cinfães":null,"Lamego":null,"Mangualde":null,"Moimenta da Beira":null,"Mortágua":null,"Nelas":null,"Oliveira de Frades":null,"Penalva do Castelo":null,"Penedono":null,"Resende":null,"Santa Comba Dão":null,"São João da Pesqueira":null,"São Pedro do Sul":null,"Sátão":null,"Sernancelhe":null,"Tabuaço":null,"Tarouca":null,"Tondela":null,"Vila Nova de Paiva":null,"Viseu":null,"Vouzela":null,"Calheta (Madeira)":null,"Câmara de Lobos":null,"Funchal":null,"Machico":null,"Ponta do Sol":null,"Porto Moniz":null,"Ribeira Brava":null,"Santa Cruz":null,"Santana":null,"São Vicente":null,"Porto Santo":null,"Vila do Porto":null,"Lagoa (Açores)":null,"Nordeste":null,"Ponta Delgada":null,"Povoação":null,"Ribeira Grande":null,"Vila Franca do Campo":null,"Angra do Heroísmo":null,"Vila da Praia da Vitória":null,"Santa Cruz da Graciosa":null,"Calheta (Açores)":null,"Velas":null,"Lajes do Pico":null,"Madalena":null,"São Roque do Pico":null,"Horta":null,"Lajes das Flores":null,"Santa Cruz das Flores":null,"Corvo":null}, 
        limit: 3
    });
    //open form driver
    $("#formRegisterClientIsDriver").click(openFormDriver);
    //toggle form merchant/client
    $("#openFormRegisterMerchant").click(toogleFormsBtnMerchant);
    //toggle form merchant/client
    $("#openFormRegisterClient").click(toogleFormsBtnClient);
    //change color on label - autocomplete on focus - form register client
    $('#formRegisterClientLocation').focusin(function () {
        $('#labelFormRegisterClientLocation').css("color", "#26a69a");
    });
    //change color on label and check if its valid - autocomplete out focus - form register client
    $('#formRegisterClientLocation').focusout(colorLabelLocationClient);
    //change color on label - autocomplete on focus - form register merchant
    $('#formRegisterMerchantLocation').focusin(function () {
        $('#labelFormRegisterMerchantLocation').css("color", "#26a69a");
    });
    //change color on label and check if its valid - autocomplete out focus - form register merchant
    $('#formRegisterMerchantLocation').focusout(colorLabelLocationMerchant);
    //submit form register client
    $("#formRegisterClient").submit(function (e) {
        submitRegisterClient(e);
    });
    //submit form register merchant
    $("#formRegisterMerchant").submit(function (e) {
        submitRegisterMerchant(e);
    });

    //open form driver
    function openFormDriver() {
        if ($("#formRegisterClientIsDriver").is(":checked")) {
            $("#formRegisterDriver").fadeIn();
        } else {
            $("#formRegisterDriver").fadeOut();
        }
    }
    //toggle from merchant/client
    function toogleFormsBtnMerchant(){
        if ($("#divFormRegisterClient").css('display') !== 'none') {
            $("#divFormRegisterClient").slideToggle(700);
        }
        $("#divFormRegisterMerchant").slideToggle(700);
    }
    //toogle form merchant/client
    function toogleFormsBtnClient(){
        if ($("#divFormRegisterMerchant").css('display') !== 'none') {
            $("#divFormRegisterMerchant").slideToggle(700);
        }
        $("#divFormRegisterClient").slideToggle(700);
    }
    //change color on label and check if its valid - autocomplete out focus - form change info
    function colorLabelLocationClient() {
        var text = $(this).val();
        $('#labelFormRegisterClientLocation').css("color", "#212121");
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
            var newText = $("#formRegisterClientLocation").val();
            var newTextLowerCase = newText.toLowerCase();
            //compare, if its correct change class and stop the loop, if not continue to loop
            if (jQuery.inArray(newTextLowerCase, arrCountiesLowerCase) != -1) {
                $('#formRegisterClientLocation').removeClass("invalid");
                $('#formRegisterClientLocation').addClass("valid");
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
    //change color on label and check if its valid - autocomplete out focus - form change info
    function colorLabelLocationMerchant() {
        var text = $(this).val();
        $('#labelFormRegisterMerchantLocation').css("color", "#212121");
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
            var newText = $("#formRegisterMerchantLocation").val();
            var newTextLowerCase = newText.toLowerCase();
            //compare, if its correct change class and stop the loop, if not continue to loop
            if (jQuery.inArray(newTextLowerCase, arrCountiesLowerCase) != -1) {
                $('#formRegisterMerchantLocation').removeClass("invalid");
                $('#formRegisterMerchantLocation').addClass("valid");
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
    function submitRegisterClient(e) {
        e.preventDefault();
        console.log("Deu");
    }
    function submitRegisterMerchant(e) {
        e.preventDefault();
        console.log("Deu Merchant");
    }
})