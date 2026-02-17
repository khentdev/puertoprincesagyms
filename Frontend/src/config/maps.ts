import { LoadEnv } from "./loadEnv"

export const MAPS_CONFIG = {
    apiKey: LoadEnv("VITE_GOOGLE_MAP_API_KEY"),
    staticMap: {
        baseUrl: "https://maps.googleapis.com/maps/api/staticmap",
        defaultZoom: 17,
        defaultSize: { width: 700, height: 700 },
        markerColor: "0x2f855a",
    },
} as const
