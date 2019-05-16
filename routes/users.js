const express = require('express')
const usersController = require('../controllers/users')
const isAuth = require('../middleware/is-auth')


const router = express.Router()
router.get('/userslist',isAuth, usersController.getUsers);



module.exports = router
