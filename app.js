const express = require('express');

const logger = require('morgan');
const cors = require('cors');

// * SWAGGER SECTION START
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./utils/swaggerApi.json');
// * SWAGGER SECTION END

const { contactsRouter, usersRouter, filesRouter } = require('./routes');
const customErrorMessage = require('./utils/customErrorsMessages');

const { NODE_ENV } = process.env;

const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use('/files/', filesRouter);

// * SWAGGER SECTION START
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// * SWAGGER SECTION END

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

/**
 * * Global error handler (middleware)
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status } = err; // there we get error status, that was setting on user useMiddlewares

  // console.log('~err app.js [34]:', err);

  if (NODE_ENV === 'development') {
    res.status(status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    const { status: customStatus, message } = customErrorMessage(err.message);
    res.status(customStatus || 500).json({
      message,
    });
  }
  // TODO: stack: err.stack// для розробки - конкретика по помилці - можна окремо під умовами оточення: дев та ін
  // TODO: можна винести в окремий файл
});

module.exports = app;
