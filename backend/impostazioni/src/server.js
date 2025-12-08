const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const impostazioniRouter = require("./router/impostazioni")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors())

//usa il router per le richieste a /appunti
server.use("/api", impostazioniRouter)

server.listen(3006, () => console.log('Impostazioni up and running.'))