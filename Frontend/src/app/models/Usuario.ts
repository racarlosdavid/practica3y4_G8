//Modelo de los datos de un nuevo usuario
export interface Usuario {
    usuario: string;
    correo: string;
    contrasenia: string;
    nombre: string;
    apellido: string;
    edad: number|string;
}
/* Usuario - Json   
{
    "usuario": "Admin",
    "correo": "theadmin@gmail.com",
    "contrasenia":"1234",
    "nombre": "John",
    "apellido": "Cena",
    "edad": 44
}
*/