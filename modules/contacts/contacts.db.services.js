const { executeQuery } = require('../../utils');
const contactsQuery = require('../../query/contacts.query');

const addContact = async (replacement) => {
    return executeQuery(contactsQuery.addContact, replacement, 'insert');
}

const updateContact = async (replacement) => {
    return executeQuery(contactsQuery.updateContact(replacement), replacement, 'update');
}

const getContactDetail = async (replacement) => {
    return executeQuery(contactsQuery.getContactDetail, replacement);
}

const getContacts = async (replacement) => {
    return executeQuery(contactsQuery.getContact(replacement), replacement);
}

module.exports = {
    addContact,
    updateContact,
    getContactDetail,
    getContacts
}