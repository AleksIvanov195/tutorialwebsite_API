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

	// Key value pair for each field example: parameters['CourseName'] = data['CourseName'] ('Introduction to JavaScript')
	fields.forEach(field => {
		parameters[field] = data[field];
	});

	const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
	return { query, params: parameters };
};

const parseRequestQuery = (req, allowedFields) => {
	const filter = {
		filters: '',
		parameters: {},
	};

	for(const key in req.query) {
		if(allowedFields.includes(key)) {
			// There can be more than one values in a filter
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

			}
			// If just one value in a filter
			else{
				filter.filters += ` AND ${key}=:${key}`;
				filter.parameters[key] = req.query[key];
			}

		}
	}
	return filter;
};

export { constructPreparedStatement, constructInsertQuery, parseRequestQuery };