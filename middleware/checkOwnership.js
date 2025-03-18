export const checkOwnership = (model, database) => async (req, res, next) => {
	const userID = req.userID;
	const recordID = req.params.id;
	try {
		// Fetch the record from the database
		const query = `SELECT * FROM ${model.table} WHERE ${model.idField} = ?`;
		const [record] = await database.execute(query, [recordID]);

		if (!record) {
			return res.status(404).json({ message: 'Record not found.' });
		}

		// Check if the user is the owner of the record
		if (record[0][model.creatorField] !== userID) {
			return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
		}
		next();
	} catch (error) {
		console.error('Error checking ownership: ', error);
		res.status(500).json({ message: 'Internal Server Error: Ownership check failed.' });
	}
};