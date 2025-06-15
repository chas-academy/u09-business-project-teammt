import { useState, useEffect } from 'react';
import { cookbookApi } from '../api/cookbookApi';

const Profile = ({ user }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [stats, setStats] = useState({
    totalCookbooks: 0,
    totalRecipes: 0,
    joinDate: ''
  });

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      const data = await cookbookApi.getAll();
      setCookbooks(data || []);

      const totalRecipes = data?.reduce((total, cookbook) => total + (cookbook.recipes?.length || 0), 0) || 0;

      setStats({
        totalCookbooks: data?.length || 0,
        totalRecipes: totalRecipes,
        joinDate: new Date(user.createdAt || Date.now()).toLocaleDateString()
      });
    } catch (err) {
      console.log('Error loading user stats:', err.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My Profile</h1>

      {/* User Info Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <img
          src={user.picture}
          alt="Profile"
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            border: '4px solid #007bff'
          }}
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{user.name}</h2>
          <p style={{ margin: '0 0 8px 0', color: '#666' }}>📧 {user.email}</p>
          <p style={{ margin: '0', color: '#666' }}>🗓️ Member since: {stats.joinDate}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '25px',
          backgroundColor: '#e3f2fd',
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid #2196f3'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0', color: '#1976d2' }}>{stats.totalCookbooks}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>📚 Total Cookbooks</p>
        </div>

        <div style={{
          padding: '25px',
          backgroundColor: '#e8f5e8',
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid #4caf50'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0', color: '#388e3c' }}>{stats.totalRecipes}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>🍳 Saved Recipes</p>
        </div>
      </div>

      {/* Recent Cookbooks */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>📖 Your Cookbooks</h3>
        {cookbooks.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {cookbooks.map((cookbook) => (
              <div key={cookbook._id} style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{cookbook.title}</h4>
                    <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{cookbook.description}</p>
                    <small style={{ color: '#888' }}>
                      {cookbook.recipes?.length || 0} recipes • Created {new Date(cookbook.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No cookbooks yet. Start by creating your first cookbook on the home page! 🍽️
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;