const dbFunctions = require('../lib/dbFunctions')

exports.getUsers = async (req, res, next) => {
  try {

    let users = await dbFunctions.getUsers()
    if (!users) {
      const error = new Error('No connected users')
      error.statusCode = 422
      throw error
    }
    console.log("sending users",users)
    res.status(200).json({users: users})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

