import express from 'express';
import passport from '../config/passport';

const router = express.Router();

// Get current user
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

// Start Google OAuth
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.FE_URL || 'http://localhost:3001'
  }),
  (req, res) => {
    console.log('✅ OAuth callback successful');
    console.log('User:', req.user);
    console.log('Session ID:', req.sessionID);

    req.session.save((err) => {
      if (err) {
        console.log('❌ Session save error:', err);
      } else {
        console.log('✅ Session saved successfully');
      }

      // Redirect with token in URL
      const authToken = req.sessionID;
      res.redirect(`${process.env.FE_URL}?authToken=${authToken}`);
    });
  }
);

// Add token verification endpoint
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.json(null);
    }

    // Get session from store using callback
    req.sessionStore.get(token, async (err: any, session: any) => {
      if (err || !session) {
        return res.json(null);
      }

      if (session && session.passport && session.passport.user) {
        try {
          // Import User model dynamically to avoid circular import issues
          const { User } = await import('../model/user.js');
          const user = await User.findById(session.passport.user);
          res.json(user);
        } catch (dbError) {
          console.log('Database error:', dbError);
          res.json(null);
        }
      } else {
        res.json(null);
      }
    });
  } catch (error) {
    console.log('Token verification error:', error);
    res.json(null);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Logout error:', err);
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;