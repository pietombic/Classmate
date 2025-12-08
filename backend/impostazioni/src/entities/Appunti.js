const { Column } = require("typeorm")

var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Appunti", 
    columns: {
        ida: {
            primary: true,
            type: "integer",
            generated: true
        },
        materia: {
            type: "varchar",
            length: 100
        },
        anno: {
            type: "integer"
        },
        argomento: {
            type: "varchar",
            length: 100
        },
        professore: {
            type: "varchar",
            length: 40
        },
        scuola: {
            type: "varchar",
            length: 10
        },
        studente: {
            type: "integer"
        },
        datainserimento: {
            type: "date"
        },
        foto: {
            type: "varchar",
            length: 20
        }
    },
    relations: {
        professore: {
            target: "Professore",
            type: "many-to-many",
            inverseSide: "appunti",
            joinColumn: { name: 'professore', referencedColumnName: 'nominativo' }
        },
        appunti: {
            type: "one-to-many",
            target: "Scuola",
            JoinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
        studente: {
            target: "Studente",
            type: "many-to-one",
            inverseSide: "appunti",
            joinColumn: { name: 'studente', referencedColumnName: 'ids'},
        },
        materia: {
            target: "Materia",
            type: "many-to-many",
            inverseSide: "appunti",
            joinColumn: { name: 'materia', referencedColumnName: 'nome' }
        },
        scuola: {
            target: "Scuola",
            type: "many-to-one",
            inverseSide: "appunti",
            joinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
    }
})