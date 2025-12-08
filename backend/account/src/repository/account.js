//Typeorm and entities import
const Studente = require("../entities/Studente");
const Materia = require("../entities/Materia");
const Scuola = require("./../entities/Scuola");
const Professore = require("./../entities/Professore");
var typeorm = require("typeorm")

//aws s3 imports
const awsS3 = require("@aws-sdk/client-s3")
const awsS3Signer = require("@aws-sdk/s3-request-presigner")

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
const view = async (dati) => {
    var response = {}
    var datiAccount = {}
    var opzioni = {}
    
    //Ottiene i dati dell'account
    let accountQuery = await ottieneDatiStudenteByMail(dati.email)

    //Ottiene la foto profilo
    const getObjectParams = {
        Bucket: bucketName,
        Key: "profiles/" + accountQuery.foto
    }
    const command = new awsS3.GetObjectCommand(getObjectParams)
    const linkFoto = await awsS3Signer.getSignedUrl(s3, command, { expiresIn: 3600 })
    accountQuery.foto = linkFoto

    datiAccount = accountQuery
    response.account = datiAccount

    //Materie
    let materieQuery = await dataSource
    .createQueryBuilder()
    .select("nome")
    .from(Materia, "materia")
    .where("materia.scuola = :scuola", {scuola: accountQuery.scuola})
    .getRawMany()

    opzioni.materie = materieQuery

    //Anni
    let anniQuery = await dataSource
    .createQueryBuilder()
    .select("anni", "annoMax")
    .from(Scuola, "scuola")
    .where("scuola.codice = :codice", {codice: accountQuery.scuola})
    .getRawMany()

    opzioni.annoMax = anniQuery

    //Professori
    let professoriQuery = await dataSource
    .createQueryBuilder()
    .select("nominativo")
    .from(Professore, "professore")
    .where("professore.scuola = :scuola", {scuola: accountQuery.scuola})
    .getRawMany()

    opzioni.professori = professoriQuery

    response.opzioni = opzioni
    return response
}

const edit = async (req) => {
    var update = {}
    var daEliminare = false

    //ottiene l'id dello studente e il nome della foto profilo
    let studenteQuery = await ottieneDatiStudenteByMail(req.body.email)

    //Inserisce i nuovi dati se sono definiti
    if (req.body.biografia != 'undefined') {
        update.biografia = req.body.biografia
    }
    if (req.file != undefined) {
        //Ricava l'estensione del file e crea il nome con cui inserirlo nel db e su s3.
        let mime = req.file.mimetype
        let tipo = mime.substring(6)
        update.fotoprofilo = `${studenteQuery.id}_profile_pic.${tipo}`

        if (studenteQuery.foto != update.fotoprofilo) {
            daEliminare = true
        }

        //carica la foto profilo in s3
        const command = new awsS3.PutObjectCommand({
            Bucket: bucketName,
            Key: "profiles/" + update.fotoprofilo,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        })

        await s3.send(command)
    }

    //Update
    await dataSource
    .createQueryBuilder()
    .update(Studente)
    .set(update)
    .where("ids = :id", {id: studenteQuery.id})
    .execute()
    
    var dati = `{"daEliminare":${daEliminare}, "nomeFoto":"profiles/${studenteQuery.foto}"}`
    var risposta = JSON.parse(dati);
    return risposta
}

async function ottieneDatiStudenteByMail(email) {
    const query = await dataSource
    .createQueryBuilder()
    .select("fotoprofilo", "foto").addSelect("biografia").addSelect("classe").addSelect("nome").addSelect("cognome").addSelect("appunticaricati", "numeroAppuntiCaricati")
    .addSelect("ids", "id").addSelect("scuola").addSelect("cellulare")
    .from(Studente, "studente")
    .where("studente.email = :email", {email: email})
    .getRawOne()

    return query
}

module.exports = { view, edit }