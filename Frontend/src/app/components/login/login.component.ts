import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables de control
  opselected: string = '0';
  
  //Variables para recepción
  correo: string = '';
  contra: string = '';
  tipouser: string = '';
  busqueda: string = '';

  //Variables auxiliares
  valdatos: boolean;
  valtipuser: boolean;
  valadmin: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //---------Métodos de captura de datos
  //Obtener el dato del selector de tipos de usuario
  Capturatipo()
  {
    //Se tiene el tipo de usuario
    this.tipouser = this.opselected;
  };
  //Obtener los datos de usuario
  Capturadatos(correo, contra)
  {
    //Enviar datos a las variables
    this.correo = correo.value;
    this.contra = contra.value;

    //Llamado a verificadoras de contenido
    this.valdatos = this.Verifcamposllenos(this.correo, this.contra);
    this.valtipuser = this.Veriftipousuario(this.tipouser);

    //Si ambas variables son verdaderas se redirige a la ruta respectiva
    if(this.valdatos == true && this.valtipuser == true)
    {
      if(this.tipouser == '1')
      {
        this.router.navigate(['/userpg']);
      }
      else
      {
        //Se verifica que los datos del admin sean los correctos
        this.valadmin = this.Verifadmi(this.correo, this.contra);

        if(this.valadmin == true)
        {
          this.router.navigate(['/screen2']);
        }
      }      
    }
  };

  //---------Funciones de verificación
  //Función de verificación de campos
  Verifcamposllenos(correo:string, contra:string): boolean
  {
    //Campos deben ser distintos de null
    if(correo == '' || contra == '')
    {
      alert('Es necesario llenar todos los campos');
      return false;
    }
    else
    {
      return true;
    }
  };
  //Función de verificacion de usuario
  Veriftipousuario(tipousuario:string): boolean
  {
    //El tipo usuario debe ser 1 o 2
    if(tipousuario =='1' || tipousuario == '2')
    {
      return true;
    }
    else
    {
      alert("Debe seleccionar un tipo de usuario");
      return false;
    }
  };
  //Función de verificación de admin
  Verifadmi(correo:string, contra:string): boolean
  {
    if(correo == 'admin' && contra == '1234')
    {
      return true;
    }
    else
    {
      alert("No coinciden los datos");
      return false;
    }
  };

}
