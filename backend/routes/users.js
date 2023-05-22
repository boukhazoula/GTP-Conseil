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

    // Générer le token JWT
    const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
