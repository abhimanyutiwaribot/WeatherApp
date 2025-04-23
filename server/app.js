import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weather.js';
import limiter from './middleware/rateLimiter.js';

const app = express();

app.use(cors());
app.use(express.json());

// Apply rate limiting
app.use('/api', limiter);

// Routes
app.use('/api/weather', weatherRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;
