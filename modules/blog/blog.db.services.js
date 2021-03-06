const { executeQuery } = require('../../utils');
const blogQuery = require('../../query/blog.query');

const addBlog = async (replacement) => {
    return executeQuery(blogQuery.addBlog, replacement, 'insert');
}

const updateBlog = async (replacement) => {
    return executeQuery(blogQuery.updateBlog(replacement), replacement, 'update');
}

const getBlogDetail = async (replacement) => {
    return executeQuery(blogQuery.getBlogDetail, replacement);
}

const getBlogs = async (replacement) => {
    return executeQuery(blogQuery.getBlogs, replacement);
}

module.exports = {
    addBlog,
    updateBlog,
    getBlogDetail,
    getBlogs
}