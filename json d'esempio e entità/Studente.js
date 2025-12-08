const { JoinColumn } = require("typeorm")

var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Studente", 
    columns: {
        ids: {
            primary: true,
            type: "integer",
            generated: true
        },
        password: {
            type: "varchar",
            length: 50
        },
        nome: {
            type: "varchar",
            length: 20
        },
        cognome: {
            type: "varchar",
            length: 20
        },
        cellulare: {
            type: "varchar",
            length: 15,
            nullable: true
        },
        anno: {
            type: "integer"
        },
        fotoprofilo: {
            type: "varchar",
            length: 35
        },
        appunticaricati: {
            type: "integer"
        },
        classe: {
            type: "varchar",
            length: 10
        },
        biografia: {
            type: "varchar",
            length: 300
        },
        coordinatore: {
            type: "bit"
        },
        email: {
            type: "varchar",
            length: 50
        },
        scuola: {
            type: "varchar",
            length: 10
        },
        approvato: {
            type: "bit"
        }
    },
    relations: {
        scuola: {
            target: "Scuola",
            type: "many-to-one",
            inverseSide: "studente",
            joinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
        appunti: {
            type: "one-to-many",
            target: "Appunti",
            JoinColumn: { name: 'appunti', referencedColumnName: 'ida' }
        }
    }
})