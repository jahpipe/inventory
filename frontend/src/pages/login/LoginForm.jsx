import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 

axios.defaults.baseURL = 'http://localhost:8000'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Submitting:', { username, password, role: 'admin' });

    try {
      const response = await axios.post('/api/login', { username, password, role: 'admin' });
      console.log('Server response:', response.data);

      if (response.status === 200) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role === 'admin') {
          navigate('/dashboardAdmin'); 
        } else {
          throw new Error('Invalid role');
        }
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.response?.data?.message || 'Unable to connect to the server.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" 
      style={{ 
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        color: '#fff'
      }}
    >
      <div 
        className={`card p-4 shadow-lg ${shake ? 'animate-shake' : ''}`} 
        style={{ 
          maxWidth: '400px', 
          width: '100%', 
          borderRadius: '12px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff'
        }}
      >
        <div className="text-center mb-4">
          <img 
            src="/ai.webp" 
            alt="Logo" 
            className="img-fluid" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              border: '3px solid #fff', 
              boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)'
            }} 
          />
        </div>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-transparent text-white border-light"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Username
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control bg-transparent text-white border-light"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Password
            </label>
          </div>

          <button 
            type="submit" 
            className="btn w-100 mt-2"
            style={{ 
              background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: '0.3s ease'
            }}
            disabled={loading}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
      <footer className="text-white mt-4 text-center">
     © {new Date().getFullYear()} Moreno. All rights reserved.
    </footer>
    </div>
  );
};

export default LoginForm;
  