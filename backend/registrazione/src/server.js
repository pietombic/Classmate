const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const registrazioneRouter = require("./router/registrazione")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors())

//usa il router per le richieste a /appunti
server.use("/api", registrazioneRouter)

server.listen(3002, () => console.log('Registrazione up and running.'))