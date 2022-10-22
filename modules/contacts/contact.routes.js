
var express = require('express');
const contactsController = require('./contacts.controller');

var router = express.Router();

router.post('/', contactsController.addContact)
router.put('/', contactsController.updateContact)
// router.put('/blog', contactsController.updateBlogImage)
router.get('/', contactsController.getContact)
router.get('/contacts', contactsController.getContacts)


module.exports = router;
