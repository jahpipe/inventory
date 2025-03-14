import React, { useEffect, useState } from 'react';

const IARList = () => {
  const [iarList, setIarList] = useState([]);

  useEffect(() => {
    const fetchIARs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/inspection-reports');
        if (!response.ok) {
          throw new Error('Failed to fetch IARs');
        }
        const data = await response.json();
        setIarList(data);
      } catch (error) {
        console.error('Error fetching IARs:', error);
      }
    };

    fetchIARs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>List of IARs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>IAR No.</th>
            <th>Entity Name</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {iarList.map((iar) => (
            <tr key={iar._id}>
              <td>{iar.iarNo}</td>
              <td>{iar.entityName}</td>
              <td>{iar.supplier}</td>
              <td>{new Date(iar.reportDate).toLocaleDateString()}</td>
              <td>{iar.acceptanceDetails.isComplete ? 'Complete' : 'Partial'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IARList;