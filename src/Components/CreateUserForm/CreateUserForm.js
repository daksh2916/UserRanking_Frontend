import React, { useState } from 'react';
import axios from 'axios';
import './CreateUserForm.css'; 

function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    userid: '',
    score: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/createuserscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`User created successfully `);
        setFormData({
          name: '',
          userid: '',
          score: ''
        });
      } else {
        throw new Error('Failed to create user score');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="form-container">
      <h1>Create User Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          User ID:
          <input
            type="number"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Score:
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CreateUserForm;
