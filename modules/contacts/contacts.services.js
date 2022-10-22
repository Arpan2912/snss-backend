const xlsx = require('node-xlsx');
const contactDbService = require('./contacts.db.services');
const bucketUrl = `https://arpan-first-bucket.s3.ap-south-1.amazonaws.com`;

const addContactApi = async (req, res) => {
	// console.log("req.biody", req.body);
	// console.log("req.file", req.file);
	// const posterImage = req.file.key;
	await addContact(req.body)
}

const addContact = async (obj) => {
	const { firstName, lastName, email, phone } = obj;
	const obj = {
		first_name: firstName,
		last_name: lastName,
		email,
		phone
	}
	await contactDbService.addContact(obj)
}

const updateContact = async (req, res) => {
	const { uuid, firstName, lastName, email, phone, emailSubscription, msgSubscription } = req.body;

	const obj = {
		uuid,
		updated_at: new Date().toISOString()
	}
	if (firstName) {
		obj.first_name = firstName;
	}
	if (lastName) {
		obj.last_name = lastName;
	}
	if (email) {
		obj.email = email;
	}
	if (phone) {
		obj.phone = phone;
	}
	if (emailSubscription) {
		obj.email_subscription = emailSubscription;
	}
	if (msgSubscription) {
		obj.msg_subscription = msgSubscription;
	}
	await contactDbService.updateContact(obj)
}

const getContacts = async (req, res) => {
	const { page = 1, limit = 6, search = null } = req.query;

	const replacements = {
		offset: (+page - 1) * +limit,
		limit
	}
	if (search) {
		replacements.search = search;
	}
	const data = await contactDbService.getContacts(replacements)
	console.log("Data", data);
	const responseObj = {
		bucketUrl,
		contacts: data[0]
	}
	return responseObj;
}

const getContact = async (req, res) => {
	const { uuid } = req.query;
	const replacements = {
		uuid
	}
	const data = contactDbService.getContactDetail(replacements)
	const responseObj = {
		bucketUrl,
		contact: data[0]
	}
	return responseObj;
}

const uploadContactUsingExcel = async () => {
	const workSheetsFromFile = xlsx.parse(`${__dirname}/../../sheet.xlsx`);
	const excelData = workSheetsFromFile[0].data;
	const headers = excelData[0];
	const keyMapping = {
		'First Name': 'firstName',
		'Last Name': 'lastName',
		'Email': 'email',
		'Phone': 'phone',
	}
	const excelJsonData = [];
	
	for (let i = 1; i < excelData.length; i++) {
		const rawData = excelData[i];
		let obj = {};
		for (let j = 0; j < rawData.length; j++) {
			const header = headers[j];
			const key = keyMapping[header] || header;
			let column = rawData[j];
			obj[key] = column;
		}
		console.log("obj", obj)
		await addContact(obj);
		// excelJsonData.push(obj);
	}
	console.log("excelJsonData", excelJsonData);
	console.log("workSheetsFromFile", workSheetsFromFile[0])
}

module.exports = {
	addContactApi,
	addContact,
	getContact,
	updateContact,
	getContacts,
	uploadContactUsingExcel
}