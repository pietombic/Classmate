const express = require('express')
const validate = require('../middleware/validator')  
const accountValidator = require('../validator/account')   
const accountController = require('../controller/account') 
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

//Get dati account
router.get('/account', validate(accountValidator.account), accountController.view)

//Modifica dati account
router.put('/account/edit/', upload.single('fotoprofilo'), validate(accountValidator.edit), accountController.edit)

module.exports = router