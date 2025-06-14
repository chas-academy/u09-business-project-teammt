import express from 'express';
import passport from '../config/passport.js';
const router = express.Router();
// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }), (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:5173');
});
// Get current user
router.get('/user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    }
    else {
        res.json(null);
    }
});
// Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Logged out successfully' });
    });
});
export default router;
//# sourceMappingURL=authRoutes.js.map