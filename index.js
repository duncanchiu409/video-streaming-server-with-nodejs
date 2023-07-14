const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})
