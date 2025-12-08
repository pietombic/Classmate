const httpStatus = require("http-status");
const appuntiRepository = require('../repository/appunti');
const imagesRepository = require("../imagesRepository/appunti");

const list = (req, res) => {
    //Ottiene la mail dello studente e i filtri
    let email = req.query.email
    let anno = req.query._anno
    let materia = req.query._materia
    let professore = req.query._professore
    let pagina = req.query.pagina

    let insieme = `{"email": "${email}", "_anno": "${anno}", "_materia": "${materia}", "_professore": "${professore}", "pagina": "${pagina}"}`;
    var dati = JSON.parse(insieme);

    appuntiRepository.list(dati)
    .then((risposta) => {
        datiConFiltri = filtri(risposta)
        res.status(httpStatus.OK).json({data: datiConFiltri})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella lettura dei risultati"})
    })
}

function filtri(risposta) {
    let response = risposta.filtri

    //get array di materie
    var materie = [], professori = [], anni = [];
    for(var i = 0; i < response.length; i++){
        materie.push(response[i].materia);
        professori.push(response[i].nominativo)
        anni.push(response[i].anno);
    }
    materie.sort();
    professori.sort();
    anni.sort();
    materie = [...new Set(materie)]
    professori = [...new Set(professori)]
    anni = [...new Set(anni)]

    //ordina i risultati
    return {
        appunti: risposta.appunti,
        filtri: {
            materie: materie,
            professori: professori,
            anni: anni
        }
    }
}

const studente = (req, res) => {
    //Ottiene l'id dello studente e la pagina attuale
    let id = `{"id": "${req.query._id}", "skip": "${req.query.skip}"}`;
    var dati = JSON.parse(id);

    appuntiRepository.studente(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella lettura dei risultati"})
    })
}

const upload = (req, res) => {
    appuntiRepository.upload(req)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nel caricamento degli appunti"})
    })
}

const remove = (req, res) => {
    //Ottiene l'id dell'appunto e la mail dello studente
    let data = `{"_id": "${req.query._id}", "email":"${req.body.email}"}`;
    var dati = JSON.parse(data);

    appuntiRepository.remove(dati)
    .then((datiImmagine) => {
        imagesRepository.remove(datiImmagine)
        .then((risposta) => {   //Da modificare poi
            res.status(httpStatus.OK).json({data: risposta})
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nell'eliminazione dell'appunto"})
    })
}

module.exports = { list, studente, upload, remove }