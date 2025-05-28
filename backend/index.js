import express from 'express';
import cbRoutes from './routes/cookBookRoutes.js'
const app = express();
const port = 3000;

app.use(express.json());

app.get('/',(req ,res) => {
    res.send('heloo express!')
});


app.use('/api/v1/cookbook', cbRoutes);

app.listen(port, () => {
console.log(`server is running on http://localhost: ${port}`)
});