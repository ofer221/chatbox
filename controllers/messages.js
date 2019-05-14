const redisClient = require('../lib/redis')
const dbFunctions = require('../lib/dbFunctions')


exports.getMessages = async (req, res, next) => {
  const msgData = req.params;

  try {
    let messages = await dbFunctions.getMessages(msgData.username)

    if (!messages){
      const error = new Error('no messages')
      error.statusCode = 422
      throw error
    }
    res.status(200).json({messages: messages})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}




