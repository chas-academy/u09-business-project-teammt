import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authToken');

    if (authToken) {
      localStorage.setItem('authToken', authToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const baseUrl = process.env.REACT_APP_BE_URL || 'http://localhost:3000';

      const res = await fetch(`${baseUrl}/auth/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: authToken }),
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      await fetch(`${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: authToken }),
        credentials: 'include',
      });
      localStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/" />} 
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;