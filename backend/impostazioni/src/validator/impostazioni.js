const Joi = require('joi')
const JoiPhone = Joi.extend(require('joi-phone-number'))

const schema = {
    query: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
} 

const edit = {
    body: Joi.object().keys({
        id: Joi.number().min(1).required(),
        nome: Joi.string().min(1).max(20).default("").trim(),
        cognome: Joi.string().min(1).max(20).default("").trim(),
        classe: Joi.string().min(2).max(10).default("").trim(),
        cellulare: JoiPhone.string().max(15).min(10).default("").phoneNumber({ defaultCountry: 'IT', format: 'e164', strict: true })
    })
}

module.exports = { schema, edit }