import type { ValidBarangays } from "../types"
import type { StaticMapOptions } from "../utils/mapHelpers"

export const BARANGAY_MAP_OPTIONS: Record<ValidBarangays, StaticMapOptions> = {
    Maunlad: {
        zoom: 18,
        maptype: "hybrid",
        markerColor: "red",
        scale: 2,
    },
    "San Miguel": {
        zoom: 17,
        maptype: "hybrid",
        markerColor: "red",
        scale: 2,
    },
    Manggahan: {
        zoom: 18,
        maptype: "hybrid",
        markerColor: "red",
        scale: 2,
    },
    "San Pedro": {
        zoom: 16,
        maptype: "hybrid",
        markerColor: "red",
        scale: 2,
    },
}

export const getBarangayMapOptions = (barangay: ValidBarangays): StaticMapOptions =>
    BARANGAY_MAP_OPTIONS[barangay] || {}

