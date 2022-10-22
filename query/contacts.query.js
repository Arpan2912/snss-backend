module.exports = {
  addContact: `insert into contacts (first_name, last_name,email,phone) values (:first_name, :last_name, :email, :phone)`,
  updateContact: (replacements) => {
    console.log("replacements", replacements)
    let q = `update contacts set updated_at= :updated_at`
    if (replacements.hasOwnProperty('first_name')) {
      q += `, first_name = :first_name`
    }
    if (replacements.hasOwnProperty('last_name')) {
      q += `, last_name = :last_name`
    }
    if (replacements.hasOwnProperty('email')) {
      q += `, email = :email`
    }
    if (replacements.hasOwnProperty('phone')) {
      q += `, phone = :phone`
    }
    if (replacements.hasOwnProperty('email_subscription')) {
      q += `, email_subscription = :email_subscription`
    }
    if (replacements.hasOwnProperty('msg_subscription')) {
      q += `, msg_subscription = :msg_subscription`
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
  getContact: (replacements) => {
    let q = `select * from contacts `
    if (replacements.search) {
      q += `where first_name like %${replacements.search} or last_name like %${replacements.search} or email like %${replacements.search} or phone like %${replacements.search}`
    }
    q += `order by first_name offset :offset limit :limit`
    return q;
  },
  getContactDetail: `select * from contacts where uuid = :uuid`
}