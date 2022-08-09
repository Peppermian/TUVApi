const express = require('express')
tuvcertRouter = require('./routes/tuvcertificates.js')

const app = express(); 

//set headers before mounting routers
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/tuvcertificates', tuvcertRouter)

const port = 4000
app.listen(port, () => console.log(`\nApp listening on http://localhost:${port}/`))