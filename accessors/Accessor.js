class Accessor {
	constructor(model, database) {
		this.model = model;
		this.database = database;
	}

	async fetchData(req) {
		const { query, params, countQuery } = this.model.buildReadQuery(req);
		try {
			const [data] = await this.database.execute(query, params);
			const [count] = await this.database.execute(countQuery, params);
			const totalRecords = count[0]?.TotalRecords || 0;
			return { data, totalRecords };
		} catch (error) {
			console.log('Error getting data: ', error);
			throw error;
		}
	}

	async insertData(data, userID) {
		const { query, params } = this.model.buildCreateQuery(data, userID);
		try {
			const [result] = await this.database.execute(query, params);
			return { result, idField: this.model.idField };
		} catch (error) {
			console.log('Error inserting data: ', error);
			throw error;
		}
	}
	async updateData(id, data) {
		const { query, params } = this.model.buildUpdateQuery(id, data);
		try {
			const [result] = await this.database.execute(query, params);
			return { result, idField: this.model.idField };
		} catch (error) {
			console.log('Error updating data: ', error);
			throw error;
		}
	}

	async deleteData(id) {
		const { query, params } = this.model.buildDeleteQuery(id);
		try {
			const [result] = await this.database.execute(query, params);
			return result;
		} catch (error) {
			console.log('Error deleting data: ', error);
			throw error;
		}

	}

}

export default Accessor;
