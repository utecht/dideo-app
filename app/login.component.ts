import {User} from './user';
import {Component} from 'angular2/core';
import {UserService} from './user.service';
import {Router} from 'angular2/router';

@Component ({
  selector: 'my-login',
  templateUrl: 'templates/login.html',
})

export class LoginComponent {
  public name: string;
  public password: string;

  constructor(private _userService: UserService, private _router: Router){ }

  public login(){
    this._userService.setUser(this.name);
    // setTimeout here to prevent bug https://github.com/angular/angular/issues/6154
    setTimeout(() => this._router.navigate(['User']));
  }
}
