class Controller {
	constructor(accessor) {
		this.accessor = accessor;
	}

	async get(req, res) {
		try {
			const { data, totalRecords } = await this.accessor.fetchData(req);
			if (!data.length || data.length === 0) return res.status(404).json({ message: 'No data found.' });
			// Send totalRecords in a header and data in the body
			res.setHeader('x-total-count', totalRecords);
			res.status(200).json(data);

		} catch (error) {
			console.log('Error getting data: ', error);
			res.status(500).json({ message: 'Internal Server Error, record could not be fetched.' });
		}
	}

	async post(req, res) {
		const data = req.body;
		const userID = req.userID;
		try {
			const { result, idField } = await this.accessor.insertData(data, userID);
			const createdData = {
				[idField]: result.insertId,
				...data,
			};
			res.status(201).json({
				message: 'Success Posting',
				data: createdData,
			});
		} catch (error) {
			console.log('Error posting: ', error);
			res.status(500).json({ message:'Internal Server Error, record could not be uploaded.' });
		}
	}

	async put(req, res) {
		const id = req.params.id;
		const data = req.body;
		try {
			const { result, idField } = await this.accessor.updateData(id, data);
			if (result.affectedRows === 0) return res.status(404).json({ message: 'No data found to update.' });
			res.status(200).json({
				message: 'Success Updating',
				data: {
					[idField]: parseInt(id),
					...data,
				},
			});
		} catch (error) {
			console.log('Error updating: ', error);
			res.status(500).json({ message: 'Internal Server Error, record could not be updated.' });
		}
	}

	async delete(req, res) {
		const id = req.params.id;
		try {
			const result = await this.accessor.deleteData(id);
			if (result.affectedRows === 0) return res.status(404).json({ message: 'No data found to delete.' });
			res.status(200).json({ message: 'Success Deleting' });
		} catch (error) {
			console.log('Error deleting: ', error);
			res.status(500).json({ message: 'Internal Server Error, record could not be deleted.' });
		}
	}


}

export default Controller;