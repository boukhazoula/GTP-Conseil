const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Task = require('../models/Task');

// Middleware pour obtenir un employé par ID
async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: "L'employé n'a pas été trouvé" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

// GET tous les employés
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('assigned_task').maxTimeMS(30000);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un employé
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// POST un nouvel employé
router.post('/', async (req, res) => {
  const { name } = req.body;

  const employee = new Employee({
    name
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un employé
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    const taskIds = employee.assigned_task;
    const tasks = await Task.find({ _id: { $in: taskIds } });

    tasks.forEach(async (task) => {
      const employeeIndex = task.assigned_to.indexOf(employeeId);
      if (employeeIndex > -1) {
        task.assigned_to.splice(employeeIndex, 1);
        await task.save();
      }
    });

    await employee.remove();

    res.json({ message: "L'employé a été supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
