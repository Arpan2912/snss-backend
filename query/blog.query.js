module.exports = {
    addBlog: `insert into blog (poster_image, content,title,description) values (:poster_image, :content,:title,:description)`,
    updateBlog: (replacements) => {
        const q = `update blog set updated_at= :updated_at`
        if (replacements.hasOwnProperty('poster_image')) {
            q = +`, poster_image = :poster_image`
        }
        if (replacements.hasOwnProperty('content')) {
            q = +`, content = :content`
        }
        if (replacements.hasOwnProperty('title')) {
            q = +`, title = :title`
        }
        if (replacements.hasOwnProperty('description')) {
            q = +`, description = :description`
        }
        if (replacements.hasOwnProperty('likes')) {
            q = +`, likes = :likes`
        }
        if (replacements.hasOwnProperty('is_active')) {
            q = +`, is_active = :is_active`
        }
        if (replacements.hasOwnProperty('is_deleted')) {
            q = +`, is_deleted = :is_deleted`
        }
        q += `where uuid = :uuid`
        return q;
    },
    getBlogs: `select * from blog order by created_at offset :offset limit :limit`,
    getBlogDetail: `select * from blog where uuid = :uuid`
}