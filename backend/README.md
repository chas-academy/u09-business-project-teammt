# My Cookbooks - Backend API

A Node.js/Express RESTful API server with MongoDB for managing user cookbooks and recipes, featuring Google OAuth authentication and secure user data isolation.

## 🎯 What Problem Does This Solve?

This backend API provides the server-side infrastructure for the cookbook application, solving several key problems:

- **User Authentication**: Secure Google OAuth 2.0 integration with session management
- **Data Persistence**: MongoDB storage for user cookbooks and recipes
- **API Security**: Protected routes ensuring users can only access their own data
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for cookbooks
- **Session Management**: Secure token-based authentication with MongoDB session store

## 🚀 Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google OAuth 2.0 credentials

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend root:
   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/cookbook
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   BE_URL=http://localhost:3000
   FE_URL=http://localhost:3001
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The API server will run on `http://localhost:3000`

## 📖 API Usage Examples

### Authentication Endpoints

```bash
# Start Google OAuth flow
GET /auth/google

# OAuth callback (handled automatically)
GET /auth/google/callback

# Verify authentication token
POST /auth/verify-token
Content-Type: application/json
{
  "token": "session-token-here"
}

# Logout user
POST /auth/logout
Content-Type: application/json
{
  "token": "session-token-here"
}
```

### Cookbook CRUD Operations

All cookbook endpoints require authentication via Bearer token:

```bash
# Get all user's cookbooks
GET /api/v1/cookbook
Authorization: Bearer <session-token>

# Create new cookbook
POST /api/v1/cookbook
Authorization: Bearer <session-token>
Content-Type: application/json
{
  "title": "Sunday Dinners",
  "description": "Family recipes for weekend meals"
}

# Get specific cookbook
GET /api/v1/cookbook/:id
Authorization: Bearer <session-token>

# Add/Remove recipe from cookbook
PUT /api/v1/cookbook/:id
Authorization: Bearer <session-token>
Content-Type: application/json
{
  "operation": "add",
  "recipe": {
    "id": "12345",
    "title": "Chicken Pasta",
    "image": "https://image-url.jpg"
  }
}

# Delete cookbook
DELETE /api/v1/cookbook/:id
Authorization: Bearer <session-token>
```

### Example Responses

**Get Cookbooks Response:**
```json
{
  "message": "get all cook books called",
  "cookbooks": [
    {
      "_id": "cookbook-id",
      "title": "Sunday Dinners",
      "description": "Family recipes",
      "recipes": [
        {
          "id": "12345",
          "title": "Chicken Pasta",
          "image": "https://image-url.jpg"
        }
      ],
      "userId": "google-user-id",
      "createdAt": "2025-06-15T10:30:00.000Z",
      "updatedAt": "2025-06-15T10:30:00.000Z"
    }
  ]
}
```

## 🏗️ Architecture Overview

### Technology Stack
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Identity provider
- **Express Session** - Session management
- **Connect-Mongo** - MongoDB session store
- **TypeScript** - Type safety and better development experience

### Project Structure
```
backend/
├── config/
│   └── passport.ts          # Google OAuth configuration
├── controllers/
│   └── cookBookController.ts # Cookbook CRUD logic
├── middleware/
│   └── authMiddleware.ts    # Authentication protection
├── model/
│   ├── user.ts             # User schema
│   └── cookBook.ts         # Cookbook schema
├── routes/
│   ├── authRoutes.ts       # Authentication endpoints
│   └── cookBookRoutes.ts   # Cookbook API endpoints
├── db.ts                   # Database connection
└── index.ts               # Server entry point
```

### Database Schema

**User Model:**
```typescript
interface IUser {
  googleId: string;    // Google OAuth ID
  email: string;       // User's email
  name: string;        // Display name
  picture: string;     // Profile picture URL
}
```

**Cookbook Model:**
```typescript
interface ICookBook {
  title: string;       // Cookbook name
  description: string; // Cookbook description
  recipes: IRecipe[];  // Array of saved recipes
  userId: string;      // Owner's Google ID
}

interface IRecipe {
  id: string;         // Spoonacular recipe ID
  title: string;      // Recipe name
  image: string;      // Recipe image URL
}
```

## 🔐 Security Features

### Authentication Flow
1. **Google OAuth**: Users authenticate via Google's secure OAuth 2.0 flow
2. **Session Management**: Server creates secure sessions stored in MongoDB
3. **Token-Based Auth**: Frontend receives session token for API requests
4. **User Isolation**: All data operations are scoped to the authenticated user

### Security Middleware
- **CORS Configuration**: Allows requests only from authorized frontend domains
- **Session Security**: HTTP-only cookies and secure session configuration
- **Route Protection**: All cookbook routes protected by authentication middleware
- **Data Validation**: User ownership verification on all CRUD operations

### Environment Security
- All sensitive credentials stored in environment variables
- MongoDB connection strings use encrypted connections
- Google OAuth secrets never exposed to client-side code

## 🌐 Deployment

**Live API**: https://u09-backend-4tzl.onrender.com

### Deployment Configuration
- **Platform**: Render.com
- **Auto-Deploy**: Connects to GitHub repository
- **Environment Variables**: Configured in Render dashboard
- **Database**: MongoDB Atlas cloud instance
- **SSL**: Automatic HTTPS termination

### Health Checks
The server includes basic health monitoring:
- **Server Status**: API responds to requests
- **Database Connection**: MongoDB connectivity verified
- **Authentication**: Google OAuth endpoints functional

## 👥 Team Members

- [Your Name]
- [Partner Name if applicable]

## 📚 Documentation References

- [Frontend Application](../frontend/) - React.js client application
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

## 🔧 Development

### Scripts
```bash
npm run dev      # Start with hot reload (tsx watch)
npm start        # Start production server
npm run build    # Compile TypeScript
npm run watch    # Watch mode compilation
```

### Adding New Features
1. Create/modify models in `/model/`
2. Add controller logic in `/controllers/`
3. Define routes in `/routes/`
4. Add authentication middleware if needed
5. Update this documentation

## ⚠️ Environment Variables Required

```env
MONGO_URL=mongodb+srv://...          # MongoDB connection string
GOOGLE_CLIENT_ID=123...              # Google OAuth client ID
GOOGLE_CLIENT_SECRET=abc...          # Google OAuth client secret
BE_URL=https://your-backend.com      # Backend URL for OAuth callbacks
FE_URL=https://your-frontend.com     # Frontend URL for redirects

```

