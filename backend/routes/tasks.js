const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Employee = require('../models/Employee');

// Middleware pour obtenir une tâche par ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "La tâche n'a pas été trouvée" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

// GET toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assigned_to').maxTimeMS(30000);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET une tâche
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// POST une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const { label, start_time, end_time } = req.body;

    // Calculer la durée de la tâche en heures
    const duration = Math.abs(new Date(end_time) - new Date(start_time)) / 36e5;

    if (duration > 8) {
      return res.status(400).send("La durée de la tâche ne peut pas dépasser 8 heures.");
    }

    const task = new Task({
      label,
      start_time,
      end_time
    });

    const savedTask = await task.save();

    res.send(savedTask);
  } catch (error) {
    console.error('Une erreur est survenue:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Assigner une tâche à un employé
router.post('/:taskId/assign/:employeeId', async (req, res) => {
  try {
    const { taskId, employeeId } = req.params;

    const task = await Task.findById(taskId);
    const employee = await Employee.findById(employeeId);

    if (!task || !employee) {
      return res.status(404).send("La tâche ou l'employé n'a pas été trouvé.");
    }

    if (employee.assigned_task.length > 0) {
      return res.status(400).send("L'employé est déjà assigné à une autre tâche.");
    }

    task.assigned_to.push(employeeId);
    employee.assigned_task.push(taskId);

    await task.save();
    await employee.save();

    res.send("La tâche a été assignée avec succès à l'employé.");
  } catch (error) {
    console.error('Une erreur est survenue:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Désassigner une tâche
router.post('/:taskId/unassign', async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).send('Tâche non trouvée');
      }
  
      // Vérifier si la tâche est assignée à un employé
      if (task.assigned_to.length === 0) {
        return res.status(400).send("La tâche n'est pas assignée à un employé.");
      }
  
      // Obtenir l'ID de l'employé assigné à la tâche
      const assignedEmployeeId = task.assigned_to[0];
  
      // Rechercher l'employé dans la base de données
      const employee = await Employee.findById(assignedEmployeeId);
  
      if (!employee) {
        return res.status(404).send("L'employé assigné à la tâche n'a pas été trouvé.");
      }
  
      // Retirer la tâche de la liste des tâches assignées à l'employé
      const taskIndex = employee.assigned_task.indexOf(taskId);
      if (taskIndex > -1) {
        employee.assigned_task.splice(taskIndex, 1);
        await employee.save();
      }
  
      // Vider la liste des employés assignés à la tâche
      task.assigned_to = [];
      await task.save();
  
      res.send('Tâche désassignée avec succès');
    } catch (error) {
      console.error('Une erreur est survenue:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  });
  

// Supprimer une tâche
router.delete('/:id', getTask, async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).send('Tâche non trouvée');
      }
  
      const employeeIds = task.assigned_to;
      const employees = await Employee.find({ _id: { $in: employeeIds } });
  
      employees.forEach(async (employee) => {
        const taskIndex = employee.assigned_task.indexOf(taskId);
        if (taskIndex > -1) {
          employee.assigned_task.splice(taskIndex, 1);
          await employee.save();
        }
      });
  
      await Task.deleteOne({ _id: taskId });
  
      res.send('Tâche supprimée avec succès');
    } catch (error) {
      console.error('Une erreur est survenue:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  });
  
  
  

module.exports = router;
