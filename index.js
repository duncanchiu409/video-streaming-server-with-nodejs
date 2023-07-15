const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

const CHUNK_SIZE = 10 ** 6

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/video', (req, res) => {
    const range = req.headers.range
    if(range === undefined){
        res.status(400).send('Require range in headers')
    }
    else{
        const videoPath = 'pexels_videos_2282013 (2160p).mp4'
        const videoSize = fs.statSync(videoPath).size

        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + CHUNK_SIZE , videoSize - 1)

        const contentLength = end - start + 1

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4'
        }

        res.writeHead(206, headers)
        const videoStream = fs.createReadStream(videoPath, {start:start, end:end})
        videoStream.pipe(res)
    }
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})
