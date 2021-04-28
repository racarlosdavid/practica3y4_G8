//Modelo de los datos de un nuevo usuario
//Se les coloca a los campos number|string para que al realizar el enlace por ngModel
//no interrumpan el placeholder
export interface Usuario {
    dpi: number|string;
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

//Modelo de los datos que se reciben de un select de usuarios
export interface Getusuario {
    dpi: number;
    usuario: string;
    correo: string;
    contrasenia: string;
    nombre: string;
    apellido: string;
    edad: number|string;
}

//Modelo de los datos para realizar un select de un solo usuario
export interface Getuser {
    user: string;
    contra: string;
}

//Modelo del dato que se recibe de un select unitario
export interface Localuser {
    dpi: number;
}