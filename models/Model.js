import { constructInsertQuery, constructUpdateQuery } from './modelutils.js';
class Model {
	constructor(model) {
		this.table = model.table;
		this.idField = model.idField;
		this.mutableFields = model.mutableFields;
		this.buildReadQuery = model.buildReadQuery;
	}

	buildCreateQuery(data) {
		return constructInsertQuery(this.model.insertFields, this.model.table, data);
	}

	buildUpdateQuery(id, data) {
		return constructUpdateQuery(this.model.mutableFields, this.model.table, this.model.idfield, id, data);
	}

	buildDeteleQuery(id) {
		console.log('To delete ' + id);
	}

}
export default Model;