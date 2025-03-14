import React, { useState } from 'react';

const InspectionReport = () => {
  const [entityName, setEntityName] = useState('');
  const [fundCluster, setFundCluster] = useState('');
  const [supplier, setSupplier] = useState('');
  const [iarNo, setIarNo] = useState('');
  const [contractNo, setContractNo] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [requisitionOffice, setRequisitionOffice] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [responsibilityCenterCode, setResponsibilityCenterCode] = useState('');
  const [dateInspected, setDateInspected] = useState('');
  const [inspectionStatus, setInspectionStatus] = useState(false);
  const [acceptanceStatus, setAcceptanceStatus] = useState('Complete');
  const [supplyOfficer, setSupplyOfficer] = useState('');
  const [activeTab, setActiveTab] = useState('create');

  
  // State for inspection items
  const [items, setItems] = useState([
    { stockPropertyNo: '', description: '', unit: '', quantity: '', price: '' },
  ]);

  // State for inspection officers
  const [inspectionOfficers, setInspectionOfficers] = useState([
    { officerName: '', role: '' },
  ]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reportData = {
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
      acceptanceDetails: {
        dateInspected,
        isComplete: acceptanceStatus === 'Complete',
        isPartial: acceptanceStatus === 'Partial',
        supplyOfficer,
      },
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/inspection-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON, but got: ${text}`);
      }
  
      const result = await response.json();
      if (response.ok) {
        alert('Inspection report saved successfully!');
        console.log('Report ID:', result.reportId);
      } else {
        alert(`Failed to save inspection report: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  // Add a new item row
  const addItem = () => {
    setItems([...items, { stockPropertyNo: '', description: '', unit: '', quantity: '', price: '' }]);
  };

  // Add a new officer row
  const addOfficer = () => {
    setInspectionOfficers([...inspectionOfficers, { officerName: '', role: '' }]);
  };

  return (
    <div className="container mt-4 border p-4">
      <form onSubmit={handleSubmit}>
        <div className="text-end text-sm mb-2">Appendix 62</div>
        <div className="text-center fw-bold fs-5 mb-4">
          INSPECTION AND ACCEPTANCE REPORT
        </div>
        <div className="mb-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              Entity Name: <input type="text" className="border-0 border-bottom ms-2 w-50 bg-transparent" value={entityName} onChange={(e) => setEntityName(e.target.value)} required />
            </div>
            <div className="d-flex align-items-center">
              Fund Cluster: <input type="text" className="border-0 border-bottom ms-2 w-50 bg-transparent" value={fundCluster} onChange={(e) => setFundCluster(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="border p-2 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              Suppliers: <input type="text" className="border-0 border-bottom ms-2 w-50 bg-transparent" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
            </div>
            <div className="d-flex align-items-center">
              IAR No.: <input type="text" className="border-0 border-bottom ms-2 w-50 bg-transparent" value={iarNo} onChange={(e) => setIarNo(e.target.value)} required />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              Contract No: <input type="text" className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent" value={contractNo} onChange={(e) => setContractNo(e.target.value)} required />
            </div>
            <div className="d-flex align-items-center">
              Date: <input type="date" className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent" value={reportDate} onChange={(e) => setReportDate(e.target.value)} required />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              Requisitioning Office/Dept.: <input type="text" className="border-0 border-bottom ms-2 w-50 bg-transparent" value={requisitionOffice} onChange={(e) => setRequisitionOffice(e.target.value)} required />
            </div>
            <div className="d-flex align-items-center">
              Invoice No.: <input type="text" className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} required />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              Responsibility Center Code: <input type="text" className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent" value={responsibilityCenterCode} onChange={(e) => setResponsibilityCenterCode(e.target.value)} required />
            </div>
            <div className="d-flex align-items-center">
              Date: <input type="date" className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent" value={dateInspected} onChange={(e) => setDateInspected(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="border mb-4">
          <div className="row border-bottom">
            <div className="col border-end p-2">Stock/ Property No.</div>
            <div className="col border-end p-2">Description</div>
            <div className="col border-end p-2">Unit</div>
            <div className="col p-2">Quantity</div>
            <div className="col p-2">Price</div> 
          </div>
          {items.map((item, index) => (
        <div className="row border-bottom" key={index}>
          <div className="col border-end p-2">
            <input
              type="text"
              className="border-0 border-bottom w-100 bg-transparent"
              value={item.stockPropertyNo}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].stockPropertyNo = e.target.value;
                setItems(newItems);
              }}
            />
          </div>
          <div className="col border-end p-2">
            <input
              type="text"
              className="border-0 border-bottom w-100 bg-transparent"
              value={item.description}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].description = e.target.value;
                setItems(newItems);
              }}
            />
          </div>
          <div className="col border-end p-2">
            <input
              type="text"
              className="border-0 border-bottom w-100 bg-transparent"
              value={item.unit}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].unit = e.target.value;
                setItems(newItems);
              }}
            />
          </div>
          <div className="col border-end p-2">
            <input
              type="number"
              className="border-0 border-bottom w-100 text-danger bg-transparent"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = e.target.value;
                setItems(newItems);
              }}
            />
          </div>
          <div className="col p-2">
            <input
              type="number"
              className="border-0 border-bottom w-100 text-danger bg-transparent"
              value={item.price}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].price = e.target.value;
                setItems(newItems);
              }}
            />
          </div>
        </div>
      ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={addItem}>Add Item</button>
        </div>
        <div className="row border mb-4">
          <div className="col border-end p-2">
            <div className="fw-bold mb-2">INSPECTION</div>
            <div className="mb-2">Date Inspected:</div>
            <div className="mb-2">
              <input type="checkbox" className="me-2" checked={inspectionStatus} onChange={(e) => setInspectionStatus(e.target.checked)} /> Inspected, verified and found in order as to quantity and specifications
            </div>
            {inspectionOfficers.map((officer, index) => (
              <div className="border-top p-2" key={index}>
                <input type="text" className="border-0 border-bottom w-100 bg-transparent" placeholder="Inspection Officer/Inspection Committee" value={officer.officerName} onChange={(e) => {
                  const newOfficers = [...inspectionOfficers];
                  newOfficers[index].officerName = e.target.value;
                  setInspectionOfficers(newOfficers);
                }} required />
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={addOfficer}>Add Officer</button>
          </div>
          <div className="col p-2">
            <div className="fw-bold mb-2">ACCEPTANCE</div>
            <div className="mb-2">
              <label>
                <input type="radio" name="acceptanceStatus" checked={acceptanceStatus === 'Complete'} onChange={() => setAcceptanceStatus('Complete')} /> Complete
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input type="radio" name="acceptanceStatus" checked={acceptanceStatus === 'Partial'} onChange={() => setAcceptanceStatus('Partial')} /> Partial (pls. specify quantity)
              </label>
            </div>
            <div className="border-top text-end p-2">
              <div>Supply Officer-Designate: <input type="text" className="border-0 border-bottom w-50 bg-transparent" value={supplyOfficer} onChange={(e) => setSupplyOfficer(e.target.value)} required /></div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default InspectionReport;