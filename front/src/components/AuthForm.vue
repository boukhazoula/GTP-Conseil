<template>
    <div class="login-form">
      <h2>{{ isRegistering ? 'Inscription' : 'Connexion' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="isRegistering">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="primary-button">{{ isRegistering ? "S'inscrire" : 'Se connecter' }}</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ formattedErrorMessage }}</div>
      <button @click="toggleFormMode" class="secondary-button">{{ isRegistering ? 'Déjà inscrit ? Se connecter' : "Pas encore inscrit ? S'inscrire" }}</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isRegistering: false,
        username: '',
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    computed: {
      formattedErrorMessage() {
        if (this.isRegistering) {
          return this.errorMessage.replace('User validation failed: username: ', '').replace('username: ', '');
        } else {
          return this.errorMessage;
        }
      }
    },
    methods: {
      handleSubmit() {
        if (this.isRegistering) {
          const registerData = {
            username: this.username,
            email: this.email,
            password: this.password
          };
  
          if (!this.validateEmail(this.email)) {
            this.errorMessage = 'Veuillez fournir une adresse e-mail valide.';
            return;
          }
  
          axios.post('http://localhost:3000/users/register', registerData, { withCredentials: true })
            .then(response => {
              const token = response.data.token;
              localStorage.setItem('token', token);
              this.$emit('registerSuccess', token);
            })
            .catch(error => {
              console.error('Erreur d\'inscription:', error);
              if (error.response && error.response.data && error.response.data.error) {
                this.errorMessage = error.response.data.error;
                this.$emit('error', this.errorMessage);
              } else {
                this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
                this.$emit('error', this.errorMessage);
              }
            });
        } else {
          const loginData = {
            email: this.email,
            password: this.password
          };
  
          axios.post('http://localhost:3000/users/login', loginData, { withCredentials: true })
            .then(response => {
              const token = response.data.token;
              localStorage.setItem('token', token);
              this.$emit('loginSuccess', token);
            })
            .catch(error => {
              console.error('Erreur de connexion:', error);
              if (error.response && error.response.data && error.response.data.error) {
                this.errorMessage = error.response.data.error;
                this.$emit('error', this.errorMessage);
              } else {
                this.errorMessage = "Une erreur s'est produite lors de la connexion.";
                this.$emit('error', this.errorMessage);
              }
            });
        }
      },
      toggleFormMode() {
        this.isRegistering = !this.isRegistering;
        this.username = '';
        this.email = '';
        this.password = '';
        this.errorMessage = '';
      },
      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form {
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    width: 300px;
    margin: 20px auto;
  }
  
  .login-form h2 {
    color: #4CAF50;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form form {
    display: flex;
    flex-direction: column;
  }
  
  .login-form label {
    margin-bottom: 10px;
  }
  
  .login-form input {
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
  }
  
  .login-form button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
  }
  
  .login-form button:hover {
    background-color: #45a049;
  }
  
  .login-form .secondary-button {
    font-size: 14px;
    padding: 3px 28px;
    margin-top: 10px;
  }
  
  .error-message {
    color: red;
  }
  </style>
  