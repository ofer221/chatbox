const redisClient = require('./redis')
const dbFunctions = require('./dbFunctions')

module.exports = {
  handler: (socket) => {
    console.log('Socket client connected')

    socket.on('logged_in', async (data) => {
      try {
        await dbFunctions.dbSubscriptions(data.username)
        socket.username = data.username
      } catch (err) {
        console.log(err)
      }

    })

    redisClient.getSubscibClient().on('message', (channel, message) => {

      if (channel === 'users') {
        socket.emit('users', message)
      }
      else if (channel === socket.username) {
        socket.emit('new_message', message)
      }
    })
    socket.on('logout', async () => {
      try {
        await dbFunctions.disconnectUser(socket.username)
        socket.disconnect()
      }
      catch (e) {
        console.log(e)
      }
    })
    socket.on('disconnect', async () => {
      try {
        console.log('disconnected', socket.username)
        await dbFunctions.disconnectUser(socket.username)
      } catch (err) {
        console.log(err)
      }
    })
    socket.on('msg', async (data) => {

      try {
        let message = {from: data.from, to: data.to, content: data.content, time: data.time}
        await dbFunctions.addMessage(data.to, message)
      }
      catch (err) {
        console.log(err)
      }
    })
  }
}
