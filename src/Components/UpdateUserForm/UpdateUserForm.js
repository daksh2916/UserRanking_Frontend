import React, { useState } from 'react';
import axios from 'axios';
import './UpdateUserForm.css'; 

function UpdateUserForm() {
  const [userId, setUserId] = useState('');
  const [newScore, setNewScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user exists with given userId
      const response = await axios.get(`http://localhost:3000/api/v1/user/${userId}`);
      if (!response.data) {
        setMessage('User with this ID does not exist!');
        return;
      }

      // If user exists, proceed to update
      await axios.put(`http://localhost:3000/api/v1/updateuserscore/${userId}`, { score: newScore });
      setMessage('User score updated successfully.');
      setUserId('');
      setNewScore('');
    } catch (error) {
      setMessage('Failed to update user score.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update User Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="number" placeholder="New Score" value={newScore} onChange={(e) => setNewScore(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdateUserForm;
