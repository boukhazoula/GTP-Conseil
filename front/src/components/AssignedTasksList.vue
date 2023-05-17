<template>
  <div>
    <h2>Tâches assignées</h2>
    <ul>
      <li v-for="task in assignedTasks" :key="task._id">
        {{ task.label }} - {{ task.start_time }} - {{ task.end_time }}
        <span>- Assignée à : {{ getAssignedEmployeeName(task) }}</span>
        <button @click="unassignTask(task._id)">Désassigner</button>
      </li>
    </ul>
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
