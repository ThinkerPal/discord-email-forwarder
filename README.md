# Discord Email Forwarder

(Note: This is just a rough README so I apologise for missing information for the time being)

This runs a express webserver that listens for POST requests and forwards it to a Discord channel via a webhook.

Emails are currently sent to the webhook via ImprovMX (because that happens to be what I'm using)

## Prerequisites:
- NodeJS

## Installing
1. Install the required packages with `npm install`
2. Rename `sample.env` to `.env` and fill in the respective variables

## Running
A simple `node emailForwarder.js` will suffice. Alternatively, you could look into using `pm2` to configure this to run on start when your server/machine boots up

## "Tech Debt"
This is kinda my first javascript project from scratch, so I apologise if everything is all over the place (eg. normal JS imports vs ES6 imports) 
