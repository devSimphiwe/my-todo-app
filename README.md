# my-todo-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


---

# Node.js Version Requirement

This project requires **Node.js v20.9.0 or higher** (required by Next.js 16).

If you are running an older version, you can update using **nvm (Node Version Manager)**:

```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# Install and switch to Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node -v

# Start the development server
npm run dev
```

---


# How to Clone the Repository

To clone and set up the **my-todo-app** project on your local machine, follow these steps:

## Prerequisites

Make sure you have the following installed:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (v20.9.0 or higher)

---

## Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/devSimphiwe/my-todo-app.git
```

## Step 2: Navigate to the Project Directory

```bash
cd my-todo-app
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** with your browser to see the application.


# Packages

This project uses the following core packages:

## Node.js

* Runs the Next.js application locally.
---

## SQLite

* No database server installation required.Stores todo items locally.
---

# Main Dependencies

| Package          | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| `next`           | React framework for building the application.        |
| `react`          | Builds the user interface using reusable components. |
| `react-dom`      | Renders React components in the browser.             |
| `better-sqlite3` | Connects the application to the SQLite database.     |

---

# Database Design
This project only uses 1 table i.e. tasks:


| Column        | Data Type | Description                                                                                                                                                                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `INTEGER` | A unique identifier for each task. It is the **primary key** and is automatically incremented (`AUTOINCREMENT`) whenever a new task is added.                                                                                          |
| `title`       | `TEXT`    | Stores the title of the task. It is marked `NOT NULL`, meaning every task must have a title.                                                                                                                                           |
| `description` | `TEXT`    | Stores additional details about the task. This field is optional because it is not marked `NOT NULL`.                                                                                                                                  |
| `topic`       | `TEXT`    | Represents the category of the task. It cannot be empty (`NOT NULL`) and defaults to `'PERSONAL'`. The `CHECK` constraint ensures that only one of these values can be stored: `WORK`, `PERSONAL`, `FINANCE`, `HEALTH`, or `LEARNING`. |
| `status`      | `TEXT`    | Tracks the current state of the task. It cannot be empty and defaults to `'To-do'`. The `CHECK` constraint restricts values to `To-do`, `In-Progress`, or `Completed`.                                                                 |
| `dueDate`     | `TEXT`    | Stores the task's deadline. It is required (`NOT NULL`). Since SQLite does not have a dedicated date type, the date is stored as text (commonly in `YYYY-MM-DD` or ISO 8601 format).                                                   |
| `createdAt`   | `TEXT`    | Records when the task was created. It is required and automatically defaults to the current date and time using `datetime('now')`.                                                                                                     |
| `archived`    | `INTEGER` | Indicates whether a task has been archived. It defaults to `0` (not archived). The `CHECK` constraint ensures the value is either `0` (false) or `1` (true).                                                                           |

AI Declaration: The preceding document was reviewed and edited with : Gemini flash and GPT-5.5.
