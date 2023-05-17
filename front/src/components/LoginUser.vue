<template>
  <div>
    <h2>Connexion</h2>
    <form @submit="submitForm">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:3000/connexion', {
          name: this.username,
          password: this.password
        });

        // Gérer la réponse du serveur après la connexion réussie
        // Rediriger l'utilisateur vers la page d'accueil ou effectuer d'autres actions nécessaires

      } catch (error) {
        console.error(error);
        // Gérer les erreurs de connexion, afficher un message d'erreur ou effectuer d'autres actions nécessaires
      }
    }
  }
};
</script>
