import { NextRequest, NextResponse } from 'next/server';
import { 
  getActiveTasks, 
  createTask, 
  editTask
} from '../../../lib/taskQueries';
//get active
export async function GET() {
  try {
    const tasks = getActiveTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
// create tasks
export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        const { title, topic, dueDate , description } = body


        // Validate required fields
        if (!title || !dueDate) {
            return NextResponse.json(
                { error: 'Title and due date are required' },
                { status: 400 }
            );
        }

        // Call database query with destructured payload
        const result = createTask({
            title,
            dueDate,
            topic,
            description,
        });

        return NextResponse.json({ success: true, id: result.id }, { status: 201 });

    }catch(error){
        return NextResponse.json(
        { error: 'Failed to create tasks' },
        { status: 500 }
        );
    }
}
// edit task
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, topic, dueDate, description, status, archived } = body;

    // 1. You MUST have the ID to perform an update
    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required for editing' },
        { status: 400 }
      );
    }

    const rowsUpdated = editTask({
      id,
      title,
      dueDate,
      topic,
      description,
      status,
      archived,
    });

    // 3. Check if the task was actually found and updated in DB
    if (rowsUpdated === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Return 200 OK for successful updates (201 is only for resource creation)
    return NextResponse.json({ success: true, updatedId: id }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to edit task' },
      { status: 500 }
    );
  }
}
