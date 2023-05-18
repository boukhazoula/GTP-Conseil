const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

// Importer les routes
const taskRoutes = require('./routes/tasks');
const employeeRoutes = require('./routes/employees');
const userRoutes = require('./routes/users');  // Importer le routeur d'utilisateurs

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// Utiliser les routes importées
app.use('/tasks', taskRoutes);
app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);  // Utiliser le routeur d'utilisateurs

// Se connecter à MongoDB
dbConnect();

app.listen(3000, () => console.log('Serveur en cours d\'exécution sur le port 3000'));
