import { constructInsertQuery, constructUpdateQuery, constructDeleteQuery } from './modelutils.js';
class Model {
	constructor(model) {
		this.table = model.table;
		this.idField = model.idField;
		this.mutableFields = model.mutableFields;
		this.insertFields = model.insertFields;
		this.buildReadQuery = model.buildReadQuery;
	}

	buildCreateQuery(data) {
		return constructInsertQuery(this.insertFields, this.table, data);
	}

	buildUpdateQuery(id, data) {
		return constructUpdateQuery(this.mutableFields, this.table, this.idField, id, data);
	}

	buildDeleteQuery(id) {
		return constructDeleteQuery(this.table, this.idField, id);
	}

}
export default Model;