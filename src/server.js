import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('logging')
  req.myData = 'hello'
  next()
}
router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

// cats
const routes = [
  'get /cat',
  'get /cat:id',
  'post /cat',
  'put /cat/:id',
  'delete /cat/:id'
]
router
  .route('/cat')
  .get()
  .post()
app.use('/api', router)

app.get('/', log, (req, res, next) => {
  // res.send({ data: 1 })
  next()
})

app.get('/', log, (req, res) => {
  res.send({ data: 2 })
})

app.put('/data', (req, res) => {})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})
export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
