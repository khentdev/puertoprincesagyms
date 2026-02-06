import type { ErrorDefinitions } from "../../errors/index.js";

export const SESSION_ERROR_CODES = {
    TOKEN_INVALID: "TOKEN_INVALID",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
} as const

export const SESSION_ERROR_DEF: Record<SessionErrorCodes, ErrorDefinitions> = {
    TOKEN_INVALID: {
        code: "TOKEN_INVALID",
        message: "Invalid token",
        status: 401,
    },
    TOKEN_EXPIRED: {
        code: "TOKEN_EXPIRED",
        message: "Token expired",
        status: 401,
    },
} as const

export type SessionErrorCodes = keyof typeof SESSION_ERROR_CODES