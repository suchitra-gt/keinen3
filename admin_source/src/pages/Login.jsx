import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('admin_token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            height: '100vh', 
            background: '#0A0A0A', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'monospace'
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '400px', 
                background: '#111', 
                padding: '40px', 
                borderRadius: '12px', 
                border: '1px solid #222',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: '#E8342A', 
                        borderRadius: '10px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: '900',
                        margin: '0 auto 15px'
                    }}>K</div>
                    <h2 style={{ letterSpacing: '4px', fontSize: '18px' }}>ADMIN ACCESS</h2>
                    <p style={{ color: '#444', fontSize: '10px', marginTop: '5px' }}>SECURE COMMAND CENTER GATEWAY</p>
                </div>

                {error && (
                    <div style={{ 
                        background: 'rgba(232, 52, 42, 0.1)', 
                        border: '1px solid #E8342A', 
                        color: '#E8342A', 
                        padding: '10px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '10px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>Operator ID</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', background: '#0A0A0A', border: '1px solid #222', padding: '12px', color: 'white', borderRadius: '6px', outline: 'none' }}
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontSize: '10px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>Access Code</label>
                        <input 
                            type="password" 
                            style={{ width: '100%', background: '#0A0A0A', border: '1px solid #222', padding: '12px', color: 'white', borderRadius: '6px', outline: 'none' }}
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            background: '#E8342A', 
                            color: 'white', 
                            border: 'none', 
                            padding: '14px', 
                            borderRadius: '6px', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE ACCESS'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
