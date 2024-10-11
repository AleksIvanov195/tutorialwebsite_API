const constructPreparedStatement = (fields, table, where, params) => {
	let query = `SELECT ${fields.join(', ')} FROM ${table}`;

	if (where) {
		query += ` WHERE ${where}`;
	}

	return { query, params };
};

export { constructPreparedStatement };