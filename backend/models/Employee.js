const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  assigned_task: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  }]
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
