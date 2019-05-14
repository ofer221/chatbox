const dbFunctions = require('../lib/dbFunctions')

exports.getUsers = async (req, res, next) => {
  try {
    dbFunctions.getUsers()
    let users = await dbFunctions.getUsers()
    if (!users) {
      const error = new Error('No connected users')
      error.statusCode = 422
      throw error
    }

    res.status(200).json({users: users})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

