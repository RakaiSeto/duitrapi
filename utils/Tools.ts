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
    const moment = require('moment-timezone');

    const timestamp = Date.now();
    const dateInSpecificTimezone = moment(timestamp).tz('America/New_York'); // Example: New York time zone

    const readableSpecificTimezone = dateInSpecificTimezone.format('YYYY-MM-DD HH:mm:ss z'); // Example: "2025-08-19 10:01:00 EDT"
    return readableSpecificTimezone;
}
