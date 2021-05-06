export interface Pelicula {
    id: number;
    name: string;
    image: string;
    chargerate: number;
    active: number;
    availabilities: Array<number>;
    languages: Array<number>;
}

export interface Pelicula2 {
    name: string;
    image: string;
    chargerate: number;
    active: number;
}

export interface Idioma {
    Code: string;
    Description: string;
}

export interface Plan {
    name: string;
    servicedays: number;
    bonusdays: number;
    fine: number;
}
export interface Plan2 {
    name: string;
    servicedays: number;
    fine: number;
}
