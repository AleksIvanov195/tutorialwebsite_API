const express = require('express');
const app = new express();

app
.use(express.json())
.use('/api', require('./routes/api')())
.listen(3000, () => console.log('running on port 3000'));