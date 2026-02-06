import { AxiosError } from "axios";
import type { SystemErrorTypes } from "../infra/errorMessages";

export interface ErrorResponse<C extends string = string> {
    error: {
        message: string
        code: C,
        field: string,
        data?: Record<string, any>
    }
}

export interface ErrorHandlerReturnType<C extends string = string> {
    shouldLogout: boolean,
    isRetryable: boolean,
    code?: C,
    type: SystemErrorTypes,
    field?: string,
    message: string,
    data?: Record<string, any>,
    error: AxiosError<ErrorResponse<C>>
}