const got = require('got')
const { JSDOM } = require("jsdom")
const TUVtools = require("../src/tuvtools.js")

const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {

    if( TUVtools.certIdToType(req.params.id) == "system"){
        res.redirect('/tuvcertificates/system/' + req.params.id)
    }
    else if (TUVtools.certIdToType(req.params.id) == "product") {
        res.redirect('/tuvcertificates/product/' + req.params.id)
    }

});

router.get('/product/:id', (req, res) => {

    const url = 'https://www.certipedia.com/quality_marks/' + encodeURIComponent(req.params.id)

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
    
    const url = 'https://www.certipedia.com/certificates/' + encodeURIComponent(req.params.id)

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const contact = TUVtools.parseCertHolderAddr(dom)

        res.json(contact)

    }).catch(err => {
        console.log(err)
        res.status(500).json({ "values" : ["-", "-", "-", "-"] })
    });

});

module.exports = router
