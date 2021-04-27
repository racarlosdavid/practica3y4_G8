import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';

import { UsersService } from '../../services/Userservice/users.service'

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.component.html',
  styleUrls: ['./registrouser.component.css']
})
export class RegistrouserComponent implements OnInit {

  //Se utiliza una interfaz para almacenar la info del usuario
  newuser: Usuario = {
    usuario: '',
    correo: '',
    contrasenia: '',
    nombre: '',
    apellido: '',
    edad: ''
  };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  //Método para guardar un nuevo usuario
  SaveUser()
  {
    //Parsing del número
    var num = Number(this.newuser.edad);
    //Se retorna el dato casteado
    this.newuser.edad = num;

    //Llamado al servicio
    this.usersService.saveUser(this.newuser).subscribe(
      res =>{
        console.log(res);
        alert('Usuario ingresado con éxito');
      },
      err =>{
        console.error(err);
        alert('Error al registrar usuario, intente de nuevo');
      }
    )
    
    //Luego de la consulta se limpia el formulario
    this.LimpiarForm();
  }

  //Limpieza de campos
  LimpiarForm()
  {
    document.forms["idform"].reset();
  }
}
