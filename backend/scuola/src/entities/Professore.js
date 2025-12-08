var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Professore", 
    columns: {
        idp: {
            primary: true,
            type: "integer",
            generated: true
        },
        nominativo: {
            type: "varchar",
            length: 40,
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
            inverseSide: "professore",
            joinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
        appunti: {
            type: "many-to-many",
            target: "Appunti",
            JoinColumn: { name: 'appunti', referencedColumnName: 'ida' }
        }
    }
})