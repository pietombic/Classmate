//Typeorm and entities import
var typeorm = require("typeorm")
const Studente = require("./../entities/Studente")
const Scuola = require("./../entities/Scuola")
const Materia = require("./../entities/Materia")
const Professore = require("./../entities/Professore")

//Other imports
require('dotenv').config()

//Credenziali aws e postgress
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbNome = process.env.DB_NOME
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

//Connessione al db
var dataSource = new typeorm.DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbNome,
    synchronize: true,
    entities: [require("./../entities/Appunti"), require("./../entities/Evento"), require("./../entities/Professore"), require("./../entities/Scuola"), require("./../entities/Studente"), require("./../entities/Materia"),]
})

//Inizializzazione entità
dataSource.initialize().then(async () => {

    console.log("Entità inizializzate")

}).catch(function (error) {console.log("Errore nell'inizializzazione delle entità: ", error)})

const view = async (dati) => {
    let response = {}

    //Ottiene il codice della scuola
    const scuolaQuery = await ottieneCodiceScuolaByEmail(dati.email)

    //Selezona gli studenti in attesa di approvazione di quella scuola
    const studentiQuery = await dataSource
    .createQueryBuilder()
    .select("nome").addSelect("cognome").addSelect("classe")
    .from(Studente, "studente")
    .where("studente.scuola = :scuola", {scuola: scuolaQuery.codice})
    .andWhere("studente.approvato = :approvato", {approvato: 0})
    .getRawMany()

    response.studenti = studentiQuery

    //Seleziona le materie di quella scuola
    const materieQuery = await dataSource
    .createQueryBuilder()
    .select("nome")
    .from(Materia, "materia")
    .where("materia.scuola = :scuola", {scuola: scuolaQuery.codice})
    .getRawMany()

    response.materie = materieQuery

    //Seleziona i professori di quella scuola
    const professoriQUery = await dataSource
    .createQueryBuilder()
    .select("nominativo")
    .from(Professore, "professore")
    .where("professore.scuola = :scuola", {scuola: scuolaQuery.codice})
    .getRawMany()

    response.professori = professoriQUery

    return response
}

const addMateria = async (dati) => {
    //Ottiene il codice della scuola
    const scuolaQuery = await ottieneCodiceScuolaByEmail(dati.email)

    //Controlla che la materia non esista già
    const checkQuery = await dataSource
    .createQueryBuilder()
    .select("nome")
    .from(Materia, "materia")
    .where("materia.scuola = :scuola", {scuola: scuolaQuery.codice})
    .andWhere("materia.nome = :nome", {nome: dati.materia})
    .getCount()

    if(checkQuery > 0){
        return "La materia è già esistente"
    }

    //Inserisce la materia
    await dataSource
    .createQueryBuilder()
    .insert()
    .into(Materia)
    .values({nome: dati.materia, scuola: scuolaQuery.codice})
    .execute()

    return "Materia aggiunta con successo"
}

const addProfessore = async (dati) => {
    //Ottiene il codice della scuola
    const scuolaQuery = await ottieneCodiceScuolaByEmail(dati.email)

    //Controlla che il professore non esista già
    const checkQuery = await dataSource
    .createQueryBuilder()
    .select("nominativo")
    .from(Professore, "professore")
    .where("professore.scuola = :scuola", {scuola: scuolaQuery.codice})
    .andWhere("professore.nominativo = :nominativo", {nominativo: dati.professore})
    .getCount()

    if(checkQuery > 0){
        return "Il docente è già esistente"
    }

    //Inserisce il professore
    await dataSource
    .createQueryBuilder()
    .insert()
    .into(Professore)
    .values({nominativo: dati.professore, scuola: scuolaQuery.codice})
    .execute()

    return "Docente aggiunto con successo"
}

async function ottieneCodiceScuolaByEmail(email) {
    const query = await dataSource
    .createQueryBuilder()
    .select("codice")
    .from(Scuola, "scuola")
    .where("scuola.email = :email", {email: email})
    .getRawOne()

    return query
}

module.exports = { view, addMateria, addProfessore }