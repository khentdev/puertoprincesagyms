import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axiosInstance from "./axiosConfig";
import useTokenFingerprint from "../../shared/composables/useFingerprint";
import getCookie from "../../utils/getCookie";


const onRequest = (config: InternalAxiosRequestConfig) => {
    const isProd = import.meta.env.PROD

    const fingerprint = useTokenFingerprint()
    config.headers['X-Fingerprint'] = fingerprint.value

    const csrfTokenPrefix = isProd ? "__Secure-csrfToken" : "csrfToken"
    config.headers["X-CSRF-Token"] = getCookie(csrfTokenPrefix)
    return config
}
const onRequestError = (error: AxiosError) =>
    Promise.reject(error)

const onResponse = (response: AxiosResponse) => {
    return response.data
}
const onResponseError = (error: AxiosError) => {
    return Promise.reject(error)
}

export const setupAxiosInterceptor = () => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
}