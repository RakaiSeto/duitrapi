import sequelize from '@/models/database/connection';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return NextResponse.json({ message: 'Database connection successful' });
    } catch (error: unknown) {
        console.error('Unable to connect to the database:', error);
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
