This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
