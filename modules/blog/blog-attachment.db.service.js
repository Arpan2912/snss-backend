const { executeQuery } = require('../../utils');
const blogAttachmentQuery = require('../../query/blog-attachment.query');

const addBlogAttachment = async (replacement) => {
  return executeQuery(blogAttachmentQuery.addBlogAttachment, replacement, 'insert');
}

const updateBlogAttachment = async (replacement) => {
  return executeQuery(blogAttachmentQuery.updateBlogAttachment(replacement), replacement, 'update');
}

const getBlogAttachmentDetail = async (replacement) => {
  return executeQuery(blogAttachmentQuery.getBlogAttachmentDetail, replacement);
}

module.exports = {
  addBlogAttachment,
  updateBlogAttachment,
  getBlogAttachmentDetail
}