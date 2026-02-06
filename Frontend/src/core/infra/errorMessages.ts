export type SystemErrorTypes = "server_unreachable" | "server_error" | "server_timeout" | "user_offline" | "user_cancelled"

const INFRA_MESSAGES: Record<SystemErrorTypes, string> = {
    server_unreachable: "Can't reach the server. Try again in a moment.",
    server_error: "Something went wrong on our end. We're on it.",
    server_timeout: "Request timed out. Try again.",
    user_offline: "You're offline. Check your connection.",
    user_cancelled: "Request was canceled."
}
export const getSystemErrorMessage = (type: SystemErrorTypes) => INFRA_MESSAGES[type]


