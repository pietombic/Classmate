const Joi = require('joi')

const account = {
    query: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
} 

const edit = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        biografia: Joi.string().min(1).trim()
    }),
    file: Joi.object().keys({
        buffer: Joi.binary().required(),
        fieldname: Joi.string(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string().required(),
        size: Joi.number()
    })
}

module.exports = { account, edit }