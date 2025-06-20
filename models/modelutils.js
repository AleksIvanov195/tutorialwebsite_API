export const constructPreparedStatement = (fields, table, where, params, filter, groupBy) => {

	let query = `SELECT ${fields.join(', ')} FROM ${table}`;

	if(filter) {
		where += filter.filters;
		Object.assign(params, filter.parameters);
	}

	// build shared WHERE clause
	let baseWhere = '';
	if (where) {
		baseWhere = ` WHERE 1=1 ${where}`;
	}
	// Apply it to normal query
	query += baseWhere;

	if (groupBy) {
		query += ` GROUP BY ${groupBy}`;
	}

	if(filter.orderby) {
		query += filter.orderby;
	}

	if (filter.limit) {
		query += filter.limit;
	}

	if (filter.offset) {
		query += filter.offset;
	}

	// Return total count without pagination and filters
	const countQuery = `SELECT COUNT(*) AS TotalRecords FROM ${table} ${baseWhere}`;
	return { query, params, countQuery };
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
		limit:'',
		offset: '',
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

	if (req.query && req.query.search) {
		const searchString = req.query.search.trim();
		const conditions = [];
		let searchFields = allowedFields;

		if(req.query.searchFields) {
			searchFields = req.query.searchFields.split(',').map(field => field.trim()).filter(field => allowedFields.includes(field));
		}

		searchFields.forEach((field, index) => {
			conditions.push(`${field} LIKE :search${index}`);
			filter.parameters[`search${index}`] = `%${searchString}%`;
		});

		if (conditions.length > 0) {
			filter.filters += ` AND (${conditions.join(' OR ')})`;
		}
	}

	if(req.query && req.query.orderby) {
		// Format should be field,sortby - ID,DESC
		const orderby = req.query.orderby.split(',');
		const field = orderby[0];
		const sortby = orderby[1] && orderby[1].toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
		if (allowedFields.includes(field)) {
			filter.orderby = ` ORDER BY ${field} ${sortby}`;
		}
	}
	// Pagination ----------------------
	if(req.query && req.query.limit) {
		const limit = parseInt(req.query.limit, 10);
		if(Number.isInteger(limit) && limit > 0) {
			filter.limit = ' LIMIT :limit';
			filter.parameters.limit = limit;
		}
	}
	// If a page is specified calculate the offset based on the limit
	if(req.query && filter.parameters.limit != null && req.query.page) {
		const page = parseInt(req.query.page, 10);
		if (Number.isInteger(page) && page > 0) {
			const offset = (page - 1) * filter.parameters.limit;
			filter.offset = ' OFFSET :offset';
			filter.parameters.offset = offset;
		}
	}else if(req.query && req.query.offset) {
		// Otherwise use the provided offset value directly
		const offset = parseInt(req.query.offset, 10);
		if (Number.isInteger(offset) && offset > 0) {
			filter.offset = ' OFFSET :offset';
			filter.parameters.offset = offset;
		}
	}
	return filter;
};