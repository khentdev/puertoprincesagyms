import axios, { type AxiosInstance } from 'axios'
import { LoadEnv } from '../../config/loadEnv'

const isProd = import.meta.env.PROD
const axiosInstance: AxiosInstance = axios.create({
    baseURL: isProd ? `https://${LoadEnv("VITE_API_PROD_DOMAIN_NAME")}` : LoadEnv("VITE_DEV_API_URL"),
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance