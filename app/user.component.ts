import {User} from './user';
import {Component} from 'angular2/core';
import {UserService} from './user.service';
import {LoginComponent} from './login.component';
import {Router} from 'angular2/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html',
  directives: [LoginComponent]
})

export class UserComponent {
  public user: User;

  constructor(private _userService: UserService,
        private _router: Router){
    this.user = this._userService.getUser();
  }

  logout(){
    this._userService.logout();
    this.user = this._userService.getUser();
    this._router.renavigate();
  }
}
