const Joi = require('joi')

const view = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required()
    })
}

const materie = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        materia: Joi.string().min(1).max(100).required().lowercase().trim(),
    })
}

const professori = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: false }).required(),
        professore: Joi.string().min(1).max(40).required().lowercase().trim(),
    })
}

module.exports = { view, materie, professori }