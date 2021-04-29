import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Se verifica que el local storage almacen un dpi para verificar login correcto
    if(localStorage.getItem('dpi') === null)
    {
      this.router.navigate(['']);
    }
  }

  cerrarSesion(){
    localStorage.clear()
    this.router.navigate(['']);
  }
}
