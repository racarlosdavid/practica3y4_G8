import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Se verifica que el local storage almacen un dpi para verificar login correcto
    if(localStorage.getItem('dpi') === null)
    {
      this.router.navigate(['']);
    }
  }

}
