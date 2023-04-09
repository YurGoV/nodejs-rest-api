require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { catchAsyncWrapper } = require('./utils');

const { PORT, MONGO_URL } = process.env;
// const { MONGO_URL } = process.env.MONGO_URL;

const connectMongo = catchAsyncWrapper(async () => {
  mongoose.set('strictQuery', false);
  // eslint-disable-next-line no-console
  await mongoose.connect(MONGO_URL).catch((error) => console.log(error));// todo: refactor 
  // eslint-disable-next-line no-console
  return console.log('connected to DB');
});
connectMongo();

/* app.use((err, req, res, next) => {
  const { status } = err; // there we get error status, that was setting on user useMiddlewares

  if (NODE_ENV === 'development') {
    console.log('CL ~ app.js [35]: lllll');
    res.status(status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(status || 500).json({
      message: err.message,
    });
  }
  // TODO: stack: err.stack// для розробки - конкретика по помилці - можна окремо під умовами оточення: дев та ін
  // TODO: можна винести в окремий файл
}); */

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/`);
});

/* const start = async () => {
  await connectMongo();

  app.listen(PORT);
};

start()
  .then(console.log(`Server running. Use our API on port: ${PORT}`))
  // .catch(console.error);

*/

// TODO: in homework:
// ? preDone errors wrapper; // need more - from any other - 2 variants for dev and for production
// DONE async wrapper;
// ? preDone (in login route) password select false in user model & +password in needed queries;
// ? preDone (in login route) password undefined при відповідях (реєстрація, апдейт, тощо);
// DONE current data in update: {new: true};
// DONE (contactsId) перевірка, чи валідний ID // ObjectId.isValid(id);
// DONE  avatar auto folder, sharp

// *видалити детальну валідацію паролю у джоі при логіні (зробити як тут)
// DONE uploaded file size limit
// *mongosh auth hook - to homework
// ?(TO COMPLETE) dev/prod errors (lessons - in server.js)
// *admin route/auth

// !normal relation in mongodb model!
// * sorting (take from todoController)
// *populate (to take owner in received contact) ~ file: todoController.js:38 ~ receivedTodos:'
// *multer - file extension and type check by mime

// * learn how imageService work
// * change/reset passwd

// * reset url from authController
// * image upload class

//* add username (to avatar filename also) auto usernameInFilename

// todo: learn cron job
