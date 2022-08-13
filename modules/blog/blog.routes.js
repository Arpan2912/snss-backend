
var express = require('express');
const { S3Client } = require('@aws-sdk/client-s3')
// const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const blogController = require('./blog.controller');

var router = express.Router();

const getS3Config = () => {
	const credentials = new aws.SharedIniFileCredentials({
		profile: 'arpan-shah-2995',
	});
	aws.config.credentials = credentials;

	return new aws.S3({
		accessKeyId: '',
		secretAccessKey: '',
		// region: 'ap-south-1'
	});
}

const upload = multer({
	storage: multerS3({
		s3: getS3Config(),
		bucket: 'arpan-first-bucket',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, `${Date.now().toString()}.jpg`)
		},
	})
})

router.post('/', upload.single('image'), blogController.addBlog)
router.put('/', upload.single('image'), blogController.updateBlog)
// router.put('/blog', blogController.updateBlogImage)
router.get('/', blogController.getBlog)
router.get('/blogs', blogController.getBlogs)


module.exports = router;
