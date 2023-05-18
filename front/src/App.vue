<template>
  <div id="app">
    <img class="img" alt="Vue logo" src="./assets/img.png">

    <div v-if="!isLoggedIn">
      <h2>{{ isRegistering ? 'Inscription' : 'Connexion' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">{{ isRegistering ? 'S\'inscrire' : 'Se connecter' }}</button>
      </form>
      <button @click="toggleFormMode">{{ isRegistering ? 'Déjà inscrit ? Se connecter' : 'Pas encore inscrit ? S\'inscrire' }}</button>
    </div>

    <div v-else>
      <!-- Composants affichés après la connexion -->
      <TaskForm />
      <TaskList />
      <AssignTasks />
      <AssignedTasksList />
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import AssignTasks from './components/AssignTasks.vue';
import AssignedTasksList from './components/AssignedTasksList.vue';

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList,
    AssignTasks,
    AssignedTasksList
  },
  data() {
    return {
      isLoggedIn: false,
      isRegistering: false,
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      if (this.isRegistering) {
        // Effectuer une requête POST pour l'inscription
        // Utilisez axios ou la méthode fetch pour effectuer la requête HTTP
        const registerData = {
          username: this.username,
          password: this.password
        };
        console.log('Inscription sécurisée avec :', registerData);
        
        // Rediriger vers la page d'accueil ou afficher les composants après l'inscription réussie
        this.isLoggedIn = true;
      } else {
        // Effectuer une requête POST pour la connexion
        // Utilisez axios ou la méthode fetch pour effectuer la requête HTTP
        const loginData = {
          username: this.username,
          password: this.password
        };
        console.log('Connexion sécurisée avec :', loginData);
        
        // Rediriger vers la page d'accueil ou afficher les composants après la connexion réussie
        this.isLoggedIn = true;
      }
    },
    toggleFormMode() {
      this.isRegistering = !this.isRegistering;
      this.username = '';
      this.password = '';
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.img {
  width: 300px;
}
</style>
