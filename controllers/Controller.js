class Controller {
	constructor(accessor) {
		this.accessor = accessor;
	}

	async get(req, res) {
		try {
			const data = await this.accessor.fetchData(req);
			if (!data.length || data.length === 0) return res.status(404).json({ message: 'No data found.' });
			res.status(200).json(data);

		} catch (error) {
			console.log('Error getting data: ', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

export default Controller;