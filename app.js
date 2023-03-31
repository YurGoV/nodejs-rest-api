const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { contactsRouter, usersRouter, filesRouter } = require('./routes');
const customErrorMessage = require('./utils/customErrorsMessages');

const { NODE_ENV } = process.env;
console.log('CL: ~ file: app.js:8 ~ NODE_ENV:', NODE_ENV);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use('/api/avatars', filesRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

/**
 * * Global error handler (middleware)
 */
app.use((err, req, res, next) => {
  const { status } = err; // there we get error status, that was setting on user useMiddlewares

  // console.log('~err app.js [34]:', err);

  if (NODE_ENV === 'development') {
    console.log('CL ~ app.js [35]: lllll');
    res.status(status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(status || 500).json({
      message: customErrorMessage(err.message)
    });
  }
  // TODO: stack: err.stack// для розробки - конкретика по помилці - можна окремо під умовами оточення: дев та ін
  // TODO: можна винести в окремий файл
});

module.exports = app;
