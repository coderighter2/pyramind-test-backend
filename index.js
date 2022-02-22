const express = require('express')
const app = express()
const port = 3000

const router = require('./src/router')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Backend Test app listening on port ${port}`)
})

