const express = require('express')
const messagesController = require('../controllers/messages')
const isAuth = require('../middleware/is-auth')



const router = express.Router()
router.get('/:username/:targetname',isAuth, messagesController.getMessages);



module.exports = router
