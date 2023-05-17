<template>
  <div>
    <h2>Affecter des tâches aux employés</h2>

    <div>
      <label for="task">Tâche</label>
      <select id="task" v-model="selectedTask" required>
        <option disabled value="">Veuillez sélectionner une tâche</option>
        <option v-for="task in tasks" :key="task._id" :value="task._id">
          {{ task.label }}
        </option>
      </select>
    </div>

    <div>
      <label for="employee">Assigner à l'employé</label>
      <select id="employee" v-model="selectedEmployee" required>
        <option disabled value="">Veuillez sélectionner un employé</option>
        <option v-for="employee in employees" :key="employee._id" :value="employee._id">
          {{ employee.name }}
        </option>
      </select>
    </div>

    <button @click="confirmAssignTask">Assigner la tâche</button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div>
      <h2>Créer un nouvel employé</h2>

      <div>
        <input v-model="newEmployeeName" placeholder="Nom de l'employé" required>
        <button @click="createEmployee">Créer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AssignTasks',
  data() {
    return {
      tasks: [],
      employees: [],
      selectedTask: '',
      selectedEmployee: '',
      errorMessage: '',
      newEmployeeName: '',
    };
  },
  created() {
    this.fetchTasks();
    this.fetchEmployees();
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
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:3000/employees');
        this.employees = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async assignTask() {
      if (!this.selectedTask || !this.selectedEmployee) {
        alert('Veuillez sélectionner à la fois une tâche et un employé.');
        return;
      }

      try {
        await axios.post(`http://localhost:3000/tasks/${this.selectedTask}/assign/${this.selectedEmployee}`);
        alert('Tâche assignée avec succès.');
        this.clearSelections();
      } catch (error) {
        console.error(error);
        this.errorMessage = "Échec de l'assignation de la tâche. Veuillez réessayer.";
      }
    },
    confirmAssignTask() {
      if (this.selectedTask === '' || this.selectedEmployee === '') {
        alert('Veuillez sélectionner une tâche et un employé.');
        return;
      }

      const employee = this.employees.find(emp => emp._id === this.selectedEmployee);
      const task = this.tasks.find(tsk => tsk._id === this.selectedTask);
      if (employee && task) {
        const existingTask = this.tasks.find(tsk => tsk.assigned_to.includes(employee._id));
        if (existingTask) {
          this.errorMessage = `L'employé "${employee.name}" a déjà une tâche assignée.`;
        } else {
          const confirmMessage = `Êtes-vous sûr de vouloir assigner la tâche "${task.label}" à l'employé "${employee.name}" ?`;
          if (confirm(confirmMessage)) {
            this.assignTask();
          }
        }
      }
    },
    async createEmployee() {
      if (this.newEmployeeName.trim() === '') {
        alert('Veuillez saisir le nom de l\'employé.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/employees', {
          name: this.newEmployeeName,
        });
        this.employees.push(response.data);
        this.newEmployeeName = '';
        alert('Employé créé avec succès.');
      } catch (error) {
        console.error(error);
        this.errorMessage = "Échec de la création de l'employé. Veuillez réessayer.";
      }
    },
    clearSelections() {
      this.selectedTask = '';
      this.selectedEmployee = '';
    },
  },
};
</script>
