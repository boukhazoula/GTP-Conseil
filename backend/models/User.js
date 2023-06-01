const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Créer le schéma
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis.'],
    unique: [true, 'Le nom d\'utilisateur doit être unique.'],
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères.'],
    maxlength: [20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères.']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis.'],
    validate: {
      validator: function(value) {
        // Utiliser une expression régulière pour valider le mot de passe
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
      },
      message: 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.'
    }
  },
  email: {
    type: String,
    required: [true, 'L\'adresse e-mail est requise.'],
    unique: [true, 'L\'adresse e-mail doit être unique.']
  }
});

// Créer le modèle à partir du schéma
const User = mongoose.model('User', UserSchema);

module.exports = User;
