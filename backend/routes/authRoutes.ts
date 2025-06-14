import express from 'express';
import passport from '../config/passport.js';

const router = express.Router();

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] ,
       prompt: 'select_account consent' })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FE_URL || 'http://localhost:3001' }),
  (req, res) => {
       console.log('🔍 OAuth callback hit');
          console.log('🔍 User:', req.user);
          console.log('🔍 Session ID:', req.sessionID);
          console.log('🔍 Session exists:', !!req.session);
    // Successful authentication, redirect to frontend
    req.session.save((err) => {
         if (err) {
           console.log('❌ Session save error:', err);
         } else {
           console.log('✅ Session saved successfully');
         }
         res.redirect(process.env.FE_URL || 'http://localhost:3001');
       });
  }
);

// Get current user
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});


router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.json({ success: true, message: 'Logged out successfully' });
    });
  }); // ← This closing brace and parenthesis was missing!
});

export default router;