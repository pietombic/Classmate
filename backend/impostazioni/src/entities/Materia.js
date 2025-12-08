var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Materia", 
    columns: {
        idm: {
            primary: true,
            type: "integer",
            generated: true
        },
        nome: {
            type: "varchar",
            length: 100,
        },
        scuola: {
            type: "varchar",
            length: 10
        }
    },
    relations: {
        scuola: {
            target: "Scuola",
            type: "many-to-one",
            inverseSide: "materia",
            joinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
        appunti: {
            type: "many-to-many",
            target: "Appunti",
            JoinColumn: { name: 'appunti', referencedColumnName: 'ida' }
        }
    }
})