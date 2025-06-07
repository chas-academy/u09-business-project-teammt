import express from 'express';

import connectDB from './db.js';
import cbRoutes from './routes/cookBookRoutes.js';
const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('heloo express!');
});

app.use('/api/v1/cookbook', cbRoutes);

app.listen(port, () => {
  console.log(`server is running on http://localhost: ${port}`);
});
