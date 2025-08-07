const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // example: your-server.database.windows.net
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // true for Azure
    trustServerCertificate: false
  }
};

// Test route
app.get('/api/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM  AI3_4DR_TRUNK_LID_LINE');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying the database');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

