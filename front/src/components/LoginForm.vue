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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Effectuer une requête POST vers votre API pour la connexion sécurisée
      // Utilisez axios ou la méthode fetch pour effectuer la requête HTTP
      
      const loginData = {
        username: this.username,
        password: this.password
      };
      
      // Envoyez les données de connexion à votre API via une connexion sécurisée (HTTPS)
      // axios.post('https://votre-domaine.com/login', loginData, { withCredentials: true })
      //   .then(response => {
      //     // Gérer la réponse de l'API
      //     // Rediriger vers la page d'accueil ou afficher les composants TaskList et AssignedTasksList
      //   })
      //   .catch(error => {
      //     // Gérer les erreurs de connexion
      //   });
      
      console.log('Connexion sécurisée avec :', loginData);
      
      // Exemple de redirection vers la page d'accueil
      this.$router.push('/');
    }
  }
};
</script>
