module.exports = {
    addBlogAttachment: `insert into blog_attachments (blog_id, attachment,attachment_mimetype,attachment_size)
     values (:blog_id, :attachment,:attachment_mimetype,:attachment_size)`,
    updateBlogAttachment: (replacements) => {
        console.log("replacements", replacements)
        let q = `update blog_attachments set updated_at= :updated_at`
        if (replacements.hasOwnProperty('attachment')) {
            q += `, attachment = :attachment`
        }
        if (replacements.hasOwnProperty('attachment_mimetype')) {
            q += `, attachment_mimetype = :attachment_mimetype`
        }
        if (replacements.hasOwnProperty('attachment_size')) {
            q += `, attachment_size = :attachment_size`
        }
        if (replacements.hasOwnProperty('is_deleted')) {
            q += `, is_deleted = :is_deleted`
        }
        q += ` where uuid = :uuid`
        return q;
    },
    getBlogAttachmentDetail: `select * from blog_attachments where blog_id=:blog_id and is_active=true and is_deleted=false`
}