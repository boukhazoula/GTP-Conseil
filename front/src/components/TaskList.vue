<template>
  <div>
    <h2>Liste des tâches</h2>

    <div>
      <button @click="sortTasks('start_time')">Trier par heure de début</button>
      <button @click="sortTasks('end_time')">Trier par heure de fin</button>
      <button @click="sortTasks('label')">Trier par libellé</button>
      <ul>
        <li v-for="task in tasks" :key="task._id">
          {{ task.label }} - {{ task.start_time }} - {{ task.end_time }}
          <button @click="deleteTask(task._id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeTaches',
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    sortTasks(field) {
      if (field === 'end_time') {
        this.tasks.sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a[field]}`);
          const timeB = new Date(`1970-01-01T${b[field]}`);
          return timeA - timeB;
        });
      } else {
        this.tasks.sort((a, b) => (a[field] > b[field]) ? 1 : -1);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
