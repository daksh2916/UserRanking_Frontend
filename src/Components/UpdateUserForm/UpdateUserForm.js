import React, { useState } from 'react';
import axios from 'axios';
import './UpdateUserForm.css'; 


function UpdateUserForm() {
  const [userid, setUserid] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/api/v1/updateuserscore', {
        userid: parseInt(userid),
        score: parseInt(score)
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        // Optionally, you can reset the form here
        setUserid('');
        setScore('');
      } else {
        setMessage('Failed to update score');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className="form-container">
      <h2>Update User Score</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} />
        </label>
        <br />
        <label>
          Score:
          <input type="text" value={score} onChange={(e) => setScore(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Score</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateUserForm;