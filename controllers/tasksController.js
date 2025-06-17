// trying to use map, as I read all crud operations are most efficient on this
// could have used objects, but read about prototype pollution, and really wanted to try this
let tasks = new Map();

// not mentioned anywhere, 
// but from the tests it seems that I'm supposed to load task.json into memory first
const jsonTasksList = require('../task.json').tasks;
for (const task of jsonTasksList) {
  tasks.set(task.id, {
    title: task.title,
    description: task.description,
    completed: task.completed,
  });
}
let currentId = Math.max(...tasks.keys()) + 1;

// step 4 - implementing priority levels. 
// gonna keep it optional to still pass the tests
const priorityLevels = require('../utils/constants').priorityLevels;

exports.getAllTasks = (req, res) => {
  let result = [];

  // step 4 - filtering over completed field
  const completedFilter = { true: true, false: false }[req.query.completed];
  
  // step 4 - Map() already orders it by time of insertion / creation
  for (const [key, value] of tasks) {
    // step 4 - filtering over completed field
    if (typeof completedFilter === "boolean" && value.completed !== completedFilter) continue;

    result.push({ id: key, ...value });
  }

  return res.status(200).send(result);
};

exports.getTaskById = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send({ message: `Invalid task id provided: ${req.params.id}`});
  }
  
  const task = tasks.get(id);

  if (!task) {
    return res.status(404).send({
      message: `Task with id ${id} not found`,
    });
  }

  res.status(200).send({ id, ...task })
};

exports.createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;
  let incorrectFields = [];

  if (typeof title !== "string" || title === "") incorrectFields.push("title");
  if (typeof description !== "string" || description === "") incorrectFields.push("description");
  if (typeof completed !== "boolean") incorrectFields.push("completed");
  if (priority && !priorityLevels.includes(priority)) incorrectFields.push("priority");

  if (incorrectFields.length !== 0) {
    return res.status(400).send({
      message: `Incorrect / missing fields: ${incorrectFields.join(", ")}`,
    })
  }

  tasks.set(currentId, { title, description, completed, priority });

  return res.status(201).send({ message: `Task successfully created with id ${currentId++}` });
};

exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send({ message: `Invalid task id provided: ${req.params.id}`});
  }
  
  const task = tasks.get(id);

  if (!task) {
    return res.status(404).send({
      message: `Task with id ${id} not found`,
    });
  }

  const { title, description, completed, priority } = req.body;
  let incorrectFields = [];

  if (typeof title !== "string" || title === "") incorrectFields.push("title");
  if (typeof description !== "string" || description === "") incorrectFields.push("description");
  if (typeof completed !== "boolean") incorrectFields.push("completed");
  if (priority && !priorityLevels.includes(priority)) incorrectFields.push("priority");

  if (incorrectFields.length !== 0) {
    return res.status(400).send({
      message: `Incorrect / missing fields: ${incorrectFields.join(", ")}`,
    })
  }

  tasks.set(id, { title, description, completed, priority });

  return res.status(200).send({
    message: `Successfully updated task with id ${id}`,
  });
};

exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).send({ message: `Invalid task id provided: ${req.params.id}`});
  }
  
  const isDeleted = tasks.delete(id);

  if (!isDeleted) {
    return res.status(404).send({
      message: `Task with id ${id} not found`,
    });
  }

  return res.status(200).send({ message: `Task with id ${id} deleted successfully` });
};

// step 4 - implementing priority levels. 
exports.getTasksByPriority = (req, res) => {
  if (!priorityLevels.includes(req.params.level)) {
    return res.status(400).send({
      message: `Invalid priority level ${req.params.level}. Acceptable levels: ${priorityLevels.join(", ")}`,
    });
  }

  let result = [];

  for (const [key, value] of tasks) {
    if (value.priority !== req.params.level) continue;

    result.push({ id: key, ...value });
  }

  return res.status(200).send(result);
}
