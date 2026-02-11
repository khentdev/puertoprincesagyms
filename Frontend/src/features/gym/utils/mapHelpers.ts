import { MAPS_CONFIG } from "../../../config/maps"
import type { Gym } from "../types"

export interface StaticMapOptions {
    width?: number
    height?: number
    zoom?: number
    markerColor?: string
    scale?: 1 | 2
    maptype?: "roadmap" | "satellite" | "terrain" | "hybrid"
}

export function generateStaticMapUrl(
    gym: Gym,
    options: StaticMapOptions = {}
): string {
    const {
        width = MAPS_CONFIG.staticMap.defaultSize.width,
        height = MAPS_CONFIG.staticMap.defaultSize.height,
        zoom = MAPS_CONFIG.staticMap.defaultZoom,
        markerColor = MAPS_CONFIG.staticMap.markerColor,
        scale = 2,
        maptype = "roadmap",
    } = options

    const { lat, lng } = gym.location
    const params = new URLSearchParams({
        center: `${lat},${lng}`,
        zoom: zoom.toString(),
        size: `${width}x${height}`,
        maptype,
        markers: `color:${markerColor}|label:${gym.name.charAt(0)}|${lat},${lng}`,
        scale: scale.toString(),
        key: MAPS_CONFIG.apiKey,
    })

    return `${MAPS_CONFIG.staticMap.baseUrl}?${params.toString()}`
}
