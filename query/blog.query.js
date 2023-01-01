module.exports = {
    addBlog: `insert into blog (poster_image, content,title,description,category,sub_category,created_by,created_by_email,is_published)
     values (:poster_image, :content,:title,:description,:category,:sub_category,:created_by,:created_by_email,:is_published)`,
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
        if (replacements.hasOwnProperty('category')) {
            q += `, category = :category`
        }
        if (replacements.hasOwnProperty('likes')) {
            q += `, likes = :likes`
        }
        if (replacements.hasOwnProperty('sub_category')) {
            q += `, sub_category = :sub_category`
        }
        if (replacements.hasOwnProperty('created_by')) {
            q += `, created_by = :created_by`
        }
        if (replacements.hasOwnProperty('created_by_email')) {
            q += `, created_by_email = :created_by_email`
        }
        if (replacements.hasOwnProperty('is_published')) {
            q += `, is_published = :is_published`
        }
        if (replacements.hasOwnProperty('is_deleted')) {
            q += `, is_deleted = :is_deleted`
        }
        q += ` where uuid = :uuid`
        return q;
    },
    getBlogs: (replacements) => {
        let q = `select * from blog where is_published=true and is_active=true and is_deleted=false `
        if (replacements.search) {
            q += `and (title like %${replacements.search} or description like %${replacements.search} or category like %${replacements.search})`
        }
        q += `order by created_at desc offset :offset limit :limit`
        return q;
    },
    getBlogsAdmin: (replacements) => {
        let q = `select * from blog where is_deleted=false`
        if (replacements.search) {
            q += ` and (title like %${replacements.search} or description like %${replacements.search} or category like %${replacements.search})`
        }
        q += `order by created_at desc`
        return q;
    },
    getBlogDetail: `select * from blog where uuid = :uuid`
}