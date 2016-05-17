import {User} from './user';
import {Survey} from './question';
import {Component, OnInit} from 'angular2/core';
import {UserService} from './user.service';
import {Router} from 'angular2/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html',
  styleUrls: ['css/user.css'],
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
        this.user = this._userService.getUser();
        if (this.user === null){
            console.log('no user, navigating to login');
            this._router.navigate(['Login']);
        }
        this._userService.getCurrentSurvey()
            .subscribe(survey => this.current_survey = survey.id,
                       error => this.errorMessage = <any>error);
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

    navigateSurvey(test:any){
        if(test === 'true'){
            this._router.navigate(['Questionnaire']);
        } else {
            this.errorMessage = "Error creating new survey, please contact administrator.\n" + test;
        }
    }

    logout(){
        this._userService.logout();
        this.user = this._userService.getUser();
        this._router.navigate(['Login']);
    }
}
