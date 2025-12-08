const awsS3 = require("@aws-sdk/client-s3")
require('dotenv').config()

//Credenziali aws
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION

//Inizializza l'oggetto bucket
const s3 = new awsS3.S3Client({region: bucketRegion});

const remove = async (dati) => {
    //Elimina la foto da AWS s3
    const params = {
        Bucket: bucketName,
        Key: dati.nomeImmagine
    }

    const command = new awsS3.DeleteObjectCommand(params)
    await s3.send(command)

    return "Appunto eliminato con successo"
}

module.exports = { remove }