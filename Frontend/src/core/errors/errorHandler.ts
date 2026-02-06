import type { AxiosError } from "axios";
import type { ErrorHandlerReturnType, ErrorResponse } from "./types";
import { getSystemErrorMessage } from "../infra/errorMessages";


function errorHandler<C extends string>(error: AxiosError<ErrorResponse<C>>): ErrorHandlerReturnType<C> {

    if (error.code === "ERR_CANCELED")
        return { isRetryable: false, message: "Request was canceled", shouldLogout: false, type: "user_cancelled", error }

    if (error?.code === "ECONNABORTED" || error.response?.status === 408)
        return { isRetryable: true, message: "Request timeout. Please try again.", shouldLogout: false, type: "server_timeout", error }

    if (!error.response || error.code === "ERR_NETWORK") {
        const msg = !navigator.onLine ? getSystemErrorMessage("user_offline") : getSystemErrorMessage("server_unreachable")
        return {
            type: !navigator.onLine ? 'user_offline' : 'server_unreachable',
            isRetryable: true,
            shouldLogout: false,
            message: msg,
            error
        }
    }

    if (error.response.data.error.code === "SERVER_ERROR" || !error.response.data.error.code || (error.response.status ?? 0) > 500) {
        const msg = getSystemErrorMessage("server_error")
        return { isRetryable: true, shouldLogout: false, message: msg, type: "server_error", error };
    }

    const { code, message, field, data } = error.response.data.error
    return { isRetryable: true, shouldLogout: false, message: message ?? getSystemErrorMessage("server_error"), code, type: "server_error", data, field, error }

}

export default errorHandler