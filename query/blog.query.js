module.exports = {
    addBlog: `insert into blog (poster_image, content,title,description) values (:poster_image, :content,:title,:description)`,
    updateBlog: (replacements) => {
        console.log("replacements", replacements)
        let q = `update blog set updated_at= :updated_at`
        if (replacements.hasOwnProperty('poster_image')) {
            q += `, poster_image = :poster_image`
        }
        if (replacements.hasOwnProperty('content')) {
            q += `, content = :content`
        }
        if (replacements.hasOwnProperty('title')) {
            q += `, title = :title`
        }
        if (replacements.hasOwnProperty('description')) {
            q += `, description = :description`
        }
        if (replacements.hasOwnProperty('likes')) {
            q += `, likes = :likes`
        }
        if (replacements.hasOwnProperty('is_active')) {
            q += `, is_active = :is_active`
        }
        if (replacements.hasOwnProperty('is_deleted')) {
            q += `, is_deleted = :is_deleted`
        }
        q += ` where uuid = :uuid`
        return q;
    },
    getBlogs: (replacements) => {
        let q = `select * from blog `
        if (replacements.search) {
            q+= `where title like %${replacements.search} or description like %${replacements.search}` 
        }
        q += `order by created_at offset :offset limit :limit`
        return q;
    },
    getBlogDetail: `select * from blog where uuid = :uuid`
}