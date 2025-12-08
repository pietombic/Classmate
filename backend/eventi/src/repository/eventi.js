//Typeorm imports
var typeorm = require("typeorm")

//AWS imports
const awsS3 = require("@aws-sdk/client-s3")
const awsS3Signer = require("@aws-sdk/s3-request-presigner");
const Evento = require("../entities/Evento");
const Studente = require("../entities/Studente");

//Other imports
require('dotenv').config()

//Credenziali aws e postgress
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbNome = process.env.DB_NOME
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

//Inizializza l'oggetto bucket
const s3 = new awsS3.S3Client({region: bucketRegion});

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
    //Ottiene la scuola dell'utente
    const scuolaQuery = await ottieneDatiStudenteByEmail(dati.email)
    let Codicescuola = scuolaQuery.scuola

    //Offset
    let eventiPerPagina = Number(2)
    let skip = Number(dati.skip)

    //Seleziona il numero di appunti
    let count = await dataSource
    .createQueryBuilder(Evento, "evento")
    .where("evento.scuola = :codice", {codice: Codicescuola})
    if (dati._official == true) {count.andWhere("evento.official = :official", { official: 1 })}
    let numero = await count.getCount()
    console.log("numero: ", numero)

    //  12      4                   15
    console.log("skip: ", skip)
    console.log("eventiperpagina: ", eventiPerPagina)
    if((skip + eventiPerPagina) >= numero) {
        console.log("somma: ", (skip + eventiPerPagina))
        eventiPerPagina = numero - skip
    }

    //Seleziona i dati degli eventi dal db
    let eventiQuery = await dataSource
    .createQueryBuilder(Evento, "evento").limit(eventiPerPagina).offset(skip)
    .innerJoin("evento.studente", "studente")
    .select("evento.ide", "id").addSelect("evento.testo", "testo").addSelect("evento.foto", "foto").addSelect("studente.nome", "nome").addSelect("studente.cognome", "cognome")
    .addSelect("evento.titolo", "titolo").addSelect("evento.official", "official")
    .where("evento.scuola = :codice", {codice: Codicescuola})
    if (dati._official == true) {eventiQuery.andWhere("evento.official = :official", { official: 1 })}
    eventiQuery.orderBy("evento.data", "DESC")
    let eventi = await eventiQuery.getRawMany()
    let query = await eventiQuery.getSql()

    console.log(query)

    //Seleziona la foto dell'evento da aws s3
    for (const e of eventi) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: "events/" + e.foto
        }
        const command = new awsS3.GetObjectCommand(getObjectParams)
        const url = await awsS3Signer.getSignedUrl(s3, command, { expiresIn: 3600 })
        e.foto = url
    }

    return eventi
}

const upload = async (req) => {
    //Ottiene la scuola dell'utente
    const scuolaQuery = await ottieneDatiStudenteByEmail(req.body.email)
    let codiceScuola = scuolaQuery.scuola
    let codiceStudente = scuolaQuery.id
    let official = scuolaQuery.official;

    //Ottiene la data corrente
    let oggi = new Date().toISOString().slice(0, 10)

    //Inserisce i dati nel db
    const insertEventiQuery = await dataSource
    .createQueryBuilder()
    .insert()
    .into(Evento)
    .values([
        { scuola: codiceScuola, tipo: 0, titolo: req.body.titolo, testo: req.body.testo, studente: codiceStudente, data: oggi, foto: 'temp', official: official }
    ])
    .execute()

    let idEvento = insertEventiQuery.raw[0].ide

    //Ricava l'estensione del file e crea il nome con cui inserirlo nel db e su s3.
    let mime = req.file.mimetype
    let tipo = mime.substring(6)
    let Nomefoto = idEvento + '_event_pic' + `.${tipo}`

    //Inserisce il nome della foto nel db
    await dataSource
    .createQueryBuilder()
    .update(Evento)
    .set({
        foto: Nomefoto
    })
    .where("ide = :id", { id : idEvento})
    .execute()

    //Carica la foto in aws s3
    const command = new awsS3.PutObjectCommand({
        Bucket: bucketName,
        Key: "events/" + Nomefoto,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })
    await s3.send(command)

    return "Evento caricato con successo"
}

const removeById = async (dati) => {
    //Controlla che l'evento appartenga all'utente
    //Seleziona l'utente che ha caricato l'evento da eliminare e il nome dell'immagine
    let eventoQuery = await dataSource
    .createQueryBuilder()
    .select("studente").addSelect("foto")
    .from(Evento, "evento")
    .where("evento.ide = :id", {id: dati._id})
    .getRawOne()

    //Seleziona l'utente che appartiene alla email inviata
    let emailQuery = await ottieneDatiStudenteByEmail(dati.email)

    if (eventoQuery.studente != emailQuery.id) {
        return false
    }

    //Elimina l'evento
    await dataSource
    .createQueryBuilder()
    .delete()
    .from(Evento)
    .where("ide = :id", {id: dati._id})
    .execute()

    let daEliminare = `{"nomeImmagine":"events/${eventoQuery.foto}"}`
    console.log(daEliminare)
    let risposta = JSON.parse(daEliminare)

    return risposta
}

async function ottieneDatiStudenteByEmail(email) {
    const query = await dataSource
    .createQueryBuilder()
    .select("scuola").addSelect("ids", "id").addSelect("coordinatore", "official")
    .from(Studente, "studente")
    .where("studente.email = :email", {email: email})
    .getRawOne()

    return query
}

module.exports = { view, upload, removeById }