import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/landing/css/workersignup.css'; // Create a CSS file for custom styles

export const WorkerSignup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState('');

  const submitHandler = async (data) => {
    console.log(data);
    data.roleId = "67c660b3b22e1fed7fbf5b7e"; // Replace with the actual role ID for workers
    try {
      const res = await axios.post("/user/workersignup", data); // Adjust the API endpoint for worker signup
      if (res.status === 201) {
        toast.success('️✅ Successfully Signed up as Worker!', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login"); // Redirect to worker login page
      }
    } catch (error) {
      toast.error('❌ Error signing up. Please try again.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const checkPasswordStrength = (password) => {
    const strength = {
      0: "Weak",
      1: "Weak",
      2: "Medium",
      3: "Strong",
      4: "Very Strong",
    };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(strength[score]);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <ToastContainer
          position="top-center"
          autoClose={900}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="signup-header">
          <h1>Join Agriculture Hiring</h1>
          <p>Sign up as a worker and find your next job!</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
              placeholder="Enter your full name"
              {...register("fullname", { required: "Full name is required" })}
            />
            {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              className={`form-control ${errors.jobType ? 'is-invalid' : ''}`}
              {...register("jobType", { required: "Job type is required" })}
            >
              <option value="">Select Job Type</option>
              <option value="Harvesting">Harvesting</option>
              <option value="Planting">Planting</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Pruning">Pruning</option>
              <option value="Other">Other</option>
            </select>
            {errors.jobType && <div className="invalid-feedback">{errors.jobType.message}</div>}
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
              placeholder="Enter your experience (e.g., 2 years)"
              {...register("experience", { required: "Experience is required" })}
            />
            {errors.experience && <div className="invalid-feedback">{errors.experience.message}</div>}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              placeholder="Enter your location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
          </div>

          <div className="form-group">
            <label>Availability</label>
            <select
              className={`form-control ${errors.availability ? 'is-invalid' : ''}`}
              {...register("availability", { required: "Availability is required" })}
            >
              <option value="">Select Availability</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Seasonal">Seasonal</option>
            </select>
            {errors.availability && <div className="invalid-feedback">{errors.availability.message}</div>}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              className={`form-control ${errors.skills ? 'is-invalid' : ''}`}
              placeholder="Enter your skills (e.g., tractor driving, planting)"
              {...register("skills", { required: "Skills are required" })}
            />
            {errors.skills && <div className="invalid-feedback">{errors.skills.message}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) => {
                  checkPasswordStrength(value);
                  return true;
                },
              })}
            />
            {passwordStrength && (
              <div className="password-strength">
                Password Strength: <span className={`strength-${passwordStrength.toLowerCase().replace(' ', '-')}`}>{passwordStrength}</span>
              </div>
            )}
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
              placeholder="Enter password again"
              {...register("confirmpassword", {
                required: "Confirm password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmpassword && <div className="invalid-feedback">{errors.confirmpassword.message}</div>}
          </div>

          <button type="submit" className="signup-button">
            Signup as Worker
          </button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};