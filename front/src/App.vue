<template>
  <div id="app">
    <img class="img" alt="Vue logo" src="./assets/img.png">
    <TaskForm />
    <TaskList />
    <AssignTasks />
    <AssignedTasksList />
    
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import AssignTasks from './components/AssignTasks.vue';
import AssignedTasksList from './components/AssignedTasksList.vue';

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskList,
    AssignTasks,
    AssignedTasksList,
    
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
.img{
  width: 300px;
}
</style>
