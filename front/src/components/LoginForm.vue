<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="login-username">Nom d'utilisateur</label>
        <input type="text" id="login-username" v-model="username" required>
      </div>
      <div>
        <label for="login-password">Mot de passe</label>
        <input type="password" id="login-password" v-model="password" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false // Ajout de la propriété isLoggedIn
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true; // Mettre à jour l'état de connexion si le token existe
    }
  },
  methods: {
    login() {
      const loginData = {
        username: this.username,
        password: this.password
      };

      console.log('Données de connexion:', loginData);

      axios.post('http://localhost:3000/users/login', loginData, { withCredentials: true })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token); // Stocker le token dans localStorage
          this.isLoggedIn = true; // Mettre à jour l'état de connexion
          // Rediriger vers la page d'accueil après la connexion réussie
        })
        .catch(error => {
          console.error('Erreur de connexion:', error);
          // Gérer les erreurs de connexion
        });
    },
    logout() {
      // Effectuer une requête au backend pour déconnecter l'utilisateur
      // Supprimer le token du stockage local
      // Réinitialiser les données de connexion
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.username = '';
      this.password = '';
    }
  }
};
</script>
