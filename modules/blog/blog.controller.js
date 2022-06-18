const blogService = require('./blog.services');
const { prepareAndSendResponse } = require('../../utils');

const addBlog = async (req, res) => {
	try {
		await blogService.addBlog(req, res);
		return prepareAndSendResponse(res, 200, null, 'Blog added successfully')
	} catch (e) {
		console.log(e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const updateBlog = async (req, res) => {
	try {
		await blogService.updateBlog(req, res);
		return prepareAndSendResponse(res, 200, null, 'Blog updated successfully')
	} catch (e) {
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const getBlog = async (req, res) => {
	try {
		const data = await blogService.getBlog(req, res);
		console.log("data", data)
		return prepareAndSendResponse(res, 200, data, 'Get blog detail successfully')
	} catch (e) {
		console.log("e", e)
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

const getBlogs = async (req, res) => {
	try {
		const data = await blogService.getBlogs(req, res);
		console.log("data", data)
		return prepareAndSendResponse(res, 200, data, 'Get blogs successfully')
	} catch (e) {
		return prepareAndSendResponse(res, 500, null, 'Something went wrong')
	}
}

module.exports = {
	addBlog,
	updateBlog,
	getBlog,
	getBlogs
}