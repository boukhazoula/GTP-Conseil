const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Créer le schéma
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

// Créer le modèle à partir du schéma
const User = mongoose.model('User', UserSchema);

module.exports = User;
