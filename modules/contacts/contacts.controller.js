const contactService = require('./contacts.services');
const { prepareAndSendResponse } = require('../../utils');

const addContact = async (req, res) => {
	try {
		await contactService.addContactApi(req, res);
		return prepareAndSendResponse(res, 200, null, 'Contact added successfully')
	} catch (e) {
		console.log(e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const updateContact = async (req, res) => {
	try {
		await contactService.updateContact(req, res);
		return prepareAndSendResponse(res, 200, null, 'Contact updated successfully')
	} catch (e) {
		console.log("e", e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const getContact = async (req, res) => {
	try {
		const data = await contactService.getContact(req, res);
		console.log("data", data)
		return prepareAndSendResponse(res, 200, data, 'Get Contact detail successfully')
	} catch (e) {
		console.log("e", e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const getContacts = async (req, res) => {
	try {
		const data = await contactService.getContacts(req, res);
		console.log("data", data)
		return prepareAndSendResponse(res, 200, data, 'Get Contacts successfully')
	} catch (e) {
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

module.exports = {
	addContact,
	updateContact,
	getContact,
	getContacts
}