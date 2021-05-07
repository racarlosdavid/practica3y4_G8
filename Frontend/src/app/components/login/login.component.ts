import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Getusuario, Getuser, Localuser } from 'src/app/models/Usuario';

import { UsersService } from '../../services/Userservice/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables de control
  opselected: string = '0';
  radioselect: number = 0;
  
  //Variables para recepción
  correo: string = '';
  contra: string = '';
  tipouser: string = '';
  busqueda: string = '';
  prueba: string = '';

  //Variables para verificación
  valdatos: boolean;
  valtipuser: boolean;
  valadmin: boolean;

  constructor(private usersService: UsersService, private router: Router) { }

  //Objeto de interfaz para guardar datos
  nuser: Getusuario = {
    dpi: 0,
    usuario: '',
    correo: '',
    contrasenia: '',
    nombre: '',
    apellido: '',
    edad: ''
  };
  //Objeto para guardar el retorno de todos los usuarios
  nuser2: any = [];
  //Objeto para petición de usuario y contraseña
  objuser: Getuser = {
    user: '',
    contra: ''
  }
  //Objeto para guardar un dato
  objstorage: any = [];
  //Objeto para admin
  obadmin: any = {
    dpi: 1
  }

  ngOnInit(): void {
    //Al inicio se limpia el local storage
    localStorage.clear();
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

    //Llamado a verificadoras del contenido de los inputs
    this.valdatos = this.Verifcamposllenos(this.correo, this.contra);
    this.valtipuser = this.Veriftipousuario(this.tipouser);

    //Si ambas variables son verdaderas se procede a la siguiente verificación
    if(this.valdatos == true && this.valtipuser == true)
    {

      //1 = cliente, 0 = admin
      if(this.tipouser == '1')
      {
        this.Verifcliente(this.correo, this.contra);  
        //this.router.navigate(['/cliente']);
      }
      else
      {
        //Se verifica que los datos del admin sean los correctos
        this.Verifadmi(this.correo, this.contra);
        //this.router.navigate(['/admin']);
      }      
    }
  };

  //---------Funciones de verificación de contenido
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

  //---------Funciones de verificación de datos
  //Verificación del cliente
  Verifcliente(correo:string, contra:string)
  {
    //Se asignan las variables al objeto usuario
    this.objuser.user = correo;
    this.objuser.contra = contra;

    //Dependiendo de los valores del radiobutton se procede a la respectiva consulta
    if(this.radioselect == 0)
    {
      //Login por usuario
      this.getByUser();
    }
    else
    {
      //Login por correo
      this.getByMail();
    }
  }
  //Verificación del admin
  Verifadmi(correo:string, contra:string)
  {
    //Se asignan las variables al objeto usuario
    this.objuser.user = correo;
    this.objuser.contra = contra;
    
    //Dependiendo de los valores del radiobutton se procede a la respectiva consulta
    if(this.radioselect == 0)
    {
      //Login por usuario
      this.usersService.getAdmin().subscribe(
        res => {
          console.log(res);
          //La respuesta se almacena en nuser2
          this.nuser2 = res;

          if((this.nuser2[0].usuario == correo) && (this.nuser2[0].contrasenia == contra))
          {
            this.objstorage = this.obadmin;
            console.log(this.objstorage.dpi);

            //Guardado en el LocalStorage
            localStorage.setItem('dpi', this.objstorage.dpi);

            //Redirigir
            this.router.navigate(['/admin']);
          }
          else
          {
            alert("Datos incorrectos");
          }
        },
        err => {
          console.error(err);
          alert("Datos erróneos");
        }
      )
    }
    else
    {
      //Login por correo
      this.usersService.getAdmin().subscribe(
        res => {
          console.log(res);
          //La respuesta se almacena en nuser2
          this.nuser2 = res;

          if((this.nuser2[0].correo == correo) && (this.nuser2[0].contrasenia == contra))
          {
            this.objstorage = this.obadmin;
            console.log(this.objstorage.dpi);

            //Guardado en el LocalStorage
            localStorage.setItem('dpi', this.objstorage.dpi);

            //Redirigir
            this.router.navigate(['/admin']);
          }
          else
          {
            alert("Datos incorrectos");
          }
        },
        err => {
          console.error(err);
          alert("Datos erróneos");
        }
      )
    }
  };

  //----------Peticiones a MySQL
  //Obtener todos los usuarios
  Listarusuarios()
  {
    this.usersService.getUser().subscribe(
      res => {
        console.log(res);
        this.nuser2=res;
        alert(this.nuser2);
      },
      err => {
        console.error(err);
      }
    )
  };
  //Obtener un ID en base al usuario y contraseña
  getByUser()
  {
    this.usersService.logByUser(this.objuser).subscribe(
      res => {
        console.log(res);
        //La respuesta se almacena en el objstorage
        this.objstorage = res;
        console.log(this.objstorage.dpi);

        //Guardado en el LocalStorage
        localStorage.setItem('dpi', this.objstorage.dpi);

        //Redirigir
        this.router.navigate(['/cliente']);
      },
      err => {
        console.error(err);
        alert("Datos erróneos");
      }
    )
  }
  //Obtener un ID en base al correo y usuario
  getByMail()
  {
    this.usersService.logByMail(this.objuser).subscribe(
      res => {
        console.log(res);
        //La respuesta se almacena en el objstorage
        this.objstorage = res;
        console.log(this.objstorage.dpi);

        //Guardado en el LocalStorage
        localStorage.setItem('dpi', this.objstorage.dpi);

        //Redirigir
        this.router.navigate(['/cliente']);
      },
      err => {
        console.error(err);
        alert("Datos erróneos");
      }
    )
  }

  //----------Otras funciones
  //Ir a registro
  Registro()
  {
    this.router.navigate(['/registro']);
  }
  //Funciones de cambio de valor para los radiobutton
  radiod()
  {
    this.radioselect = 0;
  }
  radiod2()
  {
    this.radioselect = 1;
  }
}
