const express = require('express')
const server = express()
const firebase= require('firebase-admin');
const fs = require('fs');
const httpProxy = require('express-http-proxy')
require("dotenv").config()
const cors = require('cors')

const serviceAccount = require(`${__dirname}/config/firebase_service_account.json`);

// Initialize Firebase package with service account authentication
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

server.use(cors())
server.options('*', cors());

// -- Authenticate the incoming request using Google Firebase Authentication service
server.use(async (req, res, next) => {
    console.log('Checking authentication ...')

    // Block the request without spending time to validate an empty token
    if(!req.headers.authorization){
        return res.status(401).json({error: 'Please, send authentication header.'})
    }

    try{
        // verify the given token: if valid the return value will be the logged user
        const authResult = await firebase.auth().verifyIdToken(req.headers.authorization.replace("Bearer ", ""))

        // If all went correctly print something to celebrate the event and enrich the request with auth data
        console.log(`Utente loggato: ${authResult.email}`)

        next()
    }catch(e){
        console.log(e)
        return res.status(401).json({error: `Unauthorized`})
    }
})

const hostsConfig = fs.readFileSync(`${__dirname}/config/hosts.json`)
const hosts = JSON.parse(hostsConfig.toString())

for (const host of hosts) {

    const proxyRoute = `http://${host.domain}:${host.port}/api/${host.prefix}`
    const postServiceProxy = httpProxy(proxyRoute)

    console.log(`Setting up route: ${proxyRoute}`)

    // Proxy request
    server.all(`/api/${host.prefix}*`, (req, res, next) => {
        postServiceProxy(req, res, next)
    })
}

server.listen(3000, () => console.log('Gateway up and running.'))