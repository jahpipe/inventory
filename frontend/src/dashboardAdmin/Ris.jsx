import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ris = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    entityName: '',
    fundCluster: '',
    division: '',
    responsibilityCenterCode: '',
    office: '',
    risNo: '',
    items: Array(25).fill({
      stockNo: '',
      unit: '',
      description: '',
      quantity: '',
      stockAvailableYes: false,
      stockAvailableNo: false,
      issueQuantity: '',
      remarks: '',
    }),
    purpose: '',
    requestedBy: { signature: '', printedName: '', designation: '', date: '' },
    approvedBy: { signature: '', printedName: '', designation: '', date: '' },
    issuedBy: { signature: '', printedName: '', designation: '', date: '' },
    receivedBy: { signature: '', printedName: '', designation: '', date: '' },
  });

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('items')) {
      const updatedItems = [...formData.items];
      const field = name.split('.')[1];
      updatedItems[index] = { ...updatedItems[index], [field]: type === 'checkbox' ? checked : value };
      setFormData({ ...formData, items: updatedItems });
    } else if (name.startsWith('requestedBy') || name.startsWith('approvedBy') || name.startsWith('issuedBy') || name.startsWith('receivedBy')) {
      const [person, field] = name.split('.');
      setFormData({
        ...formData,
        [person]: { ...formData[person], [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/inspection-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="container py-4">
      <div className="card p-4">
        <h1 className="text-center fw-bold mb-4">REQUISITION AND ISSUE SLIP</h1>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Entity Name:</label>
              <input
                type="text"
                className="form-control"
                name="entityName"
                value={formData.entityName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Fund Cluster:</label>
              <input
                type="text"
                className="form-control"
                name="fundCluster"
                value={formData.fundCluster}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Division:</label>
              <input
                type="text"
                className="form-control"
                name="division"
                value={formData.division}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Responsibility Center Code:</label>
              <input
                type="text"
                className="form-control"
                name="responsibilityCenterCode"
                value={formData.responsibilityCenterCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Office:</label>
              <input
                type="text"
                className="form-control"
                name="office"
                value={formData.office}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">RIS No.:</label>
              <input
                type="text"
                className="form-control"
                name="risNo"
                value={formData.risNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered text-center mb-4" style={{ fontSize: '12px', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th colSpan="4">Requisition</th>
                  <th colSpan="2">Stock Available?</th>
                  <th colSpan="2">Issue</th>
                </tr>
                <tr>
                  <th style={{ width: '12%' }}>Stock No.</th>
                  <th style={{ width: '10%' }}>Unit</th>
                  <th style={{ width: '25%' }}>Description</th>
                  <th style={{ width: '10%' }}>Quantity</th>
                  <th style={{ width: '8%' }}>Yes</th>
                  <th style={{ width: '8%' }}>No</th>
                  <th style={{ width: '12%' }}>Quantity</th>
                  <th style={{ width: '15%' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.stockNo`}
                        value={item.stockNo}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.unit`}
                        value={item.unit}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.description`}
                        value={item.description}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.quantity`}
                        value={item.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name={`items.stockAvailableYes`}
                        checked={item.stockAvailableYes}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name={`items.stockAvailableNo`}
                        checked={item.stockAvailableNo}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.issueQuantity`}
                        value={item.issueQuantity}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name={`items.remarks`}
                        value={item.remarks}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <label className="form-label">Purpose:</label>
            <textarea
              className="form-control"
              rows="4"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <table className="table table-bordered text-center mb-4" style={{ fontSize: '14px' }}>
            <thead>
              <tr>
                <th></th>
                <th className="align-middle">Requested by:</th>
                <th className="align-middle">Approved by:</th>
                <th className="align-middle">Issued by:</th>
                <th className="align-middle">Received by:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold">Signature</td>
                <td className="py-4">
                  <input
                    type="text"
                    className="form-control"
                    name="requestedBy.signature"
                    value={formData.requestedBy.signature}
                    onChange={handleInputChange}
                  />
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    className="form-control"
                    name="approvedBy.signature"
                    value={formData.approvedBy.signature}
                    onChange={handleInputChange}
                  />
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    className="form-control"
                    name="issuedBy.signature"
                    value={formData.issuedBy.signature}
                    onChange={handleInputChange}
                  />
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    className="form-control"
                    name="receivedBy.signature"
                    value={formData.receivedBy.signature}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Printed Name</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="requestedBy.printedName"
                    value={formData.requestedBy.printedName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="approvedBy.printedName"
                    value={formData.approvedBy.printedName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="issuedBy.printedName"
                    value={formData.issuedBy.printedName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="receivedBy.printedName"
                    value={formData.receivedBy.printedName}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Designation</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="requestedBy.designation"
                    value={formData.requestedBy.designation}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="approvedBy.designation"
                    value={formData.approvedBy.designation}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="issuedBy.designation"
                    value={formData.issuedBy.designation}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="receivedBy.designation"
                    value={formData.receivedBy.designation}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Date</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="requestedBy.date"
                    value={formData.requestedBy.date}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="approvedBy.date"
                    value={formData.approvedBy.date}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="issuedBy.date"
                    value={formData.issuedBy.date}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="receivedBy.date"
                    value={formData.receivedBy.date}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ris;