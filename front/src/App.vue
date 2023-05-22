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
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button @click="toggleFormMode">{{ isRegistering ? 'Déjà inscrit ? Se connecter' : 'Pas encore inscrit ? S\'inscrire' }}</button>
    </div>

    <div v-else>
      <!-- Composants affichés après la connexion -->
      <TaskForm v-if="showTaskForm" />
      <TaskList v-if="showTaskList" />
      <AssignTasks v-if="showAssignTasks" />
      <AssignedTasksList v-if="showAssignedTasksList" />
      <button @click="logout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import AssignTasks from './components/AssignTasks.vue';
import AssignedTasksList from './components/AssignedTasksList.vue';
import axios from 'axios';

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
      password: '',
      showTaskForm: false,
      showTaskList: false,
      showAssignTasks: false,
      showAssignedTasksList: false,
      errorMessage: '' // Ajout de la propriété errorMessage
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifier si un jeton est présent dans le stockage local
      this.isLoggedIn = true;
      this.showTaskForm = true;
      this.showTaskList = true;
      this.showAssignTasks = true;
      this.showAssignedTasksList = true;
    }
  },
  methods: {
    handleSubmit() {
      if (this.isRegistering) {
        const registerData = {
          username: this.username,
          password: this.password
        };

        console.log('Données d\'inscription:', registerData);

        axios.post('http://localhost:3000/users/register', registerData, { withCredentials: true })
          .then(response => {
            console.log('Réponse d\'inscription:', response.data);
            const token = response.data.token;
            localStorage.setItem('token', token); // Stocker le jeton dans le localStorage
            console.log('Jeton JWT reçu et stocké:', token); // Console de débogage
            this.isLoggedIn = true; // Mettre à jour l'état de connexion
            this.showTaskForm = true;
            this.showTaskList = true;
            this.showAssignTasks = true;
            this.showAssignedTasksList = true;
          })
          .catch(error => {
            console.error('Erreur d\'inscription:', error);
            this.errorMessage = error.response.data.error; // Affichage du message d'erreur renvoyé par le backend
          });
      } else {
        const loginData = {
          username: this.username,
          password: this.password
        };

        console.log('Données de connexion:', loginData);

        axios.post('http://localhost:3000/users/login', loginData, { withCredentials: true })
          .then(response => {
            console.log('Réponse de connexion:', response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Jeton JWT reçu et stocké:', token); // Console de débogage
            this.isLoggedIn = true;
            this.showTaskForm = true;
            this.showTaskList = true;
            this.showAssignTasks = true;
            this.showAssignedTasksList = true;
          })
          .catch(error => {
            console.error('Erreur de connexion:', error);
            this.errorMessage = error.response.data.error; // Affichage du message d'erreur renvoyé par le backend
          });
      }
    },
    toggleFormMode() {
      this.isRegistering = !this.isRegistering;
      this.username = '';
      this.password = '';
      this.errorMessage = ''; // Réinitialisation du message d'erreur lors du changement de mode
    },
    logout() {
      // Effectuer une requête au backend pour déconnecter l'utilisateur
      // Réinitialiser les données de connexion
      console.log('Déconnexion');
      localStorage.removeItem('token');
      console.log('Jeton JWT supprimé'); // Console de débogage
      this.isLoggedIn = false;
      this.isRegistering = false;
      this.username = '';
      this.password = '';
      this.showTaskForm = false;
      this.showTaskList = false;
      this.showAssignTasks = false;
      this.showAssignedTasksList = false;
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
.error-message {
  color: red;
}
</style>
