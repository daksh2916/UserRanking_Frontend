import React, { useState } from 'react';
import axios from 'axios';
import './CreateUserForm.css'; 

function CreateUserForm() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate name and score fields (optional)
      if (!name.trim() || !score.trim()) {
        setMessage('Name and score are required.');
        return;
      }

      // Convert userId to a number
      const userIdNumber = Number(userId);

      // Submit form if userId is a valid number
      if (!isNaN(userIdNumber)) {
        const today = new Date();
        const createdAt = today.toISOString(); // Format: YYYY-MM-DDTHH:MM:SS.mmmZ
        const updatedAt = today.toISOString();

        await axios.post('http://localhost:3000/api/v1/createuserscore', { 
          name, 
          userId: userIdNumber, 
          score,
          createdAt,
          updatedAt
        });
        
        setMessage('User created successfully.');
        setName('');
        setUserId('');
        setScore('');
      } else {
        setMessage('User ID must be a number.');
      }
    } catch (error) {
      setMessage('Failed to create user.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create User Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateUserForm;
