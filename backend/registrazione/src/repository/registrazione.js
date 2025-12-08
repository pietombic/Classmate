var typeorm = require("typeorm")
const Studente = require("../entities/Studente");
const Scuola = require("../entities/Scuola");
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

//Prende le scuole e gli anni disponibili per la registrazione
const list = async() => {
    var scuole = []

    //Scuole
    const scuoleQuery = await dataSource
    .createQueryBuilder()
    .select("nome")
    .from(Scuola, "Scuola")
    .getRawMany()

    //Anni relativi a ogni scuola
    for (var i = 0; i < scuoleQuery.length; i++) {
        var temp = {}

        const anniQuery = await dataSource
        .createQueryBuilder()
        .select("anni")
        .from(Scuola, "Scuola")
        .where("Scuola.nome = :nome", {nome: scuoleQuery[i].nome})
        .getRawOne()

        temp.scuola = scuoleQuery[i].nome
        temp.anni = anniQuery.anni
        scuole.push(temp)
    }

    scuole.sort()
    return scuole
}

//Controlla se l'utente è già registrato
const check = async(data) => {
    let email = data.email
    var risposta = {}

    const conteggio = await dataSource
    .getRepository(Studente)
    .createQueryBuilder("studente")
    .where("studente.email = :email", {email: email})
    .getCount()

    if (conteggio != 0){
        risposta.utenteEsiste = true
    }
    else{
        risposta.utenteEsiste = false
    }
    
    return risposta
}

//Inserisce i dati nel db
const insert = async(dati) => {

    //Estrapola la scuola
    const codiceScuola = await dataSource
    .createQueryBuilder()
    .select("codice")
    .from(Scuola, "scuola")
    .where("scuola.nome = :nome", {nome: dati.scuola})
    .getRawOne()

    //Inserisce i dati dello studente
    //controlla se il cellulare è defined
    if (dati.cellulare == 'undefined'){
        dati.cellulare = null
    }

    //biografia e foto profilo di default
    let foto = "default_profile_pic.png"
    let bio = "Hey there! I'm using Classmate!"

    await dataSource
    .createQueryBuilder()
    .insert()
    .into(Studente)
    .values([
        {email: dati.email, password: dati.password, nome: dati.nome, cognome: dati.cognome, scuola: codiceScuola.codice, anno: dati.anno, classe: dati.classe,
            cellulare: dati.cellulare, fotoprofilo: foto, biografia: bio, coordinatore: 0, approvato: 0, appunticaricati: 0}
    ])
    .execute()

    var risposta = "Utente registrato con successo"

    return risposta
}

module.exports = { list, check, insert }