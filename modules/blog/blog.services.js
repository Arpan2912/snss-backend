const blogDbService = require('./blog.db.services');
const { BUCKET_NAME } = process.env;
const bucketUrl = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com`;

const addBlog = async (req, res) => {
	console.log("req.biody", req.body);
	console.log("req.file", req.file);
	const posterImage = req.file.key;
	const { title, content, description, category = null } = req.body;
	const obj = {
		poster_image: posterImage,
		title,
		content,
		description,
		category
	}
	await blogDbService.addBlog(obj)
}

const updateBlog = async (req, res) => {
	const { uuid, content, title, description, poster_image, category } = req.body;
	let posterImage = null;
	if (req.file) {
		posterImage = req.file.key;
	}
	console.log("uuid", uuid)
	console.log(" req.body", req.body)
	const obj = {
		uuid,
		updated_at: new Date().toISOString()
	}
	if (posterImage) {
		obj.poster_image = posterImage;
	}
	if (content) {
		obj.content = content;
	}
	if (title) {
		obj.title = title;
	}
	if (description) {
		obj.description = description;
	}
	if (category) {
		obj.category = category;
	}
	await blogDbService.updateBlog(obj)
}

const getBlogs = async (req, res) => {
	const { page = 1, limit = 6, search = null } = req.query;

	const replacements = {
		offset: (+page - 1) * +limit,
		limit
	}
	if (search) {
		replacements.search = search;
	}
	const data = await blogDbService.getBlogs(replacements)
	console.log("Data", data);
	const responseObj = {
		bucketUrl,
		blogs: data[0]
	}
	return responseObj;
}

const getBlog = async (req, res) => {
	const { uuid } = req.query;
	const replacements = {
		uuid
	}
	const data = await blogDbService.getBlogDetail(replacements)
	console.log("blog detail", data)
	const responseObj = {
		bucketUrl,
		blog: data && data[0] && data[0][0] ? data[0][0] : null
	}
	return responseObj;
}

module.exports = {
	addBlog,
	updateBlog,
	getBlog,
	getBlogs
}