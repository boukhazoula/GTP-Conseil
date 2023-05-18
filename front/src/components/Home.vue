<template>
    <div>
      <h1>Bienvenue sur votre interface</h1>
      <TaskForm v-if="showTaskForm" />
      <TaskList v-if="showTaskList" />
      <AssignTasks v-if="showAssignTasks" />
      <AssignedTasksList v-if="showAssignedTasksList" />
    </div>
  </template>
  
  <script>
  import TaskForm from './components/TaskForm.vue';
  import TaskList from './components/TaskList.vue';
  import AssignTasks from './components/AssignTasks.vue';
  import AssignedTasksList from './components/AssignedTasksList.vue';
  
  export default {
    name: 'Home',
    components: {
      TaskForm,
      TaskList,
      AssignTasks,
      AssignedTasksList
    },
    data() {
      return {
        showTaskForm: true,
        showTaskList: true,
        showAssignTasks: true,
        showAssignedTasksList: true
      };
    }
  };
  </script>
  