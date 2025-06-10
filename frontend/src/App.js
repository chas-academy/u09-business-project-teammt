import './App.css';
import { cookbookApi } from './api/cookbookApi';
import { spoonacularApi } from './api/spoonacularApi';
import CookBookCard from './components/CookBookCard';
import AddCookbookModal from './components/AddCookbookModal';
import { useState, useEffect } from 'react';
import SearchResult from './components/SearchResults';

function App() {
  const [cookbooks, setCookbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadAllBooks();
  }, []);

  async function loadAllBooks() {
    try {
      const data = await cookbookApi.getAll();
      setCookbooks(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;
    const sr = await spoonacularApi.search(searchQuery.trim());
    console.log(sr);
    setSearchResults(sr);
  }

  return (
    <div className="App">
      <h1>My Cookbooks</h1>

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
    </div>
  );
}

export default App;
