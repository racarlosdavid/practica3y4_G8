export interface pago {
    Num_tarjeta: string,
    Nombre_tarjeta: string,
    Fecha_vencimiento: string,
    cvv: number|null,
    Total: number|null,
    Id_usuario: number|null
}