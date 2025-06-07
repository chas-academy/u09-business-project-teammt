import './App.css';
import { cookbookApi } from './api/cookbookApi';
import CookBookCard from './components/CookBookCard';

import { useState, useEffect } from 'react';

function App() {
  const [cookbooks, setCookbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="App">
      <h1>My Cookbooks</h1>
 <div className="search-section">
  
 </div>

    <div className="cookbook-grid">
        {cookbooks.map((cookbook) => (
          <CookBookCard key={cookbook._id} cookbook={cookbook}></CookBookCard>
        ))}
      </div>
    </div>
  );
}

export default App;
