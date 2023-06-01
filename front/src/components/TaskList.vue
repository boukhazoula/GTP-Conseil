<template>
  <div class="task-list">
    <h2>Liste des tâches</h2>
    <table>
      <tr>
        <th>Libellé</th>
        <th>Heure de début</th>
        <th>Heure de fin</th>
        <th class="action-column">Action</th>
      </tr>
      <tr v-for="task in tasks" :key="task._id">
        <td>{{ task.label }}</td>
        <td>{{ task.start_time }}</td>
        <td>{{ task.end_time }}</td>
        <td class="action-column"><button @click="deleteTask(task._id)">Supprimer</button></td>
      </tr>
    </table>
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
<style scoped>
.task-list {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.task-list h2 {
  color: #4CAF50;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 15px 63px;
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
</style>