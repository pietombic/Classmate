const httpStatus = require("http-status");
const eventiRepository = require('../repository/eventi');
const imagesRepository = require('../imagesRepository/eventi');

const view = (req, res) => {
    let email = `{"email":"${req.query.email}", "skip":"${req.query.skip}", "_official":${req.query._official}}`
    let dati = JSON.parse(email)

    eventiRepository.view(dati)
    .then((risposta) => {
        res.status(httpStatus.OK).json({eventi: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nella lettura degli eventi"})
    })
}

const upload = (req, res) => {
    eventiRepository.upload(req)
    .then((risposta) => {
        res.status(httpStatus.OK).json({data: risposta})
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nel caricamento dell'evento"})
    })
}

const removeById = (req, res) => {
    let data = `{"_id":"${req.query._id}", "email":"${req.body.email}"}`
    let dati = JSON.parse(data)

    eventiRepository.removeById(dati)
    .then((daEliminare) => {
        if(!daEliminare) {return res.status(httpStatus.UNAUTHORIZED).json({error: "L'evento da eliminare non appartiene all'utente"})}
        imagesRepository.remove(daEliminare)
        .then((risposta) => {   //Da modificare in seguito
            res.status(httpStatus.OK).json({data: risposta})
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(httpStatus.BAD_REQUEST).json({error: "Errore nell'eliminazione dell'evento"})
    })
}

module.exports = { view, upload, removeById }