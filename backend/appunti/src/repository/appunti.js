//Typeorm imports
const Appunti = require("../entities/Appunti");
const Studente = require("../entities/Studente");
var typeorm = require("typeorm")

//AWS imports
const awsS3 = require("@aws-sdk/client-s3")
const awsS3Signer = require("@aws-sdk/s3-request-presigner");

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

//Prende dati dal db
const list = async (dati) => {
    //Scuola
    const scuolaQuery = await selezionaScuolaEIDStudenteByMail(dati.email)
    let Codicescuola = scuolaQuery.scuola

    //Seleziona il numero di appunti
    let count = await dataSource
    .createQueryBuilder(Appunti, "appunti")
    .where("appunti.scuola = :scuola", {scuola: Codicescuola})
    if(dati._anno != 'undefined') {count.andWhere("appunti.anno = :anno", {anno: dati._anno})}
    if(dati._materia != 'undefined') {count.andWhere("appunti.materia = :materia", {materia: dati._materia})}
    if(dati._professore != 'undefined') {count.andWhere("appunti.professore = :professore", {professore: dati._professore})}
    let numero = await count.getCount()
    console.log("numero: ", numero)

    let appuntiPerPagina = Number(4)
    let skip = Number(dati.pagina)
    if((skip + appuntiPerPagina) >= numero) {
        appuntiPerPagina = numero - skip
    }

    //dati degli appunti
    let appuntiQuery = await dataSource
    .createQueryBuilder(Appunti, "appunti").limit(appuntiPerPagina).offset(skip)
    .innerJoin("appunti.studente", "studente")
    .select("appunti.ida", "id").addSelect("appunti.materia", "materia").addSelect("appunti.anno", "anno").addSelect("appunti.professore", "professore")
    .addSelect("appunti.argomento", "argomento").addSelect("studente.nome", "nome").addSelect("studente.cognome", "cognome").addSelect("appunti.foto", "foto")
    .where("appunti.scuola = :scuola", {scuola: Codicescuola})
    .orderBy("appunti.dataInserimento", "DESC")
    if(dati._anno != 'undefined') {appuntiQuery.andWhere("appunti.anno = :anno", {anno: dati._anno})}
    if(dati._materia != 'undefined') {appuntiQuery.andWhere("appunti.materia = :materia", {materia: dati._materia})}
    if(dati._professore != 'undefined') {appuntiQuery.andWhere("appunti.professore = :professore", {professore: dati._professore})}
    const appunti = await appuntiQuery.getRawMany()

    //link delle foto
    for (const a of appunti) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: "appunti/" + a.foto
        }
        const command = new awsS3.GetObjectCommand(getObjectParams)
        const url = await awsS3Signer.getSignedUrl(s3, command, { expiresIn: 3600 })
        a.foto = url
    }

    //Filtri disponibili
    let filtri = await dataSource
    .createQueryBuilder()
    .select("materia").addSelect("anno").addSelect("professore", "nominativo")
    .from(Appunti, "appunti")
    .where("appunti.scuola = :scuola", {scuola: Codicescuola})
    .getRawMany()

    return {
        appunti: appunti,
        filtri
    }
}

const studente = async (dati) => {
    //Seleziona il numero di appunti
    let count = await dataSource
    .createQueryBuilder(Appunti, "appunti")
    .where("appunti.studente = :studente", {studente: dati.id})
    let numero = await count.getCount()

    //Offset
    let appuntiPerPagina = Number(2)
    let skip = Number(dati.skip)
    if((skip + appuntiPerPagina) >= numero) {
        appuntiPerPagina = numero - skip
    }

    //dati degli appunti
    let appuntiQuery = await dataSource
    .createQueryBuilder(Appunti, "appunti").limit(appuntiPerPagina).offset(skip)
    .innerJoin("appunti.studente", "studente")
    .select("appunti.ida", "id").addSelect("appunti.materia", "materia").addSelect("appunti.anno", "anno").addSelect("appunti.professore", "professore").addSelect("appunti.argomento", "argomento")
    .addSelect("appunti.foto", "foto").addSelect("studente.nome", "nome").addSelect("studente.cognome", "cognome")
    .where("appunti.studente = :studente", {studente: dati.id})
    .orderBy("appunti.dataInserimento", "DESC")
    .getRawMany()

    //link delle foto
    for (const a of appuntiQuery) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: "appunti/" + a.foto
        }
        const command = new awsS3.GetObjectCommand(getObjectParams)
        const url = await awsS3Signer.getSignedUrl(s3, command, { expiresIn: 3600 })
        a.foto = url
    }

    return appuntiQuery
}

const upload = async (req) => {
    //Estrapola il codice scuola e studente
    const studenteQuery = await selezionaScuolaEIDStudenteByMail(req.body.email)
    let Codicescuola = studenteQuery.scuola
    let codiceStudente = studenteQuery.id
    let appuntiCaricati = studenteQuery.numero

    //Ottiene la data corrente
    let oggi = new Date().toISOString().slice(0, 10)

    //Inserisce i dati degli appunti nel db e prende l'id
    let insertQuery = await dataSource
    .createQueryBuilder()
    .insert()
    .into(Appunti)
    .values({scuola: Codicescuola, studente: codiceStudente, materia: req.body.materia, anno: req.body.anno, argomento: req.body.argomento, professore: req.body.professore,
                datainserimento: oggi, foto: 'temp'})
    .returning("ida")
    .execute()

    //Ricava l'estensione del file e crea il nome con cui inserirlo nel db e su s3.
    let mime = req.file.mimetype //mime pdf: application/pdf, mime foto: image/tipo
    let tipo = "txt"
    if (mime.substring(0, 11) == "application") {
        tipo = mime.substring(12)
    }
    else if (mime.substring(0, 5) == "image") {
        tipo = mime.substring(6)
    }
    let Nomefoto = `appunti_` + insertQuery.raw[0].ida + `.${tipo}`
    
    //Aggiorna la foto sul db
    await dataSource
    .createQueryBuilder()
    .update(Appunti)
    .set({foto: Nomefoto})
    .where("ida = :id", {id: insertQuery.raw[0].ida})
    .execute()

    //Carica la foto in aws s3
    const command = new awsS3.PutObjectCommand({
        Bucket: bucketName,
        Key: "appunti/" + Nomefoto,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })
    await s3.send(command)

    //Aggiorna il conteggio appunti studente
    await dataSource
    .createQueryBuilder()
    .update(Studente)
    .set({appunticaricati: appuntiCaricati + 1})
    .where("ids = :id", {id: codiceStudente})
    .execute()

    return "Appunto caricato con successo"
}

const remove = async (dati) => {
    //Seleziona l'utente che ha caricato l'appunto da eliminare e il nome della foto
    let appuntiQuery = await dataSource
    .createQueryBuilder()
    .select("studente").addSelect("foto")
    .from(Appunti, "appunti")
    .where("appunti.ida = :id", {id: dati._id})
    .getRawOne()

    //Seleziona l'utente che appartiene alla email inviata
    let idStudente = await selezionaScuolaEIDStudenteByMail(dati.email)

    //Controlla che l'appunto appartenga all'utente
    if (appuntiQuery.studente != idStudente.id) {
        return "L'appunto da eliminare non appartiene all'utente"
    }

    //Elimina l'appunto
    await dataSource
    .createQueryBuilder()
    .delete()
    .from(Appunti)
    .where("ida = :id", {id: dati._id})
    .execute()

    var dati = `{"nomeImmagine":"appunti/${appuntiQuery.foto}"}`
    var risposta = JSON.parse(dati)

    return risposta
}

async function selezionaScuolaEIDStudenteByMail(email) {
    const query = await dataSource
    .createQueryBuilder()
    .select("scuola").addSelect("ids", "id").addSelect("appunticaricati", "numero")
    .from(Studente, "studente")
    .where("studente.email = :email", {email: email})
    .getRawOne()

    return query
}

module.exports = { list, studente, upload, remove }