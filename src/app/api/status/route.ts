import { NextRequest, NextResponse } from 'next/server';

import { 
    updateTaskStatus
} from './lib/taskQueries';

//change status
export async function PATCH(request: NextRequest) {

    try {
        const body = await request.json();
        const{ id , status} = body

        if (!id || !status) {
            return NextResponse.json(
                { error: 'Task ID and new status are required' },
                { status: 400 }
            );
        }

        const rowsUpdated = updateTaskStatus(id , status);

        if (rowsUpdated === 0) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, updatedId: id }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to change tasks status' },
            { status: 500 }
            );
    } 
}
