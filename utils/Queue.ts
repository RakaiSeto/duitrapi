import { ActivityLog } from '@/models/activityLog'
import amqplib, { Channel, ChannelModel } from 'amqplib'
import { getCurrentTimestamp, randomAlphanumeric } from './Tools'

let connection: ChannelModel
let channel: Channel

export const connectRabbitMQ = async (): Promise<void> => {
    const RABBIT_URL = process.env.RABBITMQ_URL!

    try {
        connection = await amqplib.connect(RABBIT_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ')
    } catch (error) {
        console.error("Failed to connect to RabbitMQ", error)
    }
}

export const getRabbitChannel = (): Channel => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized")
    }

    return channel
}

export const closeRabbitMQ = async (): Promise<void> => {
    try {
        await channel.close()
        await connection.close()
    } catch (error) {
        console.error("Error closing RabbitMQ connection", error)
    }
}

export const logToQueue = async (user_id: string, category: string, activity_name: string, is_success: boolean, description: string): Promise<void> => {
    try {
        await connectRabbitMQ();

        const activityLog: ActivityLog = {
            activity_log_id: 'ACT-' + randomAlphanumeric(15),
            user_id: user_id,
            category: category,
            activity_name: activity_name,
            is_success: is_success,
            timestamp: getCurrentTimestamp(),
            description: description
        }
        const queue = process.env.RABBITMQ_QUEUE!
        await channel.assertQueue(queue, { durable: true });
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(activityLog)), { persistent: true });
        console.log(`Message sent to queue ${queue}`);
    } catch (error) {
        console.error("Error sending message to queue", error)
    }
}