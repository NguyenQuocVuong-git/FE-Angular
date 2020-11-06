import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  isShow = false;
  constructor() {}

  ngOnInit(): void {}

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }
}
