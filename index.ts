import express from 'express';
import cors from 'cors'
import Routes from './src/router'

const app = express()
const port = 5000

app.get( '/', ( req, res ) => {
  res.send('Hello World!')
})

app.use('/', Routes)
app.use(cors)

app.listen(port, () => {
  console.log(`Backend Test app listening on port ${port}`)
})

