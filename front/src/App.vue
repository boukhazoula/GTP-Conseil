<template>
  <div id="app">
    <img class="img" alt="Logo Vue" src="./assets/img.png">

    <div v-if="!isLoggedIn">
      <AuthForm @loginSuccess="handleLoginSuccess" @registerSuccess="handleRegisterSuccess" @error="errorMessage = $event" />
    </div>

    <div v-else>
      <button @click="logout" class="logout-button">Déconnexion</button>

      <TaskForm v-if="showTaskForm" />
      <TaskList v-if="showTaskList" />
      <AssignTasks v-if="showAssignTasks" />
      <AssignedTasksList v-if="showAssignedTasksList" />
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import AssignTasks from './components/AssignTasks.vue';
import AssignedTasksList from './components/AssignedTasksList.vue';
import AuthForm from './components/AuthForm.vue';

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList,
    AssignTasks,
    AssignedTasksList,
    AuthForm
  },
  data() {
    return {
      isLoggedIn: false,
      showTaskForm: false,
      showTaskList: false,
      showAssignTasks: false,
      showAssignedTasksList: false,
      errorMessage: ''
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.showTaskForm = true;
      this.showTaskList = true;
      this.showAssignTasks = true;
      this.showAssignedTasksList = true;
    }
  },
  methods: {
    handleLoginSuccess(token) {
      localStorage.setItem('token', token);
      this.isLoggedIn = true;
      this.showTaskForm = true;
      this.showTaskList = true;
      this.showAssignTasks = true;
      this.showAssignedTasksList = true;
    },
    handleRegisterSuccess(token) {
      localStorage.setItem('token', token);
      this.isLoggedIn = true;
      this.showTaskForm = true;
      this.showTaskList = true;
      this.showAssignTasks = true;
      this.showAssignedTasksList = true;
    },
    logout() {
      console.log('Déconnexion');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
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

.logout-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
  margin-left: auto;
}
</style>
