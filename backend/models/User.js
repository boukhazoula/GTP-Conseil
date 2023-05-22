const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Créer le schéma
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis.'],
    unique: [true, 'Le nom d\'utilisateur doit être unique.'],
    minlength: [5, 'Le nom d\'utilisateur doit contenir au moins 5 caractères.'],
    maxlength: [20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères.']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis.'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères.']
  }
});

// Créer le modèle à partir du schéma
const User = mongoose.model('User', UserSchema);

module.exports = User;
