import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // ← ADD THIS IMPORT
import cors from 'cors';
import passport from './config/passport';
import connectDB from './db.js';
import cbRoutes from './routes/cookBookRoutes';
import authRoute from './routes/authRoutes';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FE_URL || 'http://localhost:3001',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'verySecretySecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL as string, // ← CHANGED ; TO COMMA
    }),
cookie: {
  httpOnly: false,
   sameSite: 'none' as const
}
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express!');
});

app.get('/create-session-test', (req, res) => {
  (req.session as any).testData = 'hello world';
  res.json({
    message: 'Session created',
    sessionID: req.sessionID,
    testData: (req.session as any).testData,
  });
});

app.get('/debug-config', (req, res) => {
  res.json({
    sessionConfig: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    environment: process.env.NODE_ENV,
    frontendUrl: process.env.FE_URL,
  });
});

app.get('/test-cookie-settings', (req, res) => {
  res.cookie('test-cookie', 'test-value', {
    sameSite: 'none' as const,
    secure: true,
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ message: 'Test cookie set with sameSite: none, secure: true' });
});

app.get('/reset-session', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Session cleared. Please login again.' });
  });
});

app.get('/debug-sessions', (req, res) => {
  res.json({
    currentSessionID: req.sessionID,
    hasSession: !!req.session,
    sessionData: req.session,
  });
});

app.use('/api/v1/cookbook', cbRoutes);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

export default app;
