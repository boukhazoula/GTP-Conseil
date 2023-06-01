<template>
  <div class="task-form">
    <h2>Créer une tâche</h2>
    <table>
      <tr>
        <th><label for="taskLabel" class="label">Libellé</label></th>
        <th><label for="startTime" class="label">Heure de début</label></th>
        <th><label for="endTime" class="label">Heure de fin</label></th>
        <th>Action</th>
      </tr>
      <tr>
        <td><input id="taskLabel" v-model="label" placeholder="Libellé de la tâche" required class="input-label"></td>
        <td><input id="startTime" v-model="start_time" type="time" required class="input-label"></td>
        <td><input id="endTime" v-model="end_time" type="time" required class="input-label"></td>
        <td><button @click="createTask">Créer la tâche</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormulaireTache',
  data() {
    return {
      label: '',
      start_time: '',
      end_time: '',
    };
  },
  methods: {
    async createTask() {
      if (this.label.trim() === '' || this.start_time.trim() === '' || this.end_time.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      // Calculer la durée de la tâche en heures
      const startTime = new Date(`1970-01-01T${this.start_time}`);
      const endTime = new Date(`1970-01-01T${this.end_time}`);
      const duration = Math.abs(endTime - startTime) / 36e5;

      if (duration > 8) {
        alert("La durée de la tâche ne peut pas dépasser 8 heures.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/tasks', {
          label: this.label,
          start_time: this.start_time,
          end_time: this.end_time,
        }, {
          withCredentials: true
        });
        const task = response.data;
        console.log('Tâche créée :', task);
        this.label = '';
        this.start_time = '';
        this.end_time = '';

        // Recharger la page après la création réussie de la tâche
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.task-form {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.task-form h2 {
  color: #4CAF50;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
}

td {
  background-color: #f9f9f9;
}

button {
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
}

button:hover {
  background-color: #45a049;
}

label.label {
  font-weight: bold;
}

input.input-label,
input.input-label[type="time"] {
  outline: none;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

input.input-label:focus {
  border-color: #4CAF50;
}
</style>