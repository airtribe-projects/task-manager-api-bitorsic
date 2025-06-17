# Task Manager API

A simple in-memory task management API built with Express.js. It supports basic CRUD operations and includes optional filtering by completion status and task priority.

## 🚀 Overview

This API allows you to:

-   Create, retrieve, update, and delete tasks
    
-   Filter tasks by their completion status
    
-   Retrieve tasks based on their priority (low, medium, high)
    

Tasks are stored in-memory using a `Map` and initialized from `task.json` when the server starts.

## 🛠️ Setup Instructions

### Prerequisites

-   Node.js installed (v14 or higher recommended)
    

### Installation

1.  Clone the repository:
    
    ```bash
    git clone <repository_url>
    cd <project_directory>
    
    ```
    
2.  Install dependencies:
    
    ```bash
    npm install
    
    ```
    
3.  Start the server:
    
    ```bash
    node app.js
    
    ```
    
    Server will run at `http://localhost:3000`
    

## 📌 API Endpoints

All responses are in JSON. Base URL: `http://localhost:3000/`

### GET `/tasks`

Retrieve all tasks.

**Query Params:**

-   `completed=true|false` (optional) — Filter by completion status
    

**Example:**

```bash
curl http://localhost:3000/tasks?completed=true

```

### GET `/tasks/:id`

Retrieve a single task by ID.

**Example:**

```bash
curl http://localhost:3000/tasks/1

```

### POST `/tasks`

Create a new task.

**Body:**

```json
{
  "title": "New Task",
  "description": "Do something",
  "completed": false,
  "priority": "high"  // optional: low | medium | high
}

```

**Example:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing","completed":false}'

```

### PUT `/tasks/:id`

Update an existing task.

**Body:** Same structure as POST.

**Example:**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Updated desc","completed":true}'

```

### DELETE `/tasks/:id`

Delete a task by ID.

**Example:**

```bash
curl -X DELETE http://localhost:3000/tasks/1

```

### GET `/tasks/priority/:level`

Retrieve tasks with a specific priority.

**Path Params:**

-   `level`: `low`, `medium`, or `high`
    

**Example:**

```bash
curl http://localhost:3000/tasks/priority/high

```

## ✅ Priority Levels

Supported priority values:

-   `low`
    
-   `medium`
    
-   `high`
    

## 📄 Notes

-   This API uses in-memory storage, so changes won't persist after restarting the server.
    
-   Input validation is enforced for type correctness and field presence.
