const awsS3 = require("@aws-sdk/client-s3")
require('dotenv').config()

//Credenziali aws
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION

//Inizializza l'oggetto bucket
const s3 = new awsS3.S3Client({region: bucketRegion});

const remove = async(dati) => {
    if (dati.daEliminare == false) {
        return "Account aggiornato con successo"
    }

    const command = new awsS3.DeleteObjectCommand({
        Bucket: bucketName,
        Key: dati.nomeFoto
    })
    
    await s3.send(command)
    return "Account aggiornato con successo"
}

module.exports = { remove }