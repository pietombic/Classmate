const httpStatus = require("http-status");
const scuolaRepository = require('../repository/scuola');

const view = (req, res) => {
    let email = `{"email": "${req.body.email}"}`
    var dati = JSON.parse(email);

    scuolaRepository.view(dati)
    .then((risposta) => {
        let newRisposta = elabora(risposta)
        res.status(httpStatus.OK).json({data: newRisposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella ricerca dei dati scuola"})
    })
}

function elabora(dati) {
    //Studenti
    let studenti = []
    for (var i = 0; i < dati.studenti.length; i++){
        let studente = {}
        studente.studente = dati.studenti[i].nome + ' ' + dati.studenti[i].cognome
        studente.classe = dati.studenti[i].classe
        studenti.push(studente)
    }
    studenti.sort()
    dati.studenti = studenti

    //materie
    let materie = []
    for (var i = 0; i < dati.materie.length; i++){
        materie.push(dati.materie[i].nome)
    }
    materie.sort()
    dati.materie = materie

    //professori
    let professori = []
    for (var i = 0; i < dati.professori.length; i++){
        professori.push(dati.professori[i].nominativo)
    }
    professori.sort()
    dati.professori = professori

    return dati
}

const addMaterie = (req, res) => {
    let data = `{"email": "${req.body.email}", "materia":"${req.body.materia}"}`
    var dati = JSON.parse(data);

    scuolaRepository.addMateria(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nell'aggiunta della materia"})
    })
}

const addProfessori = (req, res) => {
    let data = `{"email": "${req.body.email}", "professore":"${req.body.professore}"}`
    var dati = JSON.parse(data);

    scuolaRepository.addProfessore(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nell'aggiunta del docente"})
    }) 
}

module.exports = { view, addMaterie, addProfessori }