import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';

import { UsersService } from '../../services/Userservice/users.service'

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.component.html',
  styleUrls: ['./registrouser.component.css']
})
export class RegistrouserComponent implements OnInit {

  //Se utiliza una interfaz para almacenar la info del usuario
  newuser: Usuario = {
    dpi: '',
    usuario: '',
    correo: '',
    contrasenia: '',
    nombre: '',
    apellido: '',
    edad: ''
  };

  constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit(): void {
  }

  //Método para guardar un nuevo usuario
  SaveUser()
  {
    //Se realiza el parsing de string a number
    this.CastearDatos()

    //Llamado al servicio
    this.usersService.saveUser(this.newuser).subscribe(
      res =>{
        console.log(res);
        alert('Usuario ingresado con éxito');
        this.router.navigate(['']);
      },
      err =>{
        console.error(err);
        alert('Error al registrar usuario, intente de nuevo');
      }
    )
    
    //Luego de la consulta se limpia el formulario
    this.LimpiarForm();
  }

  //Método para hacer el casteo de string a number
  CastearDatos()
  {
    //Una variable auxiliar toma el valor y lo retorna ya casteado
    var aux = Number(this.newuser.edad);
    this.newuser.edad = aux;

    aux = Number(this.newuser.dpi);
    this.newuser.dpi = aux;
  }

  //Limpieza de campos
  LimpiarForm()
  {
    document.forms["idform"].reset();
    console.log('Formulario limpio');
  }
}
