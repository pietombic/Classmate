const Joi = require('joi')

const schema = {
    query: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        skip: Joi.number().min(0).required(),
        _official: Joi.bool().default(false)
    })
} 

const upload = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        titolo: Joi.string().min(1).max(20).required().trim(),
        testo: Joi.string().min(1).max(300).required().trim()
    }),
    file: Joi.object().keys({
        buffer: Joi.binary().required(),
        fieldname: Joi.string(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string(),
        size: Joi.number()
    }).required()
}

const remove = {
    query: Joi.object().keys({
        _id: Joi.number().min(1).required(),
    }),
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
}

module.exports = { schema, upload, remove }