
var express = require('express');
const { S3Client } = require('@aws-sdk/client-s3')
// const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const blogController = require('./blog.controller');
const { BUCKET_NAME } = process.env;

var router = express.Router();

const getS3Config = () => {
	const credentials = new aws.SharedIniFileCredentials();
	aws.config.credentials = credentials;

	return new aws.S3({
		accessKeyId: '',
		secretAccessKey: '',
		// region: 'ap-south-1'
	});
}

const upload = multer({
	storage: multerS3({
		limits: { fileSize: 10 * 1024 * 1024 },
		s3: getS3Config(),
		bucket: BUCKET_NAME,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			console.log("file", file);
			cb(null, `${Date.now().toString()}-${file.originalname}`)
		},
	})
})

router.post('/', upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'attachment', maxCount: 5 },
]), blogController.addBlog)
// router.post('/', upload.single('image'), blogController.addBlog)
router.put('/', upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'attachment', maxCount: 5 },
]), blogController.updateBlog)
// router.put('/blog', blogController.updateBlogImage)
router.get('/', blogController.getBlog)
router.get('/blogs', blogController.getBlogs)
router.get("/:url", blogController.generateBlogPreview)
router.get("/blog-attachments", blogController.generateBlogPreview)


module.exports = router;
