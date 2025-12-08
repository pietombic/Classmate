var typeorm = require("typeorm")
const Studente = require("./../entities/Studente")
require('dotenv').config()

//Credenziali postgress
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

const list = async (dati) => {
    //Ottiene i dati da visualizzare dal db
    const impostazioniQuery = await dataSource
    .createQueryBuilder(Studente, "studente")
    .innerJoin("studente.scuola", "scuola")
    .select("studente.ids", "id").addSelect("studente.nome", "nome").addSelect("studente.cognome", "cognome")
    .addSelect("studente.classe", "classe").addSelect("studente.cellulare", "cellulare").addSelect("scuola.nome", "nomeScuola")
    .where("studente.email = :email", { email: dati.email })
    .getRawOne()

    return impostazioniQuery
}

const edit = async (dati) => {
    //Aggiorna i dati ricevuti
    await dataSource
    .createQueryBuilder()
    .update(Studente)
    .set(dati.edit)
    .where("ids = :id", { id: dati.id })
    .execute()

    return "Dati aggiornati con successo"
}

module.exports = { list, edit }