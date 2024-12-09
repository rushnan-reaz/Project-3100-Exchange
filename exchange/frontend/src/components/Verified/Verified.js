const Verified = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Email Verified Successfully!</h1>
            <p>Your email has been successfully verified. You can now log in.</p>
            <a href="/login">
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Login</button>
            </a>
        </div>
    );
};

export default Verified;
