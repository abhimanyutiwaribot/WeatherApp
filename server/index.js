import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './routes/weather.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://weather-app-zeta-snowy-58.vercel.app'
    : 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api/weather', weatherRouter);

app.get('/', (req, res) => {
  res.send('Weather API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
