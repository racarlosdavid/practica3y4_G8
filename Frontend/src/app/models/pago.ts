export interface pago {
    Id_transaccion: number|null,
    Num_tarjeta: string,
    Nombre_tarjeta: string,
    Fecha_vencimiento: string,
    CVV: number|null,
    Total: number|null,
    dpi: number|null
}