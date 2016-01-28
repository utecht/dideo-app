import {User} from './user';
import {Component, OnInit} from 'angular2/core';
import {UserService} from './user.service';
import {Router} from 'angular2/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html'
})

export class UserComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService,
        private _router: Router){
  }

  ngOnInit(){
    this.user = this._userService.getUser();
    if (this.user === null){
        this._router.navigate(['Login']);
    }
  }

  logout(){
    this._userService.logout();
    this.user = this._userService.getUser();
    this._router.navigate(['Login']);
  }
}
