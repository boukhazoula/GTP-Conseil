const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  label: String,
  start_time: String,
  end_time: String,
  assigned_to: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
