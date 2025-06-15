# My Cookbooks - Frontend

A React-based recipe management application that allows users to search, save, and organize their favorite recipes using Google OAuth authentication.

## 🍳 What Problem Does This Solve?

Many food enthusiasts struggle to keep track of recipes they find online. This application solves that problem by providing a personal digital cookbook where users can:

- Search thousands of recipes from the Spoonacular API
- Create custom cookbook collections
- Save and organize favorite recipes
- Access their personal recipe collection anywhere

## 🚀 Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install React Router**
   ```bash
   npm install react-router-dom
   ```

4. **Environment Setup**
   Create a `.env` file in the frontend root:
   ```env
   REACT_APP_BE_URL=https://cookbook-api-backend.onrender.com
   ```

5. **Start development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3001`

## 📖 Example Usage

### 1. **Authentication**
- Click "Login with Google" to authenticate using Google OAuth
- Once logged in, you'll see your personal dashboard

### 2. **Search Recipes**
- Use the search bar to find recipes (e.g., "chicken pasta", "chocolate cake")
- Browse through search results with images and titles

### 3. **Create Cookbooks**
- Click "+ Add New Cookbook" to create a new collection
- Give it a name and description (e.g., "Sunday Dinners", "Quick Lunches")

### 4. **Save Recipes**
- From search results, select a cookbook from the dropdown
- Click "Add" to save the recipe to your chosen cookbook

### 5. **Manage Your Collection**
- View all your cookbooks on the main page
- Click "Details" on any recipe to see full ingredients and instructions
- Remove recipes from cookbooks as needed
- Delete entire cookbooks when no longer needed

### 6. **Profile Management**
- Visit your Profile page to see stats and cookbook overview
- View total cookbooks and saved recipes count

## 🔐 Google OAuth Integration

This application uses Google OAuth 2.0 for secure authentication:

- **Secure Login**: No passwords to remember - use your existing Google account
- **Personal Data**: Each user's cookbooks and recipes are private and isolated
- **Token-based**: Uses JWT tokens for secure API communication
- **Automatic Redirect**: Seamless login flow with redirect back to the app

The OAuth flow is handled by:
1. Frontend redirects to Google OAuth consent screen
2. User authorizes the application
3. Google redirects back with authorization code
4. Backend exchanges code for user info and creates session
5. Frontend receives authentication token for API calls

## 🛠️ Technology Stack

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **CSS3** - Styling and layout
- **Fetch API** - HTTP requests
- **Google OAuth 2.0** - Authentication
- **Spoonacular API** - Recipe data source

## 📱 Features

- **Responsive Design** - Works on desktop and mobile devices
- **Search Integration** - Real-time recipe search via Spoonacular API
- **Personal Cookbooks** - Create and manage custom recipe collections
- **Recipe Details** - View full ingredients, instructions, and nutritional info
- **User Profiles** - Personal dashboard with statistics and cookbook overview

## 🌐 Deployment

**Live Application**: https://u09-frontend-onrender.com

The frontend is deployed on Render and automatically builds from the main branch.

## 📚 Related Documentation

- [Backend Repository](../backend/) - Node.js/Express API server
- [Spoonacular API Documentation](https://spoonacular.com/food-api/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

