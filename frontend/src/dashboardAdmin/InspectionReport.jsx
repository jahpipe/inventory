import React, { useState } from 'react';
import axios from 'axios';

const InspectionReport = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    entityName: '',
    fundCluster: '',
    supplier: '',
    iarNo: '',
    contractNo: '',
    reportDate: '',
    requisitionOffice: '',
    invoiceNo: '',
    responsibilityCenterCode: '',
    items: Array(3).fill({ stockPropertyNo: '', description: '', unit: '', quantity: '' }),
    inspectionOfficers: Array(3).fill({ officerName: '', role: '' }),
    acceptanceDetails: {
      dateInspected: '',
      isComplete: false,
      isPartial: false,
      partialQuantity: '',
      supplyOfficer: '',
    },
  });

  // Handle input changes for top-level fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for items (dynamic rows)
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  // Handle input changes for inspection officers
  const handleOfficerChange = (e, index) => {
    const { name, value } = e.target;
    const updatedOfficers = [...formData.inspectionOfficers];
    updatedOfficers[index][name] = value;
    setFormData({ ...formData, inspectionOfficers: updatedOfficers });
  };

  // Handle input changes for acceptance details
  const handleAcceptanceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      acceptanceDetails: {
        ...formData.acceptanceDetails,
        [name]: type === 'checkbox' ? checked : value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/inspection-reports', formData);
      console.log('Report saved successfully:', response.data);
      alert('Inspection report submitted successfully!');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to submit inspection report. Please try again.');
    }
  };

  return (
    <div className="container mt-4 border p-4">
      <div className="text-end text-sm mb-2">Appendix 62</div>
      <div className="text-center fw-bold fs-5 mb-4">INSPECTION AND ACCEPTANCE REPORT</div>

      {/* Entity Name and Fund Cluster */}
      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            Entity Name:
            <input
              type="text"
              name="entityName"
              value={formData.entityName}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 bg-transparent"
            />
          </div>
          <div className="d-flex align-items-center">
            Fund Cluster:
            <input
              type="text"
              name="fundCluster"
              value={formData.fundCluster}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Supplier, IAR No., Contract No., etc. */}
      <div className="border p-2 mb-4">
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            Supplier:
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 bg-transparent"
            />
          </div>
          <div className="d-flex align-items-center">
            IAR No.:
            <input
              type="text"
              name="iarNo"
              value={formData.iarNo}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 bg-transparent"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            Contract No:
            <input
              type="text"
              name="contractNo"
              value={formData.contractNo}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent"
            />
          </div>
          <div className="d-flex align-items-center">
            Date:
            <input
              type="date"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            Requisitioning Office/Dept.:
            <input
              type="text"
              name="requisitionOffice"
              value={formData.requisitionOffice}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 bg-transparent"
            />
          </div>
          <div className="d-flex align-items-center">
            Invoice No.:
            <input
              type="text"
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            Responsibility Center Code:
            <input
              type="text"
              name="responsibilityCenterCode"
              value={formData.responsibilityCenterCode}
              onChange={handleInputChange}
              className="border-0 border-bottom ms-2 w-50 text-danger bg-transparent"
            />
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
        </div>
        {formData.items.map((item, index) => (
          <div className="row border-bottom" key={index}>
            <div className="col border-end p-2">
              <input
                type="text"
                name="stockPropertyNo"
                value={item.stockPropertyNo}
                onChange={(e) => handleItemChange(e, index)}
                className="border-0 border-bottom w-100 bg-transparent"
              />
            </div>
            <div className="col border-end p-2">
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(e, index)}
                className="border-0 border-bottom w-100 bg-transparent"
              />
            </div>
            <div className="col border-end p-2">
              <input
                type="text"
                name="unit"
                value={item.unit}
                onChange={(e) => handleItemChange(e, index)}
                className="border-0 border-bottom w-100 bg-transparent"
              />
            </div>
            <div className="col p-2">
              <input
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(e, index)}
                className="border-0 border-bottom w-100 text-danger bg-transparent"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inspection and Acceptance Section */}
      <div className="row border mb-4">
        <div className="col border-end p-2">
          <div className="fw-bold mb-2">INSPECTION</div>
          <div className="mb-2">Date Inspected:</div>
          <div className="mb-2">
            <input
              type="checkbox"
              name="isComplete"
              checked={formData.acceptanceDetails.isComplete}
              onChange={handleAcceptanceChange}
              className="me-2"
            />
            Inspected, verified and found in order as to quantity and specifications
          </div>
          {formData.inspectionOfficers.map((officer, index) => (
            <div className="border-top p-2" key={index}>
              <input
                type="text"
                name="officerName"
                value={officer.officerName}
                onChange={(e) => handleOfficerChange(e, index)}
                className="border-0 border-bottom w-100 bg-transparent"
                placeholder="Officer Name"
              />
              <input
                type="text"
                name="role"
                value={officer.role}
                onChange={(e) => handleOfficerChange(e, index)}
                className="border-0 border-bottom w-100 bg-transparent mt-2"
                placeholder="Role"
              />
            </div>
          ))}
        </div>
        <div className="col p-2">
          <div className="fw-bold mb-2">ACCEPTANCE</div>
          <div className="mb-2">
            <input
              type="checkbox"
              name="isComplete"
              checked={formData.acceptanceDetails.isComplete}
              onChange={handleAcceptanceChange}
              className="me-2"
            />
            Complete
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              name="isPartial"
              checked={formData.acceptanceDetails.isPartial}
              onChange={handleAcceptanceChange}
              className="me-2"
            />
            Partial (pls. specify quantity)
          </div>
          <div className="border-top text-end p-2">
            <div></div>
            <div>Supply Officer-Designate</div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default InspectionReport;