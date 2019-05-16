const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    let decodedToken
    try {
      const token = authHeader.split(' ')[1]
      decodedToken =  jwt.verify(token, 'secretstring')
    }
    catch (err) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }
    next()
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
