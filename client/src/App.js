import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('https://<your-backend-url>/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage('Login failed: ' + data.message);
    }
  };

  return (
    <main className="App">
      <header>
        <h1>Login</h1>
      </header>
      <section>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label><br />

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label><br />

          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </section>
    </main>
  );
}

export default App;

