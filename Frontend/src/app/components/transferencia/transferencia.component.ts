import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario'
import { Usuario } from 'src/app/models/Usuario'
import { InventarioService } from 'src/app/services/Inventario/inventario.service'
import { UsersService } from 'src/app/services/Userservice/users.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  inventario = []
  dpi:number
  pelicula:any
  usuario:any
  listUser = []

  constructor(private lectura:InventarioService, private lecturaUser:UsersService, private router:Router) { 
    this.dpi = Number(localStorage.getItem('dpi'))
  }

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarInventario(){
    let select = document.getElementById('dropPeliculas')
    if(select != undefined){
      this.lectura.getInventario(this.dpi).subscribe((res) =>{
        let alquiler = <Inventario[]>res
        let contador = 1;
        for(let item of alquiler){
          if(item.llave != null){
            this.inventario.push(item)
            let option = document.createElement('option')
            option.value = String(contador)
            option.innerHTML = item.name + ' ' + item.fecha
            select.appendChild(option)
            contador = contador + 1
          }
        }
      })
    }
    
  }
  
  selectPelicula(valor:String){
    if(valor == 'Seleccione'){
      alert('Debe seleccionar una pelicula!')
      return
    }else{
      //console.log(valor)
      this.pelicula = this.inventario[Number(valor) - 1]
      let titulo = document.getElementById('tituloTrans')
      titulo.setAttribute('style','visibility:visible')
      let mensajeP = document.getElementById('peliTrans')
      mensajeP.innerHTML = 'Se transferirá '+ this.pelicula.name + ' a: '
      mensajeP.setAttribute('style','visiility:visible')
    }
  }

  cargarUsuarios(){
    this.lecturaUser.getUser().subscribe((res) =>{
      this.listUser = <Usuario[]>res
    })

  }
  buscarUser(username){
    if(this.pelicula != undefined){
      for(let item of this.listUser){
        if(item.usuario == username.value){
          this.usuario = item
          let input = document.getElementById('inputValid')
          input.className += ' is-valid'
          let mensajeP = document.getElementById('peliTrans')
          mensajeP.innerHTML = 'Se transferirá '+ this.pelicula.name + ' a: ' + item.usuario
          //mostrar boton
          let btn = document.getElementById('btnTrans')
          btn.setAttribute('style','visibility: visible')
        }
      }
    }
    else{
      alert("Primero debe seleccionar una pelicula!")
    }
  }
  transferir(){
    this.lectura.transferir(this.usuario.dpi,this.pelicula.idpelicula,this.pelicula.llave,Number(localStorage.getItem('dpi')))
    .subscribe((res) =>{
      alert('Transferencia exitosa!')
      this.router.navigate(['inventario'])
    })
  }
}
