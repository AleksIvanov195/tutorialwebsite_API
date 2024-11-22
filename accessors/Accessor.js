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
}

export default Accessor;
