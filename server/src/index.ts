import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes/api.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', api);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
