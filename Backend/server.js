const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.use(cors());

// (Optional) Configure CORS with specific options
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const tasks = [];

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'Task Management API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: [__filename], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 */
app.get('/tasks', (req, res) => {
    res.send(tasks);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *       404:
 *         description: Task not found
 */
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        res.status(404).json({ msg: `There is no task with this id` });
    } else {
        res.json(task);
    }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title
    };

    if (!newTask.title) {
        res.status(404).json({ msg: `Please enter the title` });
    } else {
        tasks.push(newTask);
        res.status(201).json(newTask);
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        res.status(404).json({ msg: `There is no task with this id` });
    } else {
        task.title = req.body.title;
        res.status(200).json({ msg: `The task was edited`, task });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        res.status(404).json({ msg: `There is no task with this id` });
    } else {
        const deletedTask = tasks.splice(taskIndex, 1);
        res.status(200).json({ msg: 'Task deleted', deletedTask });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
