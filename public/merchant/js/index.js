function continueScript() {
    
    $(".modal").modal();
    $('.sidenav').sidenav({
       edge: 'right'
    }); 

    $('input#formChangeInfoNIF, input#formChangeInfoContactNumber').characterCounter();

    $('select').formSelect();

    //autocomplete Field Address(County) on form to change info
    $('input.autocomplete').autocomplete({
        //data is compressed (counties)
        data: {"Águeda":null,"Albergaria-a-Velha":null,"Anadia":null,"Arouca":null,"Aveiro":null,"Castelo de Paiva":null,"Espinho":null,"Estarreja":null,"Santa Maria da Feira":null,"Ílhavo":null,"Mealhada":null,"Murtosa":null,"Oliveira de Azeméis":null,"Oliveira do Bairro":null,"Ovar":null,"São João da Madeira":null,"Sever do Vouga":null,"Vagos":null,"Vale de Cambra":null,"Aljustrel":null,"Almodôvar":null,"Alvito":null,"Barrancos":null,"Beja":null,"Castro Verde":null,"Cuba":null,"Ferreira do Alentejo":null,"Mértola":null,"Moura":null,"Odemira":null,"Ourique":null,"Serpa":null,"Vidigueira":null,"Amares":null,"Barcelos":null,"Braga":null,"Cabeceiras de Basto":null,"Celorico de Basto":null,"Esposende":null,"Fafe":null,"Guimarães":null,"Póvoa de Lanhoso":null,"Terras de Bouro":null,"Vieira do Minho":null,"Vila Nova de Famalicão":null,"Vila Verde":null,"Vizela":null,"Alfândega da Fé":null,"Bragança":null,"Carrazeda de Ansiães":null,"Freixo de Espada à Cinta":null,"Macedo de Cavaleiros":null,"Miranda do Douro":null,"Mirandela":null,"Mogadouro":null,"Torre de Moncorvo":null,"Vila Flor":null,"Vimioso":null,"Vinhais":null,"Belmonte":null,"Castelo Branco":null,"Covilhã":null,"Fundão":null,"Idanha-a-Nova":null,"Oleiros":null,"Penamacor":null,"Proença-a-Nova":null,"Sertã":null,"Vila de Rei":null,"Vila Velha de Ródão":null,"Arganil":null,"Cantanhede":null,"Coimbra":null,"Condeixa-a-Nova":null,"Figueira da Foz":null,"Góis":null,"Lousã":null,"Mira":null,"Miranda do Corvo":null,"Montemor-o-Velho":null,"Oliveira do Hospital":null,"Pampilhosa da Serra":null,"Penacova":null,"Penela":null,"Soure":null,"Tábua":null,"Vila Nova de Poiares":null,"Alandroal":null,"Arraiolos":null,"Borba":null,"Estremoz":null,"Évora":null,"Montemor-o-Novo":null,"Mora":null,"Mourão":null,"Portel":null,"Redondo":null,"Reguengos de Monsaraz":null,"Vendas Novas":null,"Viana do Alentejo":null,"Vila Viçosa":null,"Albufeira":null,"Alcoutim":null,"Aljezur":null,"Castro Marim":null,"Faro":null,"Lagoa (Algarve)":null,"Lagos":null,"Loulé":null,"Monchique":null,"Olhão":null,"Portimão":null,"São Brás de Alportel":null,"Silves":null,"Tavira":null,"Vila do Bispo":null,"Vila Real de Santo António":null,"Aguiar da Beira":null,"Almeida":null,"Celorico da Beira":null,"Figueira de Castelo Rodrigo":null,"Fornos de Algodres":null,"Gouveia":null,"Guarda":null,"Manteigas":null,"Mêda":null,"Pinhel":null,"Sabugal":null,"Seia":null,"Trancoso":null,"Vila Nova de Foz Côa":null,"Alcobaça":null,"Alvaiázere":null,"Ansião":null,"Batalha":null,"Bombarral":null,"Caldas da Rainha":null,"Castanheira de Pêra":null,"Figueiró dos Vinhos":null,"Leiria":null,"Marinha Grande":null,"Nazaré":null,"Óbidos":null,"Pedrógão Grande":null,"Peniche":null,"Pombal":null,"Porto de Mós":null,"Alenquer":null,"Arruda dos Vinhos":null,"Azambuja":null,"Cadaval":null,"Cascais":null,"Lisboa":null,"Loures":null,"Lourinhã":null,"Mafra":null,"Oeiras":null,"Sintra":null,"Sobral de Monte Agraço":null,"Torres Vedras":null,"Vila Franca de Xira":null,"Amadora":null,"Odivelas":null,"Alter do Chão":null,"Arronches":null,"Avis":null,"Campo Maior":null,"Castelo de Vide":null,"Crato":null,"Elvas":null,"Fronteira":null,"Gavião":null,"Marvão":null,"Monforte":null,"Nisa":null,"Ponte de Sor":null,"Portalegre":null,"Sousel":null,"Amarante":null,"Baião":null,"Felgueiras":null,"Gondomar":null,"Lousada":null,"Maia":null,"Marco de Canaveses":null,"Matosinhos":null,"Paços de Ferreira":null,"Paredes":null,"Penafiel":null,"Porto":null,"Póvoa de Varzim":null,"Santo Tirso":null,"Valongo":null,"Vila do Conde":null,"Vila Nova de Gaia":null,"Trofa":null,"Abrantes":null,"Alcanena":null,"Almeirim":null,"Alpiarça":null,"Benavente":null,"Cartaxo":null,"Chamusca":null,"Constância":null,"Coruche":null,"Entroncamento":null,"Ferreira do Zêzere":null,"Golegã":null,"Mação":null,"Rio Maior":null,"Salvaterra de Magos":null,"Santarém":null,"Sardoal":null,"Tomar":null,"Torres Novas":null,"Vila Nova da Barquinha":null,"Ourém":null,"Alcácer do Sal":null,"Alcochete":null,"Almada":null,"Barreiro":null,"Grândola":null,"Moita":null,"Montijo":null,"Palmela":null,"Santiago do Cacém":null,"Seixal":null,"Sesimbra":null,"Setúbal":null,"Sines":null,"Arcos de Valdevez":null,"Caminha":null,"Melgaço":null,"Monção":null,"Paredes de Coura":null,"Ponte da Barca":null,"Ponte de Lima":null,"Valença":null,"Viana do Castelo":null,"Vila Nova de Cerveira":null,"Alijó":null,"Boticas":null,"Chaves":null,"Mesão Frio":null,"Mondim de Basto":null,"Montalegre":null,"Murça":null,"Peso da Régua":null,"Ribeira de Pena":null,"Sabrosa":null,"Santa Marta de Penaguião":null,"Valpaços":null,"Vila Pouca de Aguiar":null,"Vila Real":null,"Armamar":null,"Carregal do Sal":null,"Castro Daire":null,"Cinfães":null,"Lamego":null,"Mangualde":null,"Moimenta da Beira":null,"Mortágua":null,"Nelas":null,"Oliveira de Frades":null,"Penalva do Castelo":null,"Penedono":null,"Resende":null,"Santa Comba Dão":null,"São João da Pesqueira":null,"São Pedro do Sul":null,"Sátão":null,"Sernancelhe":null,"Tabuaço":null,"Tarouca":null,"Tondela":null,"Vila Nova de Paiva":null,"Viseu":null,"Vouzela":null,"Calheta (Madeira)":null,"Câmara de Lobos":null,"Funchal":null,"Machico":null,"Ponta do Sol":null,"Porto Moniz":null,"Ribeira Brava":null,"Santa Cruz":null,"Santana":null,"São Vicente":null,"Porto Santo":null,"Vila do Porto":null,"Lagoa (Açores)":null,"Nordeste":null,"Ponta Delgada":null,"Povoação":null,"Ribeira Grande":null,"Vila Franca do Campo":null,"Angra do Heroísmo":null,"Vila da Praia da Vitória":null,"Santa Cruz da Graciosa":null,"Calheta (Açores)":null,"Velas":null,"Lajes do Pico":null,"Madalena":null,"São Roque do Pico":null,"Horta":null,"Lajes das Flores":null,"Santa Cruz das Flores":null,"Corvo":null}, 
        limit: 2
    });

    //verify if on change input on form change email/password is empty or not, if its empty disabled button
    //to submit, if not, button is enabled
    $(document).on('change', '#formChangeEP input', verifyInputsFormEP);
    //check if password has at least 8 characters and no more than 15 characters,
    //one uppercase, one lowercase and one number
    $("#formChangeEPPassword").on("keyup", checkIfPasswordValid);
    //check if repeatPasssword is equal to password on form change email/password
    $("#formChangeEPRepeatPassword").on("keyup", checkPassEqualRepeat);
    //submit form Change Email/Password
    $("#formChangeEP").submit(function (e) {submitFormChangeEP(e);});
    //on writing on input check if its empty or not on field Address(County) on form change info
    $("#formChangeInfoLocation, #formRegisterAdminLocation").on("keyup", checkCounty);
    //change color on label - autocomplete on focus - form change info
    $('#formChangeInfoLocation').focusin(function () {
        $('#labelFormChangeInfoLocation').css("color", "#26a69a");
    });
    //change color on label and check if its valid - autocomplete out focus - form change info
    $('#formChangeInfoLocation').focusout(colorLabelLocation);
    //submit form change info
    $("#formChangeInfo").submit(function (e) {
        submitFormChangeInfo(e);
    });
    $("#formChangeLogo").submit(function (e) {
        submitFormChangeLogo(e);
    });
    $("#openSectionOrders").click(toggleSectionOrders);
    $("#openSectionProducts").click(toggleSectionProducts);

}