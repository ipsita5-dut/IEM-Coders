// app/Login.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="container">
      <div className="left">
        <Image
          alt="A beautiful desert landscape with a gradient sky"
          height={800}
          src="https://storage.googleapis.com/a1aa/image/OaDjwIhzzILfVSPYMcvUBM7FJ36ZiLgkRMgyBexey2lf8B8PB.jpg"
          width={600}
        />
      </div>
      <div className="right-section">
        <form id="login_form" onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p>Enter your email and password</p>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <div className="input-field">
              <input
                type="email"
                name="email"
                id="user_mail_id"
                placeholder="Enter Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-field">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Link href="#" className="forgot-password">Forgot Password?</Link>
          <button type="submit" className="btn-signin">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;