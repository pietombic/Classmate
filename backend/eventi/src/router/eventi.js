const express = require('express')
const validate = require('../middleware/validator')  
const eventiValidator = require('./../validator/eventi')   
const eventiController = require('../controller/eventi') 
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

//Ottiene gli eventi
router.get('/eventi', validate(eventiValidator.schema), eventiController.view)

//Carica gli eventi
router.post('/eventi/upload', upload.single('fotoevento'), validate(eventiValidator.upload), eventiController.upload)

//Elimina un evento usando l'id
router.delete('/eventi/remove', validate(eventiValidator.remove), eventiController.removeById)

module.exports = router