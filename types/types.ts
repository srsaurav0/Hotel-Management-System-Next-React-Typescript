export interface Room {
    hotelSlug: string;
    roomSlug: string;
    roomImage?: string; // URL of the room image
    roomTitle: string;
    bedroomCount: number;
}

export interface Hotel {
    id: string;
    slug?: string;
    images?: string[]; // Array to store hotel image URLs
    title: string;
    description: string;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    hostInformation: {
        name: string;
        contact: string;
    };
    address: string;
    latitude: number;
    longitude: number;
    rooms?: Room[]; // Array to store room information
}