const dbFunctions = require('../lib/dbFunctions')


exports.getMessages = async (req, res, next) => {
  const msgData = req.params;
  let messages = []
  try {
    messages = await dbFunctions.getMessages(msgData.username,msgData.targetname)
    console.log(messages)
    if (!messages){
      const error = new Error('no messages')
      error.statusCode = 422
      throw error
    }
    //   let ll = JSON.stringify(messages)
    res.status(200).json({messages: messages})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}




