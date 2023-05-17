<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div>
          <label for="registerEmail">Email:</label>
          <input type="email" id="registerEmail" v-model="registerEmail" required>
        </div>
        <div>
          <label for="registerPassword">Mot de passe:</label>
          <input type="password" id="registerPassword" v-model="registerPassword" required>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
        registerEmail: '',
        registerPassword: '',
        registerErrorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password
          });
          // Stockez le jeton d'authentification dans le stockage local ou dans un cookie
          // Redirigez vers la page principale de l'application ou effectuez d'autres actions nécessaires
        } catch (error) {
          console.error(error);
          this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
        }
      },
      async register() {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            email: this.registerEmail,
            password: this.registerPassword
          });
          // Gérez la réponse après l'inscription réussie, par exemple, affichez un message de succès
        } catch (error) {
          console.error(error);
          this.registerErrorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      }
    }
  };
  </script>
  