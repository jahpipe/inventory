const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');

const router = express.Router();


const loginRouter = require('./routes/login/login');
const inspectionReportRouter = require('./routes/inspectionReport/inspectionreport');

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventorymanagement',  
    port: '3306'
});



// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL using environment variables');
});

// API CONNECTION
app.use('/api/login', loginRouter);
app.use('/api', inspectionReportRouter);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});