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
  public errorMessage: any;

  constructor(private _userService: UserService,
        private _router: Router){
  }

    ngOnInit(){
        this.user = this._userService.getUser();
        if (this.user === null){
            console.log('no user, navigating to login');
            this._router.navigate(['Login']);
        }
    }

    newSurvey(){
        this._userService.newSurvey()
            .subscribe(
                res => this.navigateSurvey(res.text()),
                error => console.error(error)
            );
    }

    navigateSurvey(test:any){
        if(test === 'True'){
            this._router.navigate(['Questionnaire']);
        } else {
            this.errorMessage = "Error creating new survey, please contact administrator.";
        }
    }

    logout(){
        this._userService.logout();
        this.user = this._userService.getUser();
        this._router.navigate(['Login']);
    }
}
