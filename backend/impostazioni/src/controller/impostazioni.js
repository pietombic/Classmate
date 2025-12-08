const httpStatus = require("http-status");
const impostazioniRepository = require('../repository/impostazioni');
const { object } = require("joi");

const list = (req, res) => {
    //Ottiene la mail dello studente
    let email = `{"email": "${req.query.email}"}`;
    var dati = JSON.parse(email);

    impostazioniRepository.list(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella lettura delle impostazioni"})
    })
}

const edit = (req, res) => {
    //Ottiene i dati da modificare ma solo quelli passati
    let temp = ""
    let daModificare = {}
    daModificare.id = req.body.id
    for (const dato in req.body) {
        if (req.body[dato] != '' && dato != "id") {
            if(temp == ""){
                temp = `{"${dato}":"${req.body[dato]}"`
            }
            else {
                temp += `, "${dato}":"${req.body[dato]}"`
            }
        }
    }
    temp += "}"
    daModificare.edit = JSON.parse(temp)

    impostazioniRepository.edit(daModificare)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella modifica delle impostazioni"})
    })
}

module.exports = { list, edit }