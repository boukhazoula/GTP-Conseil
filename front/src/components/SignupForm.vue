<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div>
          <label for="signup-username">Nom d'utilisateur</label>
          <input type="text" id="signup-username" v-model="username" required>
        </div>
        <div>
          <label for="signup-password">Mot de passe</label>
          <input type="password" id="signup-password" v-model="password" required>
        </div>
        <button type="submit">S'inscrire</button>
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
      register() {
        const registerData = {
          username: this.username,
          password: this.password
        };
  
        console.log('Données d\'inscription:', registerData);
  
        axios.post('http://localhost:3000/users/register', registerData, { withCredentials: true })
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token); // Stocker le token dans localStorage
            this.isLoggedIn = true; // Mettre à jour l'état de connexion
            // Rediriger vers la page de connexion après une inscription réussie
          })
          .catch(error => {
            console.error('Erreur d\'inscription:', error);
            // Gérer les erreurs d'inscription
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