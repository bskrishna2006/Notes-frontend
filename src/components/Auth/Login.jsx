import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import img from '../../assets/Login.png';
const BACKEND_URL = 'http://localhost:5000';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            setIsAuthenticated(true);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-illustration">
                    <img src={img} alt="Login" className="auth-image" />
                </div>
                <div className="auth-form">
                    <h2>Welcome Back!</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-button">
                            Log In
                        </button>
                        <div className="auth-switch">
                            Don't have an account?
                            <Link to="/signup">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
