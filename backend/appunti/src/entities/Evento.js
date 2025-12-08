var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Evento", 
    columns: {
        ide: {
            primary: true,
            type: "integer",
            generated: true
        },
        tipo: {
            type: "bit",
            default: 0
        },
        testo: {
            type: "varchar",
            length: 300
        },
        foto: {
            type: "varchar",
            length: 25
        },
        scuola: {
            type: "varchar",
            length: 10
        },
        studente: {
            type: "integer"
        },
        data: {
            type: "date",
            default: "NOW()"
        },
        titolo: {
            type: "varchar",
            length: 20
        },
        official: {
            type: "bit",
            default: 0
        },
    },
    relations: {
        scuola: {
            target: "Scuola",
            type: "many-to-one",
            inverseSide: "evento",
            joinColumn: { name: 'scuola', referencedColumnName: 'codice' }
        },
        studente: {
            target: "Studente",
            type: "many-to-one",
            inverseSide: "evento",
            joinColumn: { name: 'studente', referencedColumnName: 'ids'},
        },
    }
})