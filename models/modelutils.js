const constructPreparedStatement = (fields, table, where, params, filter) => {

	let query = `SELECT ${fields.join(', ')} FROM ${table}`;

	if(filter) {
		where += filter.filters;
		Object.assign(params, filter.parameters);
	}

	if (where) {
		query += ` WHERE 1=1 ${where}`;
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

const parseRequestQuery = (req, allowedFields) => {
	const filter = {
		filters: '',
		parameters: {},
	};

	for(const key in req.query) {
		if(allowedFields.includes(key)) {
			const params = req.query[key].split(',');
			if (params.length > 1) {

				let INStatement = ` AND ${key} IN (`;
				let placeholders = '';
				params.forEach((param, index) => {
					placeholders += `:${key}${index},`;
					filter.parameters[`${key}${index}`] = param.trim();
				});
				// Remove last comma
				placeholders = placeholders.replace(/,\s*$/, "");
				// Add the placeholders to the IN
				INStatement += `${placeholders})`;
				// Add the statement to the filter
				filter.filters += INStatement;

			} else{
				filter.filters += ` AND ${key}=:${key}`;
				filter.parameters[key] = req.query[key];
			}

		}
	}
	return filter;
};

export { constructPreparedStatement, constructInsertQuery, parseRequestQuery };