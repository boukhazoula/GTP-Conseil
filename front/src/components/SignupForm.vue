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
      register() {
        // Effectuer une requête POST vers votre API pour l'inscription sécurisée
        // Utilisez axios ou la méthode fetch pour effectuer la requête HTTP
        
        const registerData = {
          username: this.username,
          password: this.password
        };
        
        // Envoyez les données d'inscription à votre API via une connexion sécurisée (HTTPS)
        // axios.post('https://votre-domaine.com/register', registerData, { withCredentials: true })
        //   .then(response => {
        //     // Gérer la réponse de l'API
        //     // Rediriger vers la page de connexion ou afficher un message de succès
        //   })
        //   .catch(error => {
        //     // Gérer les erreurs d'inscription
        //   });
        
        console.log('Inscription sécurisée avec :', registerData);
        
        // Exemple de redirection vers la page de connexion après l'inscription
        this.$router.push('/login');
      }
    }
  };
  </script>
  