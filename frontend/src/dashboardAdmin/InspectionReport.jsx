import React, { useState, useEffect } from 'react';

const InspectionReport = () => {
  // State for form fields
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
  const [reports, setReports] = useState([]);
  const [searchIarNo, setSearchIarNo] = useState('');
  const [filteredReport, setFilteredReport] = useState(null);
  

  // State for inspection items and officers
  const [items, setItems] = useState([{ stockPropertyNo: '', description: '', unit: '', quantity: '', price: '' }]);
  const [inspectionOfficers, setInspectionOfficers] = useState([{ officerName: '', role: '' }]);


  const updateItemField = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
  
  const updateOfficerField = (index, field, value) => {
    const newOfficers = [...inspectionOfficers];
    newOfficers[index][field] = value;
    setInspectionOfficers(newOfficers);
  };
  
  // Fetch reports from the backend
  useEffect(() => {
    if (activeTab === 'view') {
      fetchReports();
    }
  }, [activeTab]);
  

  // Improved error handling in fetchReports
const fetchReports = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/inspection-reports');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch reports');
    }
    const data = await response.json();
    setReports(data);
  } catch (error) {
    console.error('Error fetching reports:', error);
    alert(error.message || 'Failed to fetch reports. Please try again later.');
  }
};
  

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save inspection report');
      }

      const result = await response.json();
      alert('Inspection report saved successfully!');
      console.log('Report ID:', result.reportId);
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

  // Handle IAR No. search with partial matching
  const handleSearch = () => {
    if (!searchIarNo) {
      alert('Please enter an IAR No. to search.');
      return;
    }

    const foundReport = reports.find(report => report.iarNo.includes(searchIarNo));
    if (foundReport) {
      setFilteredReport(foundReport);
    } else {
      alert('No report found with the provided IAR No.');
      setFilteredReport(null);
    }
  };

  return (
    <div className="container mt-4 border p-4">
      <div className="mb-4">
        <button
          className={`btn ${activeTab === 'create' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Report
        </button>
        <button
          className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-secondary'} ms-2`}
          onClick={() => setActiveTab('view')}
        >
          View Reports
        </button>
      </div>

      {activeTab === 'create' ? (
        <form onSubmit={handleSubmit}>
          <div className="text-end text-sm mb-2">Appendix 62</div>
          <div className="text-center fw-bold fs-5 mb-4">INSPECTION AND ACCEPTANCE REPORT</div>

          {/* Form Fields */}
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

          {/* Items Table */}
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
    {/* Stock/Property No. */}
    <div className="col border-end p-2">
      <input
        type="text"
        className="border-0 border-bottom w-100 bg-transparent"
        value={item.stockPropertyNo}
        onChange={(e) => updateItemField(index, 'stockPropertyNo', e.target.value)}
      />
    </div>

    {/* Description */}
    <div className="col border-end p-2">
      <input
        type="text"
        className="border-0 border-bottom w-100 bg-transparent"
        value={item.description}
        onChange={(e) => updateItemField(index, 'description', e.target.value)}
      />
    </div>

    {/* Unit */}
    <div className="col border-end p-2">
      <input
        type="text"
        className="border-0 border-bottom w-100 bg-transparent"
        value={item.unit}
        onChange={(e) => updateItemField(index, 'unit', e.target.value)}
      />
    </div>

    {/* Quantity */}
    <div className="col border-end p-2">
      <input
        type="number"
        className="border-0 border-bottom w-100 text-danger bg-transparent"
        value={item.quantity}
        onChange={(e) => updateItemField(index, 'quantity', e.target.value)}
      />
    </div>

    {/* Price */}
    <div className="col p-2">
      <input
        type="number"
        className="border-0 border-bottom w-100 text-danger bg-transparent"
        value={item.price}
        onChange={(e) => updateItemField(index, 'price', e.target.value)}
      />
    </div>
  </div>
))}
            <button type="button" className="btn btn-secondary mt-2" onClick={addItem}>Add Item</button>
          </div>

          {/* Inspection and Acceptance Section */}
          <div className="row border mb-4">
            <div className="col border-end p-2">
              <div className="fw-bold mb-2">INSPECTION</div>
              <div className="mb-2">Date Inspected:</div>
              <div className="mb-2">
              <input type="checkbox" className="me-2" checked={inspectionStatus} onChange={(e) => setInspectionStatus(e.target.checked)} /> Inspected, verified and found in order as to quantity and specifications
              </div>
              {inspectionOfficers.map((officer, index) => (
                <div className="border-top p-2" key={index}>
                  <input
                    type="text"
                    className="border-0 border-bottom w-100 bg-transparent"
                    placeholder="Inspection Officer/Inspection Committee"
                    value={officer.officerName}
                    onChange={(e) => updateOfficerField(index, 'officerName', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="border-0 border-bottom w-100 bg-transparent mt-2"
                    placeholder="Role"
                    value={officer.role}
                    onChange={(e) => updateOfficerField(index, 'role', e.target.value)}
                  />
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
      ) : (
        <div>
          <h2>Inspection Reports</h2>

          {/* Search Bar for IAR No. */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter IAR No. (partial match allowed)"
              value={searchIarNo}
              onChange={(e) => setSearchIarNo(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
          </div>

          {/* Display filtered report or all reports */}
          {filteredReport ? (
            <div className="border p-4 mb-4 shadow-sm">
              <div className="text-end text-sm mb-2">Appendix 62</div>
              <div className="text-center fw-bold fs-5 mb-4">INSPECTION AND ACCEPTANCE REPORT</div>

              {/* Display Report Details */}
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    Entity Name: <span className="ms-2">{filteredReport.entityName}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    Fund Cluster: <span className="ms-2">{filteredReport.fundCluster}</span>
                  </div>
                </div>
              </div>

              <div className="border p-2 mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    Suppliers: <span className="ms-2">{filteredReport.supplier}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    IAR No.: <span className="ms-2">{filteredReport.iarNo}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    Contract No: <span className="ms-2 text-danger">{filteredReport.contractNo}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    Date: <span className="ms-2 text-danger">{filteredReport.reportDate}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    Requisitioning Office/Dept.: <span className="ms-2">{filteredReport.requisitionOffice}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    Invoice No.: <span className="ms-2 text-danger">{filteredReport.invoiceNo}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    Responsibility Center Code: <span className="ms-2 text-danger">{filteredReport.responsibilityCenterCode}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    Date: <span className="ms-2 text-danger">{filteredReport.dateInspected}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border mb-4">
  <div className="row border-bottom">
    <div className="col border-end p-2">Stock/ Property No.</div>
    <div className="col border-end p-2">Description</div>
    <div className="col border-end p-2">Unit</div>
    <div className="col border-end p-2">Quantity</div>
    <div className="col p-2">Price</div>
  </div>

  {filteredReport && filteredReport.items && filteredReport.items.length > 0 ? (
  filteredReport.items.map((item, index) => (
    <div className="row border-bottom" key={index}>
      <div className="col border-end p-2">{item.stockPropertyNo || 'N/A'}</div>
      <div className="col border-end p-2">{item.description || 'N/A'}</div>
      <div className="col border-end p-2">{item.unit || 'N/A'}</div>
      <div className="col border-end p-2">{item.quantity || 0}</div>
      <div className="col p-2">{item.price || 0}</div>
    </div>
  ))
) : (
  <div className="p-2">No items found.</div>
)}
</div>


              {/* Inspection and Acceptance Section */}
              <div className="row border mb-4">
                <div className="col border-end p-2">
                  <div className="fw-bold mb-2">INSPECTION</div>
                  <div className="mb-2">Date Inspected:</div>
                  <div className="mb-2">
                    <input type="checkbox" className="me-2" checked={filteredReport.inspectionStatus} disabled /> Inspected, verified and found in order as to quantity and specifications
                  </div>
                  {filteredReport.inspectionOfficers.map((officer, idx) => (
                    <div className="border-top p-2" key={idx}>
                      <span>{officer.officerName}</span>
                    </div>
                  ))}
                </div>
                <div className="col p-2">
                  <div className="fw-bold mb-2">ACCEPTANCE</div>
                  <div className="mb-2">
                    <label>
                      <input type="radio" name="acceptanceStatus" checked={filteredReport.acceptanceDetails.isComplete} disabled /> Complete
                    </label>
                  </div>
                  <div className="mb-2">
                    <label>
                      <input type="radio" name="acceptanceStatus" checked={filteredReport.acceptanceDetails.isPartial} disabled /> Partial (pls. specify quantity)
                    </label>
                  </div>
                  <div className="border-top text-end p-2">
                    <div>Supply Officer-Designate: <span>{filteredReport.acceptanceDetails.supplyOfficer}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No report found. Please search by IAR No.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InspectionReport;