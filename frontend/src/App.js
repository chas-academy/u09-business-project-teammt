import './App.css';
import { cookbookApi } from './api/cookbookApi';
import { spoonacularApi } from './api/spoonacularApi';

import CookBookCard from './components/CookBookCard';

import { useState, useEffect } from 'react';
import SearchResult from './components/SearchResults';

function App() {
  const [cookbooks, setCookbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>

        {searchResults.length > 0 &&
          searchResults.map((res) => {
            return (
              <SearchResult
                key={res.id}
                recipe={res}
                cookbooklist={cookbooks}
                refrashFun={loadAllBooks}
              />
            );
          })}
      </div>

      <div className="cookbook-add">
         <button onClick={handleSearch} className="search-button">
          Add CookBook
        </button>
      </div>




      <div className="cookbook-grid">
        {cookbooks.map((cookbook) => (
          <CookBookCard
            key={cookbook._id}
            cookbook={cookbook}
            refrashFun={loadAllBooks}
          ></CookBookCard>
        ))}
      </div>
    </div>
  );
}

export default App;
