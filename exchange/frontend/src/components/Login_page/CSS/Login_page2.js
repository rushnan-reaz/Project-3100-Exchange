import React, { useState } from 'react';
import { auth, registerUser, loginUser } from '../../../firebase';


const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({ 
        email: '', 
        password: '' 
    });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e, formType) => {
        const { name, value } = e.target;
        setError('');
        if (formType === 'login') {
            setLoginData(prev => ({ ...prev, [name]: value }));
        } else {
            setRegisterData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await loginUser(loginData.email, loginData.password);
            // Redirect or handle successful login
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { firstName, lastName, department, studentId, email, password } = registerData;
            await registerUser(email, password, firstName, lastName, department, studentId);
            setIsRegister(false); // Switch to login after successful registration
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">{isRegister ? 'Register' : 'Login'}</h2>
            {error && <div className="error-message">{error}</div>}
            
            {isRegister ? (
                <form onSubmit={handleRegisterSubmit} className="login-form">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={registerData.firstName}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={registerData.lastName}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={registerData.department}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="text"
                        name="studentId"
                        placeholder="Student ID"
                        value={registerData.studentId}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleChange(e, 'register')}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={(e) => handleChange(e, 'login')}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => handleChange(e, 'login')}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            )}
            
            <button 
                onClick={() => {
                    setIsRegister(!isRegister);
                    setError('');
                }}
                className="switch-btn"
            >
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
};

export default LoginPage;
