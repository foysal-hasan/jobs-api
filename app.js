require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

// connetDB
const connetDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// routers
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')

app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 3 * 60 * 1000 , // 3 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
}))

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1', authRouter)
app.use('/api/v1/jobs', jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connetDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
