export type ActivityLog = {
    activity_log_id: string;
    user_id: string;
    category: string;
    activity_name: string;
    is_success: boolean;
    timestamp: string;
    description: string;
}