require('dotenv').config();
const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongoose connecté');
  } catch (error) {
    console.log('Échec de la connexion à Mongoose');
    console.error(error);
  }
}

module.exports = dbConnect;
