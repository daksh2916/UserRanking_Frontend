// CurrentDataPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './CurrentDataPage.css';

// Import statements...

function CurrentDataPage() {
  const [data, setData] = useState([]);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/data/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div className="current-data-page">
      <h2>Current Data Page</h2>
      <div className="button-container">
        <button onClick={() => fetchData('all')}>All Time Data</button>
        <button onClick={() => fetchData('lastmonth')}>Last Month Data</button>
        <button onClick={() => fetchData('lastweek')}>Last Week Data</button>
        <button onClick={() => fetchData('today')}>Today's Data</button>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.totalScore}</td> {/* Update property name to totalScore */}
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentDataPage;
