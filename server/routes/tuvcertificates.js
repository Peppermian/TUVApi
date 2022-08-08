const got = require('got')
const { JSDOM } = require("jsdom")
const TUVtools = require("../src/tuvtools.js")

const express = require('express')
const { application } = require('express')
const router = express.Router()

router.get('/product/:id', (req, res) => {

    const url = 'https://www.certipedia.com/quality_marks/' + req.params.id //get correct url for certipedia

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const contact = TUVtools.parseContact(dom)
        const name = TUVtools.parseCompanyName(dom)

        res.json({ "values" : [name, contact[0], contact[1], contact[2]] })

    }).catch(err => {
        console.log(err)
        res.status(500).json({ "values" : ["", "", "", ""] })
    });

});

router.get('/system/:id', (req, res) => {

    const url = 'https://www.certipedia.com/certificates/' + req.params.id.replace(/ /g, '+')

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const contact = TUVtools.parseCertHolderAddr(dom)

        res.json(contact)

    }).catch(err => {
        console.log(err)
        res.status(500).json({ "values" : ["", "", "", ""] })
    });

});

module.exports = router