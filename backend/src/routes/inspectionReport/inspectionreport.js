const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'inventorymanagement',
  port: '3306',
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0,
});

// POST route to save an inspection report
router.post('/inspection-reports', async (req, res) => {
  console.log('📩 Incoming request:', req.body); 

  const {
    entityName,
    fundCluster,
    supplier,
    iarNo,
    contractNo,
    reportDate,
    requisitionOffice,
    invoiceNo,
    responsibilityCenterCode,
    items = [],
    inspectionOfficers = [],
    acceptanceDetails,
  } = req.body;

  // Validate required fields
  if (
    !entityName ||
    !supplier ||
    !iarNo ||
    !contractNo ||
    !reportDate ||
    !requisitionOffice ||
    !invoiceNo ||
    !responsibilityCenterCode ||
    items.length === 0 ||
    inspectionOfficers.length === 0 ||
    !acceptanceDetails ||
    !acceptanceDetails.dateInspected ||
    typeof acceptanceDetails.isComplete !== 'boolean' ||
    typeof acceptanceDetails.isPartial !== 'boolean' ||
    !acceptanceDetails.supplyOfficer
  ) {
    console.error('⚠️ Validation Error: Missing or invalid required fields');
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  let connection;
  try {
    // Start a transaction
    connection = await db.getConnection();
    await connection.beginTransaction();

    console.log('✅ Connected to MySQL - Transaction started');

    // Insert into `inspectionreport` table
    const [reportResult] = await connection.execute(
      `INSERT INTO inspectionreport 
      (entity_name, fund_cluster, supplier, iar_number, contract_number, date, requisitioning_office, invoice_number, responsibility_center_code, date_inspected, inspection_status, acceptance_status, supply_officer) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entityName,
        fundCluster || null, 
        supplier,
        iarNo,
        contractNo,
        reportDate,
        requisitionOffice,
        invoiceNo,
        responsibilityCenterCode,
        acceptanceDetails.dateInspected,
        acceptanceDetails.isComplete ? 'Complete' : 'Incomplete',
        acceptanceDetails.isPartial ? 'Partial' : 'Full',
        acceptanceDetails.supplyOfficer,
      ]
    );

    const reportId = reportResult.insertId;
    console.log(`✅ Inspection report saved (ID: ${reportId})`);

    // Insert into `inspectionitems` table
    if (items.length > 0) {
      const itemValues = items.map(item => [
        reportId,
        item.stockPropertyNo || null,
        item.description || null,
        item.unit || null,
        item.quantity || null,
        item.price || null, // Handle optional price
      ]);

      await connection.query(
        `INSERT INTO inspectionitems 
        (inspection_report_id, stock_property_number, description, unit, quantity, price) 
        VALUES ?`,
        [itemValues]
      );

      console.log(`✅ ${items.length} items inserted into inspectionitems`);
    }

    // Insert into `inspectionofficers` table
    if (inspectionOfficers.length > 0) {
      const officerValues = inspectionOfficers.map(officer => {
        if (!officer.officerName) {  // Remove strict role validation
          throw new Error('Missing required officer name');
        }
        return [reportId, officer.officerName, officer.role || 'Unknown']; // Default value for role
      });

      await connection.query(
        `INSERT INTO inspectionofficers 
        (inspection_report_id, officer_name, role) 
        VALUES ?`,
        [officerValues]
      );

      console.log(`✅ ${inspectionOfficers.length} officers inserted into inspectionofficers`);
    }

    // Commit the transaction
    await connection.commit();
    console.log('✅ Transaction committed');

    res.status(201).json({ message: 'Inspection report saved successfully', reportId });

  } catch (err) {
    // Rollback transaction if an error occurs
    if (connection) await connection.rollback();
    console.error('❌ Error saving inspection report:', err);
    res.status(500).json({ error: 'Failed to save inspection report', details: err.message });

  } finally {
    // Ensure connection is released back to the pool
    if (connection) connection.release();
  }
});




module.exports = router;