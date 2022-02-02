const axios = require('axios')
const express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const app = express()
const upload = multer()

app.use(express.json())
dotenv.config()

function receivedEmail(email) {
	email = JSON.parse(JSON.stringify((email)))
    let date = ""
    // determine date of email 
    let arrHeaders = email.headers.split("\n")
    for (let i=0; i<arrHeaders.length; i++){
        if (arrHeaders[i].match("Date:.")){
            date=arrHeaders[i]
        } 
    }
    let msgLength = 2000-(email.from.length+20+email.headers.split('\n')[10].length) // gets past Discord's 2000 character text limit
    axios.post(process.env.WEBHOOK_PROD_URL, { // Posts the actual embed
        username: process.env.WEBHOOK_NAME, 
        avatar_url: process.env.WEBHOOK_PIC, 
        embeds: [
            {
                "type": "rich",
                "title": `${email['subject']}`,
                "description": `
                From: ${email['from']}\n${date}\n-------------------------------------------------\n\n${email['text'].substring(0,msgLength)}
                `,
                "color": 0x00FFFF
            }
        ]
    }).then(res => {
        console.log(`statusCode: ${res.status}`)
    })
        .catch(error => {
            console.error(error)
        })
}
console.log("App running!")
let counter = 0

app.post(process.env.INC_WEBHOOK_ENDPOINT, upload.none(),  (req, res, next) => {
    console.log("Someone Posted!")
	if (JSON.parse(JSON.stringify(req.body))['to'].includes(process.env.CONTACT_EMAIL)) {
        counter++
        console.log(`${counter}th Email processed`)
        receivedEmail(req.body)
        console.log("\n")
        res.status(200).end()
	}else {
        console.log(req.body)
        res.status(200).end()
    }
});
const server = app.listen(5000,'0.0.0.0');
