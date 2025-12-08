const express = require('express')
const validate = require('../middleware/validator')  
const registrazioneValidator = require('../validator/registrazione')   
const registrazioneController = require('../controller/registrazione')

const router = express.Router()

//Middleware
router.use((req, res, next) => {
    console.log(`Route called: ${req.method} - ${req.originalUrl}`)
    next()
})

//Get dati per la registrazione
router.get('/registrazione/dati', validate(registrazioneValidator.email), registrazioneController.dati, registrazioneController.checkRegistration)

//registra l'utente
router.post('/registrazione/insert', validate(registrazioneValidator.schema), registrazioneController.insert)

module.exports = router