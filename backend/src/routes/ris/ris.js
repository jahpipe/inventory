// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg'); // Assuming you're using PostgreSQL

// const app = express();
// app.use(bodyParser.json());

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'inventorymanagement',
//     port: '3306'
// });


// app.post('/inspection-reports', async (req, res) => {
//   const {
//     entityName,
//     fundCluster,
//     division,
//     responsibilityCenterCode,
//     office,
//     risNo,
//     items,
//     purpose,
//     requestedBy,
//     approvedBy,
//     issuedBy,
//     receivedBy,
//   } = req.body;

//   try {
//     // Insert into inspectionreport table
//     const reportQuery = `
//       INSERT INTO inspectionreport (
//         entity_name, fund_cluster, division, responsibility_center_code, office, ris_no, purpose
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
//     `;
//     const reportValues = [
//       entityName,
//       fundCluster,
//       division,
//       responsibilityCenterCode,
//       office,
//       risNo,
//       purpose,
//     ];
//     const reportResult = await pool.query(reportQuery, reportValues);
//     const reportId = reportResult.rows[0].id;

//     // Insert items into inspectionitems table
//     for (const item of items) {
//       const itemQuery = `
//         INSERT INTO inspectionitems (
//           inspection_report_id, stock_no, unit, description, quantity, stock_available_yes, stock_available_no, issue_quantity, remarks
//         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
//       `;
//       const itemValues = [
//         reportId,
//         item.stockNo,
//         item.unit,
//         item.description,
//         item.quantity,
//         item.stockAvailableYes,
//         item.stockAvailableNo,
//         item.issueQuantity,
//         item.remarks,
//       ];
//       await pool.query(itemQuery, itemValues);
//     }

//     // Insert officers into inspectionofficers table
//     const officers = [
//       { ...requestedBy, role: 'requestedBy' },
//       { ...approvedBy, role: 'approvedBy' },
//       { ...issuedBy, role: 'issuedBy' },
//       { ...receivedBy, role: 'receivedBy' },
//     ];
//     for (const officer of officers) {
//       const officerQuery = `
//         INSERT INTO inspectionofficers (
//           inspection_report_id, officer_name, role, signature, designation, date
//         ) VALUES ($1, $2, $3, $4, $5, $6);
//       `;
//       const officerValues = [
//         reportId,
//         officer.printedName,
//         officer.role,
//         officer.signature,
//         officer.designation,
//         officer.date,
//       ];
//       await pool.query(officerQuery, officerValues);
//     }

//     res.status(201).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     res.status(500).json({ message: 'Failed to submit form.' });
//   }
// });

// app.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });