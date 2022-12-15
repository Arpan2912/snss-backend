const blogService = require('./blog.services');
const blogDbService = require('./blog.db.services');
const { prepareAndSendResponse } = require('../../utils');
const { BUCKET_NAME } = process.env;
const bucketUrl = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com`;

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
		console.log("e", e)
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

const generateBlogPreview = async (req, res) => {

	const { blogId } = req.params;

	const replacements = {
		uuid: blogId
	}
	const data = await blogDbService.getBlogDetail(replacements)
	console.log("blog detail", data)
	let blogData = data && data[0] && data[0][0] ? data[0][0] : null;
	if (blogData) {
		res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${blogData.title}</title>
      
      <meta property="og:title" content="${blogData.title}" />
      <meta property="og:description" content="${blogData.description}" />
      <meta property="og:image" content="${bucketUrl}/${blogData.poster_image}" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="${blogData.title}" />
      <meta property="twitter:description" content="${blogData.description}" />
			<meta property="twitter:image" content="${bucketUrl}/${blogData.poster_image}" />

			<meta http-equiv="refresh" content="2;url=https://www.snssindia.in/#/blog/${blogId}" />
			<script>
				function redirectToPage(){
					window.location.replace("https://www.snssindia.in/#/blog/${blogId}");
				}
			</script>
    </head>
    <body onload="redirectToPage()">
			<div>
      	<h1>${blogData.title}</h1>
				<div>${blogData.description}</div>
			</div>
    </body>
    </html>
  `);
	} else {
		res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1></h1>
    </body>
    </html>
  `)
	}
}

module.exports = {
	addBlog,
	updateBlog,
	getBlog,
	getBlogs,
	generateBlogPreview
}