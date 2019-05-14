const express = require('express')
const redisClient = require('./lib/redis')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const messagesRoutes = require('./routes/messages')
const socketHandler = require('./lib/socket').handler

const app = express()
const server = require('http').Server(app)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`)
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  next()
})

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/messages', messagesRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const data = error.data
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({message: message, data: data})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

server.listen(port)
redisClient.connect()
const io = require('socket.io')(server)

io.on('connection', socket => {socketHandler(socket)})

console.log(`server listening on port: ${port}`)


