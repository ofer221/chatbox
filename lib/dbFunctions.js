const redisClient = require('./redis')

exports.userExist = async (username) => {
  try {
    const replay = await redisClient.hexists(username, 'username')
    return replay
  } catch (err) {
    console.log(err)
  }

}
exports.addUser = async (username, hashedPassword) => {
  try {
    const reply = await redisClient.hmset(username, [
      'username', username,
      'password', hashedPassword,
    ])
    return reply
  } catch (err) {
    console.log(err)
  }

}
exports.getHashedPass = async (username) => {
  try {
    const reply = await redisClient.hget(username, 'password')
    return reply
  } catch (err) {
    console.log(err)
  }

}
exports.addOnlineUser = async (username) => {
  try {
    await redisClient.sadd('users', username)
    let users = await redisClient.smembers('users')
    await redisClient.publish('users', JSON.stringify(users))
    return users
  } catch (err) {
    console.log(err)
  }

}
exports.getMessages = async (username) => {
  try {
    let messages = await redisClient.lrange(username, 0, -1)
    return messages
  } catch (err) {
    console.log(err)
  }

}
exports.getUsers = async () => {
  try {
    let users = await redisClient.smembers('users')
    return users
  } catch (err) {
    console.log(err)
  }

}
exports.disconnectUser = async (username) => {
  try {
    await redisClient.srem('users', username)
    const newUsers = await redisClient.smembers('users')
    await redisClient.publish('users', JSON.stringify(newUsers))
    return true
  } catch (err) {
    console.log(err)
  }
}
exports.addMessage = async (messageTo, message) => {
  try {

    await redisClient.lpush(JSON.stringify(messageTo), message)
    await redisClient.publish(messageTo, message)
    return true
  } catch (err) {
    console.log(err)
  }

}
exports.dbSubscriptions = async (username) => {
  try {
    redisClient.getSubscibClient().subscribe('users')
    redisClient.getSubscibClient().subscribe(username)
    return true
  } catch (err) {
    console.log(err)
  }

}
