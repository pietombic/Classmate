const express = require("express")
const server = express()
const cors = require("cors")

//iniziallizza il router
const accountRouter = require("./router/account")

//Per gestire il JSON
server.use(express.json())

//Enable CORS
server.use(cors())
server.options('*', cors())

//usa il router per le richieste a /appunti
server.use("/api", accountRouter)

server.listen(3003, () => console.log('Account up and running.'))