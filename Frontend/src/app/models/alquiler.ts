export interface listaPelicula {
    idPelicula: number;
    name: string;
    image: string;
    chargerate: number;
    active: number;
}

export interface alquiler{
    idalquiler:number,
    llave:string,
    fecha: string,
    Usuario_dpi:number,
    Pago_Id_transaccion:string,
    Pelicula_idpelicula:number
}