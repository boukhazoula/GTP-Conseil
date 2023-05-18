const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

// Importer les routes
const taskRoutes = require('./routes/tasks');
const employeeRoutes = require('./routes/employees');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// Utiliser les routes importées
app.use('/tasks', taskRoutes);
app.use('/employees', employeeRoutes);

// Middleware de validation de formulaire de connexion
function validateLoginForm(req, res, next) {
  // Vérifier les champs requis et effectuer d'autres validations si nécessaire
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs du formulaire.' });
  }
  next();
}

// Route de connexion
app.post('/login', validateLoginForm, (req, res) => {
  // Ici, vous pouvez vérifier les informations d'identification et effectuer les actions nécessaires
  // Vérification du nom d'utilisateur et du mot de passe, puis génération d'un jeton d'authentification

  const { username, password } = req.body;

  // Votre logique de vérification des informations d'identification

  // Exemple simple de vérification avec nom d'utilisateur 'admin' et mot de passe 'password'
  if (username === 'admin' && password === 'password') {
    // Authentification réussie
    const authToken = 'votre_jwt_token'; // Générez un jeton d'authentification unique

    // Vous pouvez stocker le jeton d'authentification dans une session, un cookie sécurisé ou une réponse JSON
    res.cookie('authToken', authToken, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Connexion réussie', authToken });
  } else {
    // Authentification échouée
    res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
  }
});

// Se connecter à MongoDB
dbConnect();

app.listen(3000, () => console.log('Serveur en cours d\'exécution sur le port 3000'));
