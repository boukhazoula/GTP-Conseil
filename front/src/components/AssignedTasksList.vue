<template>
  <div class="assigned-tasks">
    <h2>Tâches assignées</h2>
    <table>
      <tr>
        <th>Libellé</th>
        <th>Heure de début</th>
        <th>Heure de fin</th>
        <th>Assignée à</th>
        <th>Action</th>
      </tr>
      <tr v-for="task in assignedTasks" :key="task._id">
        <td>{{ task.label }}</td>
        <td>{{ task.start_time }}</td>
        <td>{{ task.end_time }}</td>
        <td>{{ getAssignedEmployeeName(task) }}</td>
        <td><button @click="unassignTask(task._id)">Désassigner</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeTachesAssignees',
  data() {
    return {
      assignedTasks: []
    };
  },
  created() {
    this.fetchAssignedTasks();
    this.interval = setInterval(() => {
      this.fetchAssignedTasks();
    }, 5000); // Rafraîchir toutes les 5 secondes
  },
  beforeUnmount() {
    clearInterval(this.interval); // Assurez-vous de nettoyer l'intervalle lorsque le composant est détruit
  },
  methods: {
    async fetchAssignedTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        this.assignedTasks = response.data.filter(task => task.assigned_to.length > 0);
      } catch (error) {
        console.error(error);
      }
    },
    async unassignTask(taskId) {
      try {
        await axios.post(`http://localhost:3000/tasks/${taskId}/unassign`);

        this.fetchAssignedTasks(); // Rafraîchir les données des tâches assignées après une désassignation
      } catch (error) {
        console.error(error);
      }
    },
    getAssignedEmployeeName(task) {
      if (task.assigned_to.length > 0) {
        const assignedEmployees = task.assigned_to.map(employee => employee.name);
        return assignedEmployees.join(', ');
      }
      return 'Non assignée';
    }
  }
};
</script>

<style scoped>
.assigned-tasks {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.assigned-tasks h2 {
  color: #4CAF50;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
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
  padding: 5px 10px;
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
</style>
