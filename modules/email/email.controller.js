const emailService = require('./email.service');
const { prepareAndSendResponse } = require('../../utils');

const sentMail = async (req, res) => {
	try {
		await emailService.sentMail(req, res);
		return prepareAndSendResponse(res, 200, null, 'Contact added successfully')
	} catch (e) {
		console.log(e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}



module.exports = {
	sentMail
}