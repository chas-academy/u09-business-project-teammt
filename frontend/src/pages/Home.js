import { cookbookApi } from '../api/cookbookApi';
import { spoonacularApi } from '../api/spoonacularApi';
import CookBookCard from '../components/CookBookCard';
import AddCookbookModal from '../components/AddCookbookModal';
import { useState, useEffect } from 'react';
import SearchResult from '../components/SearchResults';

const Home = ({ user }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadAllBooks();
    }
  }, [user]);

  const login = () => {
    window.open(`${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/auth/google`, '_self');
  };

  async function loadAllBooks() {
    if (!user) return;

    try {
      const data = await cookbookApi.getAll();
      setCookbooks(data || []);
    } catch (err) {
      console.log('Error loading cookbooks:', err.message);
      setCookbooks([]);
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

  return (
    <div style={{ padding: '0 20px' }}>
      {user ? (
        <>
          {/* User is logged in - show full app */}
          <h1>Welcome to Your Cookbook Collection!</h1>

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
          <h1>Welcome to My Cookbooks</h1>
          <h2>Organize Your Favorite Recipes</h2>
          <p>Please login with Google to access your personal cookbooks and start saving your favorite recipes.</p>
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
              fontWeight: '500',
            }}
          >
            Login with Google
          </button>

          <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto', textAlign: 'left' }}>
            <h3>Features:</h3>
            <ul style={{ lineHeight: '2' }}>
              <li>🔍 Search thousands of recipes from Spoonacular API</li>
              <li>📚 Create custom cookbooks to organize your recipes</li>
              <li>💾 Save your favorite recipes to different collections</li>
              <li>👤 Personal account with Google OAuth authentication</li>
              <li>📱 View detailed recipe information including ingredients and instructions</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;