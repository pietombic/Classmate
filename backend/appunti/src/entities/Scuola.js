var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Scuola", 
    columns: {
        codice: {
            primary: true,
            type: "varchar",
            generated: false,
            length: 10
        },
        nome: {
            type: "varchar",
            length: 15
        },
        email: {
            type: "varchar",
            length: 30
        },
        password: {
            type: "varchar",
            length: 50
        },
        indirizzo: {
            type: "varchar",
            length: 100
        },
        descrizione: {
            type: "varchar",
            length: 300
        },
        foto: {
            type: "varchar",
            length: 20
        },
        numerostudenti: {
            type: "integer"
        },
        numeroappunticaricati: {
            type: "integer"
        },
        anni: {
            type: "integer"
        }
    },
    relations: {
        appunti: {
            type: "one-to-many",
            target: "Appunti",
            JoinColumn: { name: 'appunti', referencedColumnName: 'ida' }
        },
        materia: {
            type: "one-to-many",
            target: "Materia",
            JoinColumn: { name: 'materia', referencedColumnName: 'scuola' }
        },
        professore: {
            type: "one-to-many",
            target: "Professore",
            JoinColumn: { name: 'professore', referencedColumnName: 'scuola' }
        },
        studente: {
            type: "one-to-many",
            target: "Studente",
            JoinColumn: { name: 'studente', referencedColumnName: 'scuola' }
        },
        evento: {
            type: "one-to-many",
            target: "Evento",
            JoinColumn: { name: 'evento', referencedColumnName: 'scuola' }
        }
    }
})