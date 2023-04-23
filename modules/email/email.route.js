
var express = require('express');
const emailController = require('./email.controller');

var router = express.Router();

router.post('/', emailController.sendMail)



module.exports = router;
