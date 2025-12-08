const express = require('express')
const validate = require('../middleware/validator')  
const scuolaValidator = require('../validator/scuola')   
const scuolaController = require('../controller/scuola')

const router = express.Router()

//Middleware
router.use((req, res, next) => {
    console.log(`Route called: ${req.method} - ${req.originalUrl}`)
    next()
})

//Get dati
router.get('/scuola', validate(scuolaValidator.view), scuolaController.view)

//Add materie
router.post('/scuola/addmaterie', validate(scuolaValidator.materie), scuolaController.addMaterie)

//Add professori
router.post('/scuola/addprofessori', validate(scuolaValidator.professori), scuolaController.addProfessori)

module.exports = router