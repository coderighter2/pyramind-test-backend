const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

const router = require('./src/router')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use('/', router)

app.listen(port, () => {
  console.log(`Backend Test app listening on port ${port}`)
})

