export interface Gym {
    id: string
    name: string
    barangay: ValidBarangays
    address: string
    location: {
        lat: number
        lng: number
    }
    profile_image: string
    images: string[]
    map_link: string
}

export const BARANGAYS = ["All Locations", "San Pedro", "Manggahan", "San Miguel"] as const;
export type Barangays = typeof BARANGAYS[number];
export type ValidBarangays = Exclude<Barangays, "All Locations">;

