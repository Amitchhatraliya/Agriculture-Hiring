import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../../assets/landing/css/login.css';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/worker/loginworker", data);

      if (res.status === 200 && res.data?.data?.roleId?.name) {
        const user = res.data.data;
        const role = user.roleId.name.toUpperCase();

        toast.success(`✅ Logged in Successfully as ${role}`, {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        localStorage.setItem("id", user._id);
        localStorage.setItem("roles", role);

        setTimeout(() => {
          if (role === "WORKER") {
            navigate("/workerdashboard");
          } else if (role === "EMPLOYEE") {
            navigate("/employerdashboard");
          } else {
            navigate("/"); // fallback
          }
        }, 1000);

        return;
      }
    } catch (error) {
      toast.error('❌ Invalid email or password', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
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
    <div className="login-container">
      <div className="login-card">
        <ToastContainer />
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p><strong>Login to your Agriculture Hiring account</strong></p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
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

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
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
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {passwordStrength && (
              <div className="password-strength">
                Password Strength: <span className={`strength-${passwordStrength.toLowerCase().replace(' ', '-')}`}>{passwordStrength}</span>
              </div>
            )}
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
  <input type="checkbox" id="remember" style={{ marginRight: '8px' }} />
  <label htmlFor="remember">Remember Me</label>
</div>


          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Login'}
          </button>

          {/* <div className="social-login">
            <p>Or login with</p>
            <div className="social-buttons">
              <button type="button" className="google-button">
                <FontAwesomeIcon icon={faGoogle} /> Google
              </button>
              <button type="button" className="facebook-button">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </button>
            </div>
          </div> */}

          <div className="forgot-password">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
