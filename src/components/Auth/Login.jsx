// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';

// const Login = ({ setIsAuthenticated }) => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', formData);
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('user', JSON.stringify(response.data.data.user));
//             setIsAuthenticated(true);
//             navigate('/');
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-box">
//                 <h2>Login</h2>
//                 {error && <div className="error-message">{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="auth-button">Login</button>
//                 </form>
//                 <p className="auth-switch">
//                     Don&apos;t have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const BACKEND_URL = 'https://notesapp-backend-6auh.onrender.com';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
