import moment from "moment-timezone"
import { cookies } from "next/headers";
import { getUserFromJwt } from "./Session";

export function randomAlphanumeric(length: number = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function randomNumber(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function getCurrentTimestamp() {
    // Example using moment-timezone (requires installation: npm install moment moment-timezone)

    const timestamp = Date.now();
    const dateInSpecificTimezone = moment(timestamp).tz('Asia/Jakarta'); // Example: New York time zone

    const readableSpecificTimezone = dateInSpecificTimezone.format('YYYY-MM-DD HH:mm:ss'); // Example: "2025-08-19 10:01:00 EDT"
    return readableSpecificTimezone;
}

export async function getProfileInfo() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value; // Get the token directly on the server
    let userName = "";
    let isAdmin = false;
    let isLoggedIn = false;
    if (token) {
        const payload = await getUserFromJwt(token); // Decrypt the token

        userName = payload ? (payload.fullName as string) : ""; // Get the user's name from the payload
        isAdmin = payload ? (payload.admin as boolean) : false;
        isLoggedIn = payload ? ((payload.exp && payload.exp > Date.now()) as boolean) : false;
    }
    return { userName, isAdmin, isLoggedIn };
}