This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# How to Clone the Repository

To clone and set up the **my-todo-app** project on your local machine, follow these steps:

### Prerequisites
Make sure you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) installed.

---

### Step 1: Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/devSimphiwe/my-todo-app.git
````
### Step 2: Navigate to the Project Directory
````bash
cd my-todo-app
````

### Step 3: Install Dependencies
````bash
npm install
````

### Step 4: Run the Development Server
````bash
npm run dev
````

### Node.js Version Requirement

This project requires **Node.js v20.9.0 or higher** (Next.js requirement).

If you are running an older Node.js version, update it using `nvm` (Node Version Manager):

```bash
# 1. Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# 2. Install and switch to Node 20
nvm install 20
nvm use 20
nvm alias default 20

# 3. Verify installation
node -v

# 4. To run
npm run dev

Open http://localhost:3000 with your browser to see the result.
