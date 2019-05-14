const express = require('express')
const usersController = require('../controllers/users')



const router = express.Router()
router.get('/userslist', usersController.getUsers);



module.exports = router
