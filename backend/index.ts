import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from './config/passport';
import connectDB from './db.js';
import cbRoutes from './routes/cookBookRoutes';
import authRoute from './routes/authRoutes';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use(cors({
  origin: process.env.FE_URL || "http://localhost:3001",
  credentials: true
}));

app.use(session({
  secret: "verySecretySecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
      sameSite: 'none',
      secure: true,
      httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express!');
});

app.use('/api/v1/cookbook', cbRoutes);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});