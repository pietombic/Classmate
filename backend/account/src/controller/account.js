const httpStatus = require("http-status");
const appuntiRepository = require('../repository/account');
const imagesRepository = require('../imagesRepository/account')

const view = (req, res) => {
    let email = `{"email": "${req.query.email}"}`
    var dati = JSON.parse(email);

    appuntiRepository.view(dati)
    .then((risposta) => {
        let rispostaElaborata = elaboraOpzioni(risposta)
        res.status(httpStatus.OK).json({data: rispostaElaborata})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella ricerca dei dati utente"})
    })
}

const edit = (req, res) => {
    appuntiRepository.edit(req)
    .then((dettagli) => {
        imagesRepository.remove(dettagli)
        .then((risposta) => {   //Da cambiare in seguito
            res.status(httpStatus.OK).json({data: risposta})
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella modifica del profilo utente"})
    })
}

function elaboraOpzioni (opzioni) {
    let options = opzioni.opzioni
    let opts = {}
    let risposta = opzioni

    //materie
    let materie = []
    for(var i = 0; i < options.materie.length; i++) {
        materie.push(options.materie[i].nome)
    }

    opts.materie = materie

    //professori
    let professori = []
    for(var i = 0; i < options.professori.length; i++) {
        professori.push(options.professori[i].nominativo)
    }

    opts.professori = professori

    //anni
    let anni = []
    for(var i = 1; i <= options.annoMax[0].annoMax; i++){
        anni.push(i)
    }

    opts.anni = anni

    risposta.opzioni = opts
    return risposta
}

module.exports = { view, edit }