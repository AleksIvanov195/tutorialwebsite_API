const constructPreparedStatement = (fields, table, where, params) => {
	let query = `SELECT ${fields.join(', ')} FROM ${table}`;

	if (where) {
		query += ` WHERE ${where}`;
	}

	return { query, params };
};

const constructInsertQuery = (fields, table, data) => {

	const columns = fields.join(', ');
	const values = fields.map(field => `:${field}`).join(', ');
	const parameters = {};

	// Key value pair for each field example: parameters['CourseName'] = 'Introduction to JavaScript'
	fields.forEach(field => {
		parameters[field] = data[field];
	});

	const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
	console.log(query);
	console.log('Parameters:', parameters);
	return { query, params: parameters };
};


export { constructPreparedStatement, constructInsertQuery };