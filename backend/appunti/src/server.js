const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const appuntiRouter = require("./router/appunti")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors());

//usa il router per le richieste a /appunti
server.use("/api", appuntiRouter)

server.listen(3001, () => console.log('Appunti up and running.'))