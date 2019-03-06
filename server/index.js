import express from 'express';

import bodyParser from 'body-parser';

// Routes
import userRoutes from './routes/user.route';

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.send('Up and Running');
});

// Handles
app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port:${PORT}`);
});

export default app;
