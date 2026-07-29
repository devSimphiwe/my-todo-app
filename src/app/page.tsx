
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/floatingbtn";

const dummyTasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    topic: "Web Development",
    description:
      "Finish building the Todo application using Next.js and Tailwind CSS.",
    dueDate: "31 July 2026",
    status: "To Do",
  },
  {
    id: 2,
    title: "Study Database Design",
    topic: "Database",
    description:
      "Review Prisma models, relationships, and migrations for PostgreSQL.",
    dueDate: "2 August 2026",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Go Grocery Shopping",
    topic: "Personal",
    description:
      "Buy milk, eggs, bread, chicken, vegetables, and fruit for the week.",
    dueDate: "30 July 2026",
    status: "Done",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 p-8">
      {dummyTasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          topic={task.topic}
          description={task.description}
          dueDate={task.dueDate}
          status={task.status}
        />
      ))}
      
      <FloatingButton />

    </main>
  );
}