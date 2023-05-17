<template>
  <div>
    <h2>Inscription</h2>
    <form @submit="submitForm">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">S'inscrire</button>
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
        await axios.post('http://localhost:3000/inscription', {
          name: this.username,
          password: this.password
        });

        // Gérer la réponse du serveur après l'inscription réussie
        // Rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions nécessaires

      } catch (error) {
        console.error(error);
        // Gérer les erreurs d'inscription, afficher un message d'erreur ou effectuer d'autres actions nécessaires
      }
    }
  }
};
</script>
