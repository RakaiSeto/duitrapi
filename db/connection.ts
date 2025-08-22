import { drizzle } from 'drizzle-orm/node-postgres';
import test from 'node:test';
import { Pool } from 'pg';
// Initialize the PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!),
});
const db = drizzle(pool);

export const testDbConnection = async () => {
    let client;
    try {
        client = await pool.connect();
        // Run a simple, non-destructive query to check the connection
        await client.query('SELECT 1');
        console.log('✅ Database connection successful!');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
    }
};

testDbConnection();

export default db;
