const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dbFunctions = require('../lib/dbFunctions')
exports.signup = async (req, res, next) => {
  const username = req.body.name
  const password = req.body.password
  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const userExist = await dbFunctions.userExist(username)
    if (userExist === 1) {
      const error = new Error('User already exist')
      error.statusCode = 422
      throw error
    }
    if (userExist === 0) {
      await dbFunctions.addUser(username, hashedPassword)

      res.status(201).json({message: 'User created', username: username})
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const username = req.body.name
  const password = req.body.password
  try {
    const hashedPassword = await dbFunctions.getHashedPass(username)
    if (!hashedPassword) {
      const error = new Error('Unable to find user')
      error.statusCode = 422
      throw error
    }
    const isEqual = await bcrypt.compare(password, hashedPassword)
    if (!isEqual) {
      const error = new Error('Wrong password')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign({
      username: username
    }, 'secretstring', {expiresIn: '1h'})
    const users = await dbFunctions.addOnlineUser(username)

    res.status(200).json({token: token, username: username, users: users})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.autoLogin = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  try {
    if (!authHeader) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
      decodedToken = jwt.verify(token, 'secretstring')
    }
    catch (err) {
      err.statusCode = 500
      throw err
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }
    const users = await dbFunctions.addOnlineUser(decodedToken.username)

    res.status(200).json({username: decodedToken.username, users: users})
  } catch (err) {
    next(err)
  }
}


