import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Get session from store using the token
    req.sessionStore.get(token, async (err: any, session: any) => {
      if (err || !session) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      if (session && session.passport && session.passport.user) {
        try {
          // Import User model dynamically to avoid circular import issues
          const { User } = await import('../model/user.js');
          const user = await User.findById(session.passport.user);

          if (user) {
            req.user = user; // Set user for route handlers
            next();
          } else {
            res.status(401).json({ error: 'User not found' });
          }
        } catch (dbError) {
          console.log('Database error:', dbError);
          res.status(500).json({ error: 'Database error' });
        }
      } else {
        res.status(401).json({ error: 'Invalid session' });
      }
    });
  } catch (error) {
    console.log('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};