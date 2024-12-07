import { useState } from 'react';
// import './CSS/login_page.css';

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        studentId: '',
        password: ''
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', loginData);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log('Register Data:', registerData);
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <p>{isRegister ? 'Register' : 'Login'}</p>
                <div className="auth-login">
                    {isRegister ? (
                        <form className="auth-login-container" onSubmit={handleRegisterSubmit}>
                            <div className="input-field">
                                <p>First Name</p>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={registerData.firstName}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <p>Last Name</p>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={registerData.lastName}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <p>Department</p>
                                <input
                                    type="text"
                                    name="department"
                                    value={registerData.department}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <p>Student ID</p>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={registerData.studentId}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>

                            {/* Notice about username */}
                            <p className="username-notice">
                                Username will be generated automatically.
                            </p>

                            <button type="submit">Register</button>
                        </form>
                    ) : (
                        <form className="auth-login-container" onSubmit={handleLoginSubmit}>
                            <div className="input-field">
                                <p>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    )}
                    <button className="toggle-form" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
