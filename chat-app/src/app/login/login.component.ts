import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  this component acts as a whole page to provide a login point to the user.
  */
  public username:string;
  private password:string;

  constructor(private router:Router, private form:FormsModule, private _userService:UserService) {
  }
  //checks if user is logged in
  ngOnInit() {
    if(sessionStorage.getItem('user') !== null){
      this.router.navigate(['/home']);
    }
  }
  //function to login user and get server groups state
  loginUser(event){
    event.preventDefault();
    console.log(this.username);
    let user = {
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe((data: any) => {
        console.log(data);
        if(data != false){
          for (var i = 0; i < data.groups.length; i++) {
            var temp = [];
            for (var j = 0; j < data.groups[i].channels.length; j++) {
              if (data.groups[i].channels[j].members.includes(data.username) || data.groups[i].role > 0) {
                temp.push(data.groups[i].channels[j]);
              }
            }
            data.groups[i].channels = temp;
          }
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/home']);
        } else {
          let message = "Your username and password did not match."
          document.getElementById('error').innerHTML = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Oh snap!</strong> '+ message +'</div>';
        }
      },
      error => {
        console.error(error);
      }
    )
  }

}
