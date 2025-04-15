import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ApplicationBg from '../../assets/landing/images/Application.jpg';

export const Apply = () => {
  const { jobId } = useParams();
  console.log('jobId from params:', jobId);

  const workerRaw = localStorage.getItem('WORKER');
console.log('WORKER from localStorage:', workerRaw);
const worker = workerRaw ? JSON.parse(workerRaw) : null;
console.log('Parsed worker:', worker);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    resume: null,
    coverLetter: null,
    workerId:  worker?.id || '', // Replace with actual worker ID from your auth system
    jobId: jobId
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    if (!formData.workerId || !formData.jobId) {
      setError("Missing worker ID or job ID.");
      setIsSubmitting(false);
      return;
    }
    

    try {
      const formDataToSend = new FormData();
      console.log("Submitting form with data:", formData);

      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('workerId', formData.workerId);
      formDataToSend.append('jobId', formData.jobId);
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      
      if (formData.coverLetter) {
        formDataToSend.append('coverletter', formData.coverLetter);
      }

      const response = await axios.post(
        'http://localhost:4000/jobapplication/addjobapplicationwithfile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Application submitted:', response.data);
      navigate('/workerdashboard');
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-container">
      <div className="form-container">
        <h2 className="form-title">Job Application</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Resume (PDF/DOC/DOCX):</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="file-input"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Cover Letter (Optional):</label>
            <input
              type="file"
              name="coverLetter"
              onChange={handleChange}
              className="file-input"
              accept=".pdf,.doc,.docx"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .apply-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-image: url(${ApplicationBg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 20px;
        }

        .form-container {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 550px;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-title {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 1.8rem;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 500;
          color: #34495e;
          font-size: 0.95rem;
        }

        .form-input {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }

        .file-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px dashed #ccc;
          border-radius: 6px;
          background-color: #f9f9f9;
        }

        .file-input:hover {
          border-color: #3498db;
        }

        .submit-button {
          background-color: #27ae60;
          color: white;
          padding: 0.9rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .submit-button:hover {
          background-color: #2ecc71;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-message {
          color: #e74c3c;
          background-color: #fdecea;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          border-left: 4px solid #e74c3c;
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        @media (max-width: 600px) {
          .form-container {
            padding: 1.5rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};