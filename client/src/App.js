import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://login-app-backend.azurewebsites.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      // ✅ Only parse JSON if response has content and correct header
      const isJson = res.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await res.json() : {};

      if (res.ok) {
        setMessage(data.message || 'Login successful');
      } else {
        setMessage('Login failed: ' + (data.message || res.statusText));
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
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


