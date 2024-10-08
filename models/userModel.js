const model ={
	table: 'user',
	fields: ['UserID', 'UserName', 'UserEmail', 'UserPassword', 'UserType', 'UserDatecreated'],

	getUserByIdQuery: (id) => `SELECT ${model.fields.join(', ')} FROM ${model.table} WHERE UserID = ?`,
	getUserByEmailQuery: (email) => `SELECT ${model.fields.join(', ')} FROM ${model.table} WHERE UserEmail = ?`,

}

export default model;