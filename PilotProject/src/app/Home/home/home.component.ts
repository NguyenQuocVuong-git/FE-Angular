import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public _routerService : Router,
  ) { }

  ngOnInit(): void {
  }
  redirectLogin(){
    this._routerService.navigate(['/login']);
  }

}
