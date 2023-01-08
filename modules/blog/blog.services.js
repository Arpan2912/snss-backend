const blogDbService = require('./blog.db.services');
const blogAttachmentDbService = require('./blog-attachment.db.service');
const { BUCKET_NAME } = process.env;
const bucketUrl = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com`;

const addBlog = async (req, res) => {
	// console.log("req.biody", req.body);
	console.log("req.file", req.files);
	let posterImage = null;
	if (req.files && req.files.image && req.files.image[0]) {
		posterImage = req.files.image[0].key;
	}
	// console.log("req", req);
	const { title, content, description, category = null, subCategory, createdBy, createdByEmail, isPublished = false, type } = req.body;
	const obj = {
		poster_image: posterImage,
		title,
		content,
		description,
		category,
		type,
		sub_category: subCategory,
		created_by: createdBy,
		created_by_email: createdByEmail,
		is_published: isPublished
	}
	const response = await blogDbService.addBlog(obj)
	const blogId = response[0][0].id;
	if (req.files && req.files.attachment) {
		const attachments = req.files.attachment;
		for (let i = 0; i < attachments.length; i++) {
			const attachment = attachments[i];
			if (attachment) {
				const blogAttachmentObj = {
					blog_id: blogId,
					attachment: attachment.key,
					attachment_mimetype: attachment.mimetype,
					attachment_size: attachment.size
				}
				await blogAttachmentDbService.addBlogAttachment(blogAttachmentObj);
			}
		}
	}
}

const updateBlog = async (req, res) => {
	const { uuid, content, title, description, category, subCategory, createdBy, createdByEmail, deletedAttachments, type } = req.body;
	let { isPublished = null, isDeleted = null } = req.body;

	const replacements = {
		uuid
	}
	const data = await blogDbService.getBlogDetail(replacements)
	console.log("blog detail", data)
	if (data && data[0] && data[0][0]) {
		const blogDetail = await data[0][0];
		let posterImage = null;
		if (req.files && req.files.image && req.files.image[0]) {
			posterImage = req.files.image[0].key;
		}
		console.log("uuid", uuid)
		console.log(" req.body", req.body)

		if (deletedAttachments) {
			const uuids = deletedAttachments.split(',');
			for (let i = 0; i < uuids.length; i++) {
				const replacement = {
					uuid: uuids[i],
					is_deleted: true,
					updated_at: new Date().toISOString()
				}
				await blogAttachmentDbService.updateBlogAttachment(replacement);
			}
		}
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
		if (subCategory) {
			obj.sub_category = subCategory;
		}
		if (type) {
			obj.type = type;
		}
		if (createdBy) {
			obj.created_by = createdBy;
		}
		if (createdByEmail) {
			obj.created_by_email = createdByEmail;
		}
		if (isPublished !== null) {
			obj.is_published = isPublished;
		}
		if (isDeleted !== null) {
			obj.is_deleted = isDeleted;
		}
		await blogDbService.updateBlog(obj)

		if (req.files && req.files.attachment) {
			const attachments = req.files.attachment;
			for (let i = 0; i < attachments.length; i++) {
				const attachment = attachments[i];
				if (attachment) {
					const blogAttachmentObj = {
						blog_id: blogDetail.id,
						attachment: attachment.key,
						attachment_mimetype: attachment.mimetype,
						attachment_size: attachment.size
					}
					await blogAttachmentDbService.addBlogAttachment(blogAttachmentObj);
				}
			}
		}
	}
}

const getBlogs = async (req, res) => {
	const { page = 1, limit = 6, search = null, type = 'blog' } = req.query;
	let { is_admin = false } = req.query;
	if (is_admin === 'true') {
		is_admin = true
	}
	if (is_admin === 'false') {
		is_admin = false
	}
	const replacements = {
		offset: (+page - 1) * +limit,
		limit,
		type
	}
	if (search) {
		replacements.search = search;
	}
	let data = null;
	if (is_admin) {
		data = await blogDbService.getBlogsAdmin(replacements)
	} else {
		data = await blogDbService.getBlogs(replacements)
	}
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
	// console.log("blog detail", data)
	if (data && data[0] && data[0][0]) {
		const blogDetail = data[0][0];
		const blogAttachmentReplacement = {
			blog_id: blogDetail.id
		}

		const blogAttachmentDetail = await blogAttachmentDbService.getBlogAttachmentDetail(blogAttachmentReplacement);
		// console.log("blogAttachmentDetail", blogAttachmentDetail)
		if (blogAttachmentDetail && blogAttachmentDetail[0] && blogAttachmentDetail[0].length > 0) {
			blogDetail.attachments = blogAttachmentDetail[0];
		}
		const responseObj = {
			bucketUrl,
			blog: blogDetail || null
		}
		return responseObj;
	} else {
		const responseObj = {
			bucketUrl,
			blog: null
		}
		return responseObj;
	}
}

const getBlogAttachments = async (req, res) => {
	const { blog_id } = req / query;
	const replacement = {
		uuid: blog_id
	};
	const blogDetail = await blogDbService.getBlogDetail(replacement);
	const blogAttachmentReplacement = {
		blog_id
	}
	const blogAttachmentDetail = await blogAttachmentDbService.getBlogAttachmentDetail(blogAttachmentReplacement);
	console.log("blogAttachmentDetail", blogAttachmentDetail)
	if (blogAttachmentDetail && blogAttachmentDetail[0] && blogAttachmentDetail[0].length > 0) {
		return blogAttachmentDetail[0];
	} else {
		return [];
	}
}

module.exports = {
	addBlog,
	updateBlog,
	getBlog,
	getBlogs,
	getBlogAttachments
}