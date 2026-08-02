import { NextRequest, NextResponse } from 'next/server';

import { 
  fetchArchived, 
  toggleArchive 
} from '../../../lib/taskQueries';

//get archived
export async function GET() {
  try {
    const tasks = fetchArchived();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

//archive or unarchive
export async function PATCH(request: NextRequest) {

    try {
        const body = await request.json();
        const{ id} = body

        if (!id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }

        const rowsUpdated = toggleArchive(id);

        if (rowsUpdated === 0) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, updatedId: id }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to archive task' },
            { status: 500 }
            );
    } 
}
