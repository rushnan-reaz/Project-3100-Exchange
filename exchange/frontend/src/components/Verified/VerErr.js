const VerificationFailedPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Email Verification Failed</h1>
            <p>It seems your verification link is invalid or expired.</p>
            <a href="/login">
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Try Again</button>
            </a>
        </div>
    );
};

export default VerificationFailedPage;
