const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const scuolaRouter = require("./router/scuola")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors())

//usa il router per le richieste a /appunti
server.use("/api", scuolaRouter)

server.listen(3004, () => console.log('Scuola up and running.'))