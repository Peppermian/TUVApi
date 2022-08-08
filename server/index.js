const process = require('process')
const got = require('got')
const { JSDOM } = require("jsdom")
const TUVtools = require("./src/tuvtools.js")

const express = require('express')
const router = require('./routes/tuvcertificates.js')
tuvcertRouter = require('./routes/tuvcertificates.js')

const app = express(); 

<<<<<<< Updated upstream
process.on('SIGINT', () => {
    console.log("Recieved signal 'SIGINT'. Exiting...\n")
    process.exit();
})

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/tuvcert/:id', (req, res) => {

    const url = 'https://www.certipedia.com/quality_marks/' + req.params.id; //get correct url for certipedia

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const contact = TUVtools.parseContact(dom)
        const name = TUVtools.parseCompanyName(dom)

        res.json({ "values" : [name, contact[0], contact[1], contact[2]] })

    }).catch(err => {
        console.log(err)
        res.sendStatus(404)
    });

});
=======
//set headers before mounting routers
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/tuvcertificates', tuvcertRouter)
>>>>>>> Stashed changes

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`\nApp listening on http://localhost:${port}/`))