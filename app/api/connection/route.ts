import { testDbConnection } from '@/db/connection';
import { logToQueue } from '@/utils/Queue';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        testDbConnection();
        console.log('Connection has been established successfully.');
        logToQueue((request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0], 'API', 'Connection', true, 'Database connection successful')
        return NextResponse.json({ message: 'Database connection successful' });
    } catch (error: unknown) {
        console.error('Unable to connect to the database:', error);
        logToQueue((request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0], 'API', 'Connection', false, 'Database connection failed')
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof (error as { message: string }).message === 'string'
        ) {
            errorMessage = (error as { message: string }).message;
        }
        return NextResponse.json({ message: 'Database connection failed', error: errorMessage }, { status: 500 });
    }
}
