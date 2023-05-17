<template>
  <div>
    <h2>Créer une tâche</h2>

    <div>
      <label for="taskLabel">Libellé</label>
      <input id="taskLabel" v-model="label" placeholder="Libellé de la tâche" required>
    </div>

    <div>
      <label for="startTime">Heure de début</label>
      <input id="startTime" v-model="start_time" type="time" required>
    </div>

    <div>
      <label for="endTime">Heure de fin</label>
      <input id="endTime" v-model="end_time" type="time" required>
    </div>

    <button @click="createTask">Créer la tâche</button>
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
