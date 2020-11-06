import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent implements OnInit {
  
  isShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.isShow = false;
  }

  show() {
    this.isShow = true;
  }


}
