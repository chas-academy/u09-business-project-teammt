import './App.css';
import { cookbookApi } from './api/cookbookApi';
import { spoonacularApi } from './api/spoonacularApi';
import CookBookCard from './components/CookBookCard';
import AddCookbookModal from './components/AddCookbookModal';
import { useState, useEffect } from 'react';
import SearchResult from './components/SearchResults';

function App() {
  const [user, setUser] = useState(null);
  const [cookbooks, setCookbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  // Load cookbooks when user is authenticated
  useEffect(() => {
    if (user) {
      loadAllBooks();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
    const baseUrl = process.env.REACT_APP_BE_URL || 'http://localhost:3000';
        const fullUrl = `${baseUrl}/auth/user`;

        console.log('🔍 Environment variable REACT_APP_BE_URL:', process.env.REACT_APP_BE_URL);
        console.log('🔍 Base URL being used:', baseUrl);
        console.log('🔍 Full fetch URL:', fullUrl);

        const res = await fetch(fullUrl, {
          credentials: "include"
        });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log('Error fetching user:', error);
      setUser(null);
    } finally {
       console.log(user)
      setLoading(false);
    }
  };

  const login = () => {
    window.open(`${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/auth/google`, "_self");
  };

  const logout = async () => {
     try {
        // Clear backend session
        await fetch(`${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/auth/logout`, {
          credentials: "include"
        });

        // Clear local state
        setUser(null);
        setCookbooks([]);
        setSearchResults([]);
        setSearchQuery('');

      } catch (error) {
        console.log('Error logging out:', error);
      }
  };

  async function loadAllBooks() {
    if (!user) return;

    try {
      const data = await cookbookApi.getAll();
      setCookbooks(data);
    } catch (err) {
      console.log('Error loading cookbooks:', err.message);
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    try {
      const sr = await spoonacularApi.search(searchQuery.trim());
      console.log(sr);
      setSearchResults(sr);
    } catch (err) {
      console.log('Error searching recipes:', err.message);
    }
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>My Cookbooks</h1>

      {user ? (
        <>
          {/* User is logged in - show full app */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <img
              src={user.picture}
              alt="Profile"
              style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }}
            />
            <span style={{ marginRight: '10px' }}>Welcome, {user.name}!</span>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>

          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Search recipes..."
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>

            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((res) => (
                  <SearchResult
                    key={res.id}
                    recipe={res}
                    cookbooklist={cookbooks}
                    refrashFun={loadAllBooks}
                  />
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setShowAddModal(true)} className="add-cookbook-button">
            + Add New Cookbook
          </button>

          <div className="cookbook-grid">
            {cookbooks.map((cookbook) => (
              <CookBookCard key={cookbook._id} cookbook={cookbook} refrashFun={loadAllBooks} />
            ))}
          </div>

          <AddCookbookModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            refrashFun={loadAllBooks}
          />
        </>
      ) : (
        /* User is not logged in - show login */
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Google OAuth2</h2>
          <p>Please login with Google to access your personal cookbooks.</p>
          <button
            onClick={login}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;