export interface Gym {
    id: string
    name: string
    barangay: string
    address: string
    location: {
        lat: number
        lng: number
    }
    profile_image: string
    images: string[]
    map_link: string
}[]