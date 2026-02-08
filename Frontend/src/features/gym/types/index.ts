export interface Gym {
    id: string
    name: string
    barangay: Omit<Barangays, "All Locations">
    address: string
    location: {
        lat: number
        lng: number
    }
    profile_image: string
    images: string[]
    map_link: string
}

export type Barangays = "All Locations" | "San Pedro" | "Manggahan"