import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/landing/css/signup.css'; // Ensure this CSS file is correctly linked

export const Signup = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Redirect to the respective signup page based on the selected role
    switch (role) {
      case 'Employer':
        navigate('/employeesignup');
        break;
      case 'Worker':
        navigate('/workersignup');
        break;
      case 'Admin':
        navigate('/adminsignup');
        break;
      default:
        break;
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Join Agriculture Hiring</h1>
          <p>Select your role to get started!</p>
        </div>
        <div className="role-selection">
          <button className="role-button" onClick={() => handleRoleSelection('Employer')}>
            Employer
          </button>
          <button className="role-button" onClick={() => handleRoleSelection('Worker')}>
            Worker
          </button>
          {/* <button className="role-button" onClick={() => handleRoleSelection('Admin')}>
            Admin
          </button> */}
        </div>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};