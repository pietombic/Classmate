const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const eventiRouter = require("./router/eventi")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors())

//usa il router per le richieste a /appunti
server.use("/api", eventiRouter)

server.listen(3005, () => console.log('Eventi up and running.'))