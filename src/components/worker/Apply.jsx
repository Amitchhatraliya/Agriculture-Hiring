import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationBg from '../../assets/landing/images/Application.jpg';

export const Apply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    resume: null,
    coverLetter: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('resume', formData.resume);
    data.append('coverletter', formData.coverLetter); // name must match backend expectation

    try {
      const response = await fetch('http://localhost:4000/jobapplication/addjobapplicationwithfile', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Application submitted successfully!');
      navigate('/workerdashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your application.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Job Application</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="resume" style={styles.label}>Resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
              style={styles.fileInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="coverLetter" style={styles.label}>Cover Letter:</label>
            <input
              type="file"
              id="coverLetter"
              name="coverLetter"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
              style={styles.fileInput}
            />
          </div>

          <button type="submit" style={styles.submitButton}>Submit Application</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundImage: `url(${ApplicationBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '90%',
    maxWidth: '600px',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '28px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold',
    color: '#444'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px'
  },
  fileInput: {
    padding: '6px',
    fontSize: '16px'
  },
  submitButton: {
    padding: '12px 18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s'
  }
};

export default Apply;
