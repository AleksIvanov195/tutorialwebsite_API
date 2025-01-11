class Accessor {
	constructor(model, database) {
		this.model = model;
		this.database = database;
	}

	async fetchData(req) {
		const { query, params } = this.model.buildReadQuery(req);
		try {
			const [data] = await this.database.execute(query, params);
			return data;
		} catch (error) {
			console.log('Error getting data: ', error);
			throw error;
		}
	}

	async insertData(data) {
		const { query, params } = this.model.buildCreateQuery(data);
		try {
			const [result] = await this.database.execute(query, params);
			console.log(result);
			return { result, idField: this.model.idField };
		} catch (error) {
			console.log('Error creating course: ', error);
			throw error;
		}
	}
	async updateData(id, data) {
		const { query, params } = this.model.buildUpdateQuery(id, data);
		try {
			const [result] = await this.database.execute(query, params);
			return result;
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
