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
    axios.post(process.env.WEBHOOK_URL, {
        username: process.env.WEBHOOK_NAME, 
        avatar_url: process.env.WEBHOOK_PIC, 
        embeds: [
            {
                "type": "rich",
                "title": `${email['subject']}`,
                "description": `
                From: ${email['from']}\nDate: ${JSON.parse(JSON.stringify(email['headers']))['Date']}\nSPF: ${email['SPF']}\n\n${email['text']}
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
app.post('/uploadingpush', upload.none(),  (req, res, next) => {
	if (JSON.parse(JSON.stringify(req.body))['to'].includes("codecollab@sendgrid.thinkerpal.me")) {
		receivedEmail(req.body)
	}
});
const server = app.listen(5000,'0.0.0.0');
