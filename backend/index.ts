import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
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
      mongoUrl: process.env.MONGO_URL as string,
    }),
    cookie: {
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Cookbook API Server');
});

app.use('/api/v1/cookbook', cbRoutes);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
