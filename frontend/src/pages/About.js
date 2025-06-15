const About = () => {
  return (
    <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About My Cookbooks</h1>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#333', marginTop: 0 }}>🍳 What is My Cookbooks?</h2>
        <p style={{ lineHeight: '1.8', color: '#666', fontSize: '16px' }}>
          My Cookbooks is a personal recipe management application that helps you discover, organize, and save your favorite recipes.
          Using the power of the Spoonacular API, you can search through thousands of recipes and create custom cookbooks to organize them exactly how you want.
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#333', marginTop: 0 }}>✨ Features</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Recipe Search</h4>
              <p style={{ margin: 0, color: '#666' }}>Search thousands of recipes from the Spoonacular API</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>📚</span>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Custom Cookbooks</h4>
              <p style={{ margin: 0, color: '#666' }}>Create and organize your own cookbook collections</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>🔐</span>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Google Authentication</h4>
              <p style={{ margin: 0, color: '#666' }}>Secure login with your Google account</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2rem' }}>📱</span>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Recipe Details</h4>
              <p style={{ margin: 0, color: '#666' }}>View detailed ingredients, instructions, and nutritional info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;