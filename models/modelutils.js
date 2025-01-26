export const constructPreparedStatement = (fields, table, where, params, filter) => {

	let query = `SELECT ${fields.join(', ')} FROM ${table}`;

	if(filter) {
		where += filter.filters;
		Object.assign(params, filter.parameters);
	}

	if (where) {
		query += ` WHERE 1=1 ${where}`;
	}

	if(filter.orderby) {
		query += filter.orderby;
	}
	return { query, params };
};

export const constructInsertQuery = (fields, table, data) => {

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
export const constructUpdateQuery = (fields, table, idField, id, data) => {
	const setList = [];
	const params = {};

	fields.forEach(field => {
		if (data[field] !== undefined) {
			setList.push(`${field} = :${field}`);
			params[field] = data[field];
		}
	});

	const query = `UPDATE ${table} SET ${setList.join(', ')} WHERE ${idField} = :${idField}`;
	params[idField] = id;

	return { query, params };
};

export const constructDeleteQuery = (table, idField, id) => {
	const params = {};
	params[idField] = id;

	const query = `DELETE FROM ${table} WHERE ${idField} = :${idField}`;
	return { query, params };

};

export const parseRequestQuery = (req, allowedFields) => {
	const filter = {
		filters: '',
		parameters: {},
		orderby: '',
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
				placeholders = placeholders.replace(/,\s*$/, '');
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

	if(req.query.orderby) {
		// Format should be field,sortby - ID,DESC
		const orderby = req.query.orderby.split(',');
		const field = orderby[0];
		const sortby = orderby[1] && orderby[1].toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
		if (allowedFields.includes(field)) {
			filter.orderby = ` ORDER BY ${field} ${sortby}`;
		}
	}
	return filter;
};