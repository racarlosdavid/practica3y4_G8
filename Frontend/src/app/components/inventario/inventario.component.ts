import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  imagePath:String

  constructor() { 
    this.imagePath = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTXwLPDL54FTa0crTnhYDxZFKEAvifGbYuoXtsldGIhsgRbyYtZ'
   }

  ngOnInit(): void {
  }

}