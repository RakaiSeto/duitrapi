import * as roleDal from '@/db/dal/role';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const roles = await roleDal.findAll();
        console.log('Roles:', roles);
        return NextResponse.json(roles);
    } catch (error: unknown) {
        console.error('Error fetching roles:', error);

        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: 'Failed to fetch roles : ' + errorMessage }, { status: 500 });
    }
}