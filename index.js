const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/video', (req, res) => {
    const range = req.headers.range
    if(range === undefined){
        res.status(400).send('Require range in headers')
    }
    else{
        const videoSize = fs.statSync('pexels_videos_2282013 (2160p).mp4').size
        res.send('Video size: ' + videoSize.toString())
    }
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})
