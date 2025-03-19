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
        acceptanceDetails.isComplete ? 1 : 0, // Numeric for inspection_status
        acceptanceDetails.isPartial ? 'Partial' : 'Full',
        acceptanceDetails.supplyOfficer,
      ]
    );

    const reportId = reportResult.insertId;
    console.log(`✅ Inspection report saved (ID: ${reportId})`);

    // Insert into `inspectionitems` table
    // Insert into `inspectionitems` table
if (items.length > 0) {
  const itemValues = items.map(item => [
    reportId,
    item.stockPropertyNo || null,
    item.description || null,
    item.unit || null,
    item.quantity || null,
    item.price || null,
  ]);

  await connection.query(
    `INSERT INTO inspectionitems 
    (inspection_report_id, stock_property_number, description, unit, quantity, price) 
    VALUES ${items.map(() => "(?, ?, ?, ?, ?, ?)").join(", ")}`,
    itemValues.flat() // ✅ Correctly flattening the array
  );      

  console.log(`✅ ${items.length} items inserted into inspectionitems`);
}


    // Insert into `inspectionofficers` table
    if (inspectionOfficers.length > 0) {
      const officerValues = inspectionOfficers.map(officer => {
        if (!officer.officerName) {
          throw new Error('Missing required officer name');
        }
        return [reportId, officer.officerName, officer.role || 'Unknown'];
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
    if (connection) await connection.rollback();
    console.error('❌ Error saving inspection report:', err);
    res.status(500).json({ error: 'Failed to save inspection report', details: err.message });
  } finally {
    if (connection) connection.release();
  }
});

// GET route to fetch all inspection reports
// GET route to fetch all inspection reports
router.get('/inspection-reports', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();

    // Fetch reports
    const [reports] = await connection.query(`
      SELECT 
        id AS reportId, entity_name AS entityName, fund_cluster AS fundCluster,
        supplier, iar_number AS iarNo, contract_number AS contractNo, date AS reportDate,
        requisitioning_office AS requisitionOffice, invoice_number AS invoiceNo,
        responsibility_center_code AS responsibilityCenterCode, date_inspected AS dateInspected,
        inspection_status AS inspectionStatus, acceptance_status AS acceptanceStatus,
        supply_officer AS supplyOfficer
      FROM inspectionreport
    `);

    // Fetch items separately
    const [items] = await connection.query(`
      SELECT 
        inspection_report_id AS reportId, stock_property_number AS stockPropertyNo,
        description, unit, quantity, price
      FROM inspectionitems
    `);

    // Fetch officers separately
    const [officers] = await connection.query(`
      SELECT 
        inspection_report_id AS reportId, officer_name AS officerName, role
      FROM inspectionofficers
    `);

    // Group data
    const reportMap = {};

    reports.forEach(report => {
      reportMap[report.reportId] = {
        ...report,
        inspectionStatus: report.inspectionStatus === 1, // Convert to boolean
        acceptanceDetails: {
          dateInspected: report.dateInspected,
          isComplete: report.inspectionStatus === 1, // Convert to boolean
          isPartial: report.acceptanceStatus === 'Partial',
          supplyOfficer: report.supplyOfficer,
        },
        items: [],
        inspectionOfficers: [],
      };
    });

    items.forEach(item => {
      if (reportMap[item.reportId]) {
        reportMap[item.reportId].items.push(item);
      }
    });

    officers.forEach(officer => {
      if (reportMap[officer.reportId]) {
        reportMap[officer.reportId].inspectionOfficers.push(officer);
      }
    });

    const result = Object.values(reportMap);
    res.status(200).json(result);

  } catch (err) {
    console.error('❌ Error fetching inspection reports:', err);
    res.status(500).json({ error: 'Failed to fetch inspection reports', details: err.message });
  } finally {
    if (connection) connection.release();
  }
});


module.exports = router;
