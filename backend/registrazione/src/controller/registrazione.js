const httpStatus = require("http-status");
const registrazioneRepository = require('../repository/registrazione');

const dati = (req, res, next) => {
    registrazioneRepository.list()
    .then((risposta) => {
        res.body = risposta
        return next()
    })
    .catch((err) => {
        console.log(err)
        console.log("Errore nella lettura delle scuole disponibili")
    })
}

const checkRegistration = (req, res) => {
    //ottiene la mail
    let email = req.body.email
    let insieme = `{"email":"${email}"}`
    var dati = JSON.parse(insieme)
    var data = {}

    registrazioneRepository.check(dati)
    .then((risposta) => {
        data.scuole = res.body
        data.utenteEsiste = risposta.utenteEsiste
        res.status(httpStatus.OK).json({dati: data})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nel controllo della registrazione"})
    })
}

const insert = (req, res) => {
    //Ottiene i dati dello studente
    let email = req.body.email
    let password = req.body.password
    let nome = req.body.nome
    let cognome = req.body.cognome
    let scuola = req.body.scuola
    let anno = req.body.anno
    let classe = req.body.classe
    let cellulare = req.body.cellulare
    
    let insieme = `{"email": "${email}", "password": "${password}", "nome": "${nome}", "cognome": "${cognome}",
                    "scuola": "${scuola}", "anno": "${anno}", "classe": "${classe}", "cellulare": "${cellulare}"}`;
    var dati = JSON.parse(insieme);

    registrazioneRepository.insert(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nell'inserimento dei dati"})
    })
}

module.exports = { insert, checkRegistration, dati}