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

const getBlogDetailFromUuid = async (replacement) => {
    return executeQuery(blogQuery.getBlogDetailFromUuid, replacement);
}

const getBlogs = async (replacement) => {
    return executeQuery(blogQuery.getBlogs(replacement), replacement);
}
const getBlogsAdmin = async (replacement) => {
    return executeQuery(blogQuery.getBlogsAdmin(replacement), replacement);
}

module.exports = {
    addBlog,
    updateBlog,
    getBlogDetail,
    getBlogs,
    getBlogsAdmin,
    getBlogDetailFromUuid
}