const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const ConnectDatabase = require('./Database/db');
const projectRouter = require('./Routes/project');
const skillRouter = require('./Routes/skill');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/project/', projectRouter);
app.use('/api/skills/', skillRouter);

app.listen(PORT, () => {
    ConnectDatabase();
    console.log(`App is running at http://localhost:${PORT}/`)
})
