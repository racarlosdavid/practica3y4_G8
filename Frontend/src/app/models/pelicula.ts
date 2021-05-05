export interface Pelicula {
    id: number;
    name: string;
    image: string;
    chargerate: number;
    active: number;
    availabilities: Array<number>;
    languages: Array<number>;
}
