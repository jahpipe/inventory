const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Create a database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventorymanagement',
    port: '3306'
});

router.post('/api/inspection-reports', async (req, res) => {
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
      items,
      inspectionOfficers,
      acceptanceDetails,
    } = req.body;
  
    try {
      // Start a transaction
      await db.promise().beginTransaction();
  
      // Insert into inspection_reports table
      const [reportResult] = await db.promise().query(
        `INSERT INTO inspection_reports 
        (entity_name, fund_cluster, supplier, iar_no, contract_no, report_date, requisition_office, invoice_no, responsibility_center_code) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entityName,
          fundCluster,
          supplier,
          iarNo,
          contractNo,
          reportDate,
          requisitionOffice,
          invoiceNo,
          responsibilityCenterCode,
        ]
      );
  
      const reportId = reportResult.insertId;
  
      // Insert into inspection_items table
      for (const item of items) {
        await db.promise().query(
          `INSERT INTO inspection_items 
          (inspection_report_id, stock_property_no, description, unit, quantity) 
          VALUES (?, ?, ?, ?, ?)`,
          [reportId, item.stockPropertyNo, item.description, item.unit, item.quantity]
        );
      }
  
      // Insert into inspection_officers table
      for (const officer of inspectionOfficers) {
        await db.promise().query(
          `INSERT INTO inspection_officers 
          (inspection_report_id, officer_name, role) 
          VALUES (?, ?, ?)`,
          [reportId, officer.officerName, officer.role]
        );
      }
  
      // Insert into acceptance_details table
      await db.promise().query(
        `INSERT INTO acceptance_details 
        (inspection_report_id, date_inspected, is_complete, is_partial, partial_quantity, supply_officer) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          reportId,
          acceptanceDetails.dateInspected,
          acceptanceDetails.isComplete,
          acceptanceDetails.isPartial,
          acceptanceDetails.partialQuantity,
          acceptanceDetails.supplyOfficer,
        ]
      );
  
      // Commit the transaction
      await db.promise().commit();
  
      res.status(201).json({ message: 'Inspection report saved successfully', reportId });
    } catch (err) {
      // Rollback the transaction in case of error
      await db.promise().rollback();
      console.error('Error saving inspection report:', err);
      res.status(500).json({ error: 'Failed to save inspection report' });
    }
  });
  
  module.exports = router;