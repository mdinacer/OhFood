export interface LocationAddress {
    country: string;
    county: string;
    town?: string;
    suburb?: string;
    state: string;

    postcode: string;
    neighbourhood: string;
    longitude: string;
    latitude: string;
}

export interface LocationData {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        neighbourhood: string;
        town: string;
        county: string;
        suburb: string;
        state: string;
        postcode: string;
        country: string;

    }
    boundingbox: string[];
}

export interface LocationDataAddress {
    neighbourhood: string;
    town: string;
    county: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
}