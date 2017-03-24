import {User} from './user';
import {Survey} from './question';
import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html',
  styleUrls: ['css/user.css', 'css/mystrap.css'],
})

export class UserComponent implements OnInit {
  public user: User;
  public errorMessage: any;
  public surveys: Survey[];
  public current_survey: number;

  constructor(private _userService: UserService,
        private _router: Router){
  }

    ngOnInit(){
        if (!this._userService.haveUser()){
            console.log('no user, navigating to login');
            this._router.navigate(['/login']);
            return;
        }
        this._userService.getUser().subscribe(
            user => this.user = user,
            error => this.errorMessage = error
        );
        this._userService.getCurrentSurvey()
            .subscribe(survey => this.current_survey = survey.id,
                       error => console.error(error));
        this._userService.getSurveys()
            .subscribe(surveys => this.surveys = surveys,
                       error => this.errorMessage = <any>error);
    }

    newSurvey(){
        this._userService.newSurvey()
            .subscribe(
                res => this.navigateSurvey(res.text()),
                error => console.error(error)
            );
    }

    changeSurvey(id: number){
        this._userService.changeSurvey(id)
            .subscribe(
                res => this.navigateSurvey(res.text()),
                error => this.errorMessage = <any>error
            );
    }

    deleteSurvey(id: number){
        this._userService.deleteSurvey(id)
            .subscribe(
                res => this.ngOnInit(),
                error => this.errorMessage = <any>error
            );
    }

    navigateSurvey(test:any){
        if(test === 'true'){
            this._router.navigate(['/questionnaire']);
        } else {
            this.errorMessage = "Error creating new survey, please contact administrator.\n" + test;
        }
    }

    logout(){
        this._userService.logout();
        this.user = null;
        this._router.navigate(['/login']);
    }
}
