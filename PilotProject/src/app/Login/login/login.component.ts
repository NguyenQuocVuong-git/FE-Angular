import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error : number = 0;
  constructor(
    public router : Router 
  ) { }

  ngOnInit(): void {
  }

  onLogin(username : string , password : string){
    let user = {
      username : 'username',
      password : 'password'
    }
    if(username == 'admin' && password == 'admin'){
      //tạo 1 biến toàn cục 
      localStorage.setItem('user',JSON.stringify(user));
      this.router.navigate(['/brand']);
    }else{
      this.error = -1 ;
    }
    
  }

}
