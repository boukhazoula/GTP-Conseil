const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log('Utilisateur enregistré avec succès:', savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Générer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ error: err.message });
  }
});

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token non fourni.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Exemple d'utilisation du middleware pour protéger une route
router.get('/protected', authMiddleware, (req, res) => {
  // Ressource protégée accessible uniquement avec un token valide
  res.json({ message: 'Ressource protégée accessible.' });
});

module.exports = router;
