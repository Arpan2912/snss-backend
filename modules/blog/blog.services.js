const blogDbService = require('./blog.db.services');
const bucketUrl = `https://arpan-first-bucket.s3.ap-south-1.amazonaws.com`;

const addBlog = async (req, res) => {
	console.log("req.biody", req.body);
	console.log("req.file", req.file);
	const posterImage = req.file.key;
	const { title, content, description } = req.body;
	const obj = {
		poster_image: posterImage,
		title,
		content,
		description
	}
	await blogDbService.addBlog(obj)
}

const updateBlog = async (req, res) => {
	const { uuid, content, title, description, poster_image } = req.body;
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
	const data = blogDbService.getBlogDetail(replacements)
	const responseObj = {
		bucketUrl,
		blog: data[0]
	}
	return responseObj;
}

module.exports = {
	addBlog,
	updateBlog,
	getBlog,
	getBlogs
}