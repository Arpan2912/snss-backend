const db = require('./db/models');

const prepareAndSendResponse = (res, code, data, msg) => {
	return res.status(code).send({
		data,
		msg
	})
}

const executeQuery = async (query, replacements, action = 'select') => {
	const arrQueryTypes = [
		{
			insert: db.Sequelize.QueryTypes.INSERT,
			update: db.Sequelize.QueryTypes.UPDATE,
			delete: db.Sequelize.QueryTypes.DELETE,
			select: db.Sequelize.QueryTypes.SELECT
		}
	];
	const queryType = arrQueryTypes[action];
	const qResponse = await db.sequelize.query(query, {
		replacements,
		type: queryType
	});
	console.log("qResponse", qResponse)
	return qResponse;
}

module.exports = {
	executeQuery,
	prepareAndSendResponse
}