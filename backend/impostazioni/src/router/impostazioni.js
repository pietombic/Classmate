const express = require('express')
const validate = require('./../middleware/validator')  
const impostazioniValidator = require('./../validator/impostazioni')   
const impostazioniController = require('./../controller/impostazioni') 

const router = express.Router()

//Middleware
router.use((req, res, next) => {
    console.log(`Route called: ${req.method} - ${req.originalUrl}`)
    next()
})

//Get impostazioni
router.get('/impostazioni', validate(impostazioniValidator.schema), impostazioniController.list)

//Update impostazioni
router.put('/impostazioni/edit', validate(impostazioniValidator.edit), impostazioniController.edit)

module.exports = router