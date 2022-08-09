const got = require('got')
const { JSDOM } = require("jsdom")
const TUVtools = require("../src/tuvtools.js")

const express = require('express')
const router = express.Router()

//base endpoint for redirecting based on ID type
router.get('/:id', (req, res) => {

    if( TUVtools.certIdToType(req.params.id) == "system"){
        res.redirect('/tuvcertificates/system/' + encodeURIComponent(req.params.id))
    }
    else if (TUVtools.certIdToType(req.params.id) == "product") {
        res.redirect('/tuvcertificates/product/' + encodeURIComponent(req.params.id))
    }
    else{
        res.status(404).json({"values": null, "scope" : null})
    }

});

//product ID endpoint
router.get('/product/:id', (req, res) => {

    const url = 'https://www.certipedia.com/quality_marks/' + encodeURIComponent(req.params.id)

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const contact = TUVtools.parseProdCertContact(dom)
        const name = TUVtools.parseProdCertName(dom)

        res.json({ "values" : [name, contact[0], contact[1], contact[2]]})

    }).catch(err => {
        console.log(err)
        res.status(404).json({ "values" : null, "scope" : null })
    });

});

//system ID endpoint
router.get('/system/:id', (req, res) => {
    
    const url = 'https://www.certipedia.com/certificates/' + encodeURIComponent(req.params.id)

    got(url).then(response => {

        console.log(response.statusCode)

        const dom = new JSDOM(response.body)
        const info = TUVtools.parseSystemCertInfo(dom)

        res.json(info)

    }).catch(err => {
        console.log(err)
        res.status(404).json({ "values" : null, "scope" : null})
    });

});

module.exports = router
