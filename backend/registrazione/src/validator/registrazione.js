const Joi = require('joi')
const JoiPhone = Joi.extend(require('joi-phone-number'))

const schema = {
    body: Joi.object().keys({
        nome: Joi.string().min(3).max(20).trim().required(),
        cognome: Joi.string().min(3).max(20).trim().required(),
        cellulare: JoiPhone.string().max(15).min(10).default("").phoneNumber({ defaultCountry: 'IT', format: 'e164', strict: true }),
        classe: Joi.string().min(2).max(8).trim().required(),
        scuola: Joi.string().min(1).max(15).trim().required(),
        anno: Joi.number().min(1).max(6).required(),
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        password: Joi.string().min(5).max(30).trim().required()
    })
} 

const email = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
}

module.exports = { schema, email }