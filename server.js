require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app')

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const connectMongo = async () => {

    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URL)
    .then((connection) => {
        return console.log('connected to DB');
      })
      .catch((error) => {return console.log(error)});
};

const start = async () => {
    await connectMongo();

    app.listen(PORT, (err) => {
        if (err) {
            console.error('Error at server launch:', err.message);
        }
    })
};

start()
    .then(console.log(`Server running. Use our API on port: ${PORT}`))
    .catch(console.error)


    // TODO: in homework:
// error wrapper;
// async wrapper;
// password select false in user model;
// password undefined при відповідях (реєстрація, апдейт, тощо)
// current data in update: {new: true};
// перевірка, чи валідний ID // ObjectId.isValid(id);
// видалити детальну валідацію паролю у джоі при логіні (зробити як тут)
// uploaded file size limit
//  mongosh auth hook - to homework
//  ?DONE(TO CHECK) dev/prod errors (there - in server.js)
// admin route/auth

// todo: learn cron job