import express from 'express';

import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// Routes
import userRoutes from './routes/user.route';
import messageRoutes from './routes/message.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.send({
    status: 200,
    message: 'Welcome To EPIC-Mail'
  });
});

// Handles
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port:${PORT}`);
});

export default app;
