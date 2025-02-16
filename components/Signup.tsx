// app/Signup.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signing up with:', { firstName, lastName, email, password });
  };

  return (
    <div className="container">
      <div className="left">
        <Image
          alt="A scenic view of a mountain under a purple sky"
          height={800}
          src="https://storage.googleapis.com/a1aa/image/GWJUgtnXf6WezE3pENKUuvs1CRDQTWKOr8TuS1CF3AeARo9nA.jpg"
          width={600}
        />
      </div>
      <div className="right">
        <h2>Create an account</h2>
        <p>Already have an account? <Link href="/login">Log in</Link></p>
        <form action="/user/register" id="signup_form" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fName"
            id="first_name"
            placeholder="First name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lName"
            id="last_name"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="user_mail_id"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
 <div className="checkbox-container">
            <input id="terms" type="checkbox" required />
            <label htmlFor="terms">
              I agree to the <Link href="#">Terms &amp; Conditions</Link>
            </label>
          </div>
          <button type="submit">Create account</button>
        </form>
        <div className="or-register">Or register with</div>
        <div className="social-buttons">
          <button>
            <i className="fab fa-google"></i> Google
          </button>
          <button>
            <i className="fab fa-apple"></i> Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;