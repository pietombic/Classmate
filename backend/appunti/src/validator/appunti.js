const Joi = require('joi')

const schema = {
    query: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        pagina: Joi.number().min(0).required(),
        _anno: Joi.number().min(1).max(5),
        _professore: Joi.string().min(1).max(40).trim(),
        _materia: Joi.string().min(1).max(70).trim()
    })
} 

const id = {
    query: Joi.object().keys({
        _id: Joi.number().min(1).required(),
        skip: Joi.number().min(0).required()
    })
}

const remove = {
    query: Joi.object().keys({
        _id: Joi.number().min(1).required()
    }),
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
}

const upload = {
    body: Joi.object().keys({
        materia: Joi.string().min(1).max(100).required().lowercase().trim(),
        anno: Joi.number().min(1).max(6).required(),
        professore: Joi.string().min(3).max(40).required().trim(),
        argomento: Joi.string().min(1).max(100).required().trim(),
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
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

module.exports = { schema, remove, upload, id }