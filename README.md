# my-todo-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
