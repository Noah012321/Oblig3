
function testInfo() {
    let telefonNrRegex = /^(\+\d{1,3}[- ]?)?\d{8}$/;
    let epostRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let navnRegex = /^[a-zA-ZæøåÆØÅ' ]{2,30}$/;

    let fornNavn = document.getElementById("fornNavn").value;
    let etterNavn = document.getElementById("etterNavn").value;
    let telefonNr = document.getElementById("telefonNr").value;
    let epost = document.getElementById("epost").value;
    let antallBiletter = document.getElementById("antallBiletter").value;

    // Validerer om det er skrevet tekst i input boksene
    if (fornNavn === "" || etterNavn === "" || telefonNr === "" || epost === "" || antallBiletter === "") {
        alert("Alle felt må fylles ut");
        return false; // Stopp funksjonen her
    }

    // Bruker regex og if setninger for å sjekke om de oppfyller kravene
    if (!telefonNrRegex.test(telefonNr)) {
        alert("Vennligst skriv inn et gyldig telefonnummer");
        return false;
    }

    if (!epostRegex.test(epost)) {
        alert("Vennligst skriv inn en gyldig e-postadresse");
        return false;
    }
    if (!navnRegex.test(fornNavn + etterNavn)) {
        alert("Skriv inn et gyldig navn")
        return false;
    }

    lagreInfo()

}

function lagreInfo(){
    const billett = {
        id: $("#id").val(),
        filmer: $("#filmer").val(),
        antallBiletter: $("#antallBiletter").val(),
        fornNavn: $("#fornNavn").val(),
        etterNavn: $("#etterNavn").val(),
        telefonNr: $("#telefonNr").val(),
        epost: $("#epost").val()
    };

    if(billett.id){
        $.post("/oppdaterBillett", billett, function(){
            hentBilletter();
        });
    }else {
        $.post("/lagre", billett, function(){
            hentBilletter();
        });
    }


    // Tøm input-feltene
    $("#filmer").val("");
    $("#antallBiletter").val("");
    $("#fornNavn").val("");
    $("#etterNavn").val("");
    $("#telefonNr").val("");
    $("#epost").val("");
}

function hentBilletter(){
    $.get("/hentBilletter", function(visBilletter){
        formaterBilletter(visBilletter);
    });
}
function formaterBilletter(visBilletter){
    let ut = "";
    for (let billett of visBilletter){
        ut += "Film: " + billett.filmer + " Antall: " + billett.antallBiletter + " Navn: " + billett.fornNavn + " " + billett.etterNavn + " Telefon: " + billett.telefonNr + " Epost: " + billett.epost + "<br>";
        ut += "<button class='btn btn-danger' onclick='oppdaterBillett(" + billett.id + ")'>Oppdater</button>";
        ut += "<button class='btn btn-danger' onclick='slettBillett(" + billett.id + ")'>Slett</button><br>";
    }
    document.getElementById("output").innerHTML = ut;
}

function slettBillett(id){
    $.post("/slettBilett", {id:id}, function(){
        hentBilletter();
    });
}

function slettArray(){
    $.post("/slettAlt", function(){
        hentBilletter();
    });
}

function oppdaterBillett(id){

    $.get("/hentEnBillett", {id:id}, function(billett){
        $("#filmer").val(billett.filmer);
        $("#antallBiletter").val(billett.antallBiletter);
        $("#fornNavn").val(billett.fornNavn);
        $("#etterNavn").val(billett.etterNavn);
        $("#telefonNr").val(billett.telefonNr);
        $("#epost").val(billett.epost);
        $("#id").val(billett.id);
    });
}
function sendOppdatertBillett(id){
    let oppdatertBillett = {
        filmer: $("#filmer").val(),
        antallBiletter: $("#antallBiletter").val(),
        fornNavn: $("#fornNavn").val(),
        etterNavn: $("#etterNavn").val(),
        telefonNr: $("#telefonNr").val(),
        epost: $("#epost").val()
    };
    $.post("/oppdaterBillett", {id:id, billett:oppdatertBillett}, function(){
        hentBilletter();
    });
}