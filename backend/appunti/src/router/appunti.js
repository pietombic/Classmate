const express = require('express')
const validate = require('./../middleware/validator')  
const appuntiValidator = require('./../validator/appunti')   
const appuntiController = require('./../controller/appunti') 
const multer = require("multer")

const router = express.Router()

//Multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//Middleware
router.use((req, res, next) => {
    console.log(`Route called: ${req.method} - ${req.originalUrl}`)
    next()
})

//Get lista di appunti
router.get('/appunti', validate(appuntiValidator.schema), appuntiController.list)

//get lista di appunti di un solo studente
router.get('/appunti/account', validate(appuntiValidator.id), appuntiController.studente)

//Carica appunti
router.post('/appunti/upload', upload.single('fotoappunti'), validate(appuntiValidator.upload), appuntiController.upload)

//Elimina appunti
router.delete('/appunti/remove', validate(appuntiValidator.remove), appuntiController.remove)

module.exports = router