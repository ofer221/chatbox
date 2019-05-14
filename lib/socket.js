const redisClient = require('./redis')
const dbFunctions = require('./dbFunctions')
let io

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer)

    io.on('connection', socket => {
      console.log('Socket client connected')

      socket.on('logged_in', (data) => {
        socket.username = data.username
        redisClient.getSubscibClient().subscribe('users')
        redisClient.getSubscibClient().subscribe(data.username)
      })

      redisClient.getSubscibClient().on('message', (channel, message) => {

        if (channel === 'users') {
          socket.emit('users', message)
        }
        else if (channel === socket.username) {
          socket.emit('new_message', message)
        }
      })
      socket.on('logout', () => {
        socket.disconnect()
      })
      socket.on('disconnect', () => {
        console.log('disconnected', socket.username)
        if (socket.username) redisClient.srem('users', socket.username).then(() => {
          redisClient.smembers('users').then(res => {
            redisClient.publish('users', JSON.stringify(res))
          })
        }).catch(err => {
          console.log(err)
        })

      })
      socket.on('msg', async (data) => {

        let message = JSON.stringify({from: data.from, to: data.to, content: data.content, time: data.time})
        let messageTo = JSON.stringify(data.to)
        try {

          await redisClient.lpush(messageTo, message)
          await redisClient.publish(data.to, message)
        }
        catch (e) {
          console.log(e)
        }

      })
    })

  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized')
    }
    return io
  },
  handler: (socket) => {
    console.log('Socket client connected')

    socket.on('logged_in', async (data) => {
      try {
        await  dbFunctions.dbSubscriptions(data.username)
        socket.username = data.username
      }catch (err) {
        console.log(err)
      }

      // redisClient.getSubscibClient().subscribe('users')
      // redisClient.getSubscibClient().subscribe(data.username)
    })

    redisClient.getSubscibClient().on('message', (channel, message) => {

      if (channel === 'users') {
        socket.emit('users', message)
      }
      else if (channel === socket.username) {
        socket.emit('new_message', message)
      }
    })
    socket.on('logout', () => {
      socket.disconnect()
    })
    socket.on('disconnect', async () => {
      try {
        console.log('disconnected', socket.username)
        await  dbFunctions.disconnectUser(socket.username)
      }catch (err) {
        console.log(err)
      }

      // if (socket.username) redisClient.srem('users', socket.username).then(() => {
      //   redisClient.smembers('users').then(res => {
      //     redisClient.publish('users', JSON.stringify(res))
      //   })
      // }).catch(err => {
      //   console.log(err)
      // })

    })
    socket.on('msg', async (data) => {
      //let messageTo = JSON.stringify(data.to)
      try {
        let message = JSON.stringify({from: data.from, to: data.to, content: data.content, time: data.time})
        await dbFunctions.addMessage(data.to, message)
        // await redisClient.lpush(messageTo, message)
        // await redisClient.publish(data.to, message)
      }
      catch (err) {
        console.log(err)

      }

    })
  }
}
