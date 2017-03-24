import {Injectable, OnInit} from '@angular/core';
import {User} from './user';
import {Question, Survey} from './question';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
    public user: User = null;
    public token: string = null;
    public userObserver: Observable<User>;
    private _answers: { [q_id: number]: string } = { };

    constructor(private _http: Http) {
        if(localStorage.getItem('user') !== null){
            console.log('pulling user from local storage');
            this.token = localStorage.getItem('user');
        }
    }

    haveUser(){
        return this.token !== null;
    }

    getUser(){
        //return this.requestUser(this.token);
        if(this.user){
            return Observable.of(new Object()).map(user => this.user);
        } else if(this.token){
            return this.requestUser(this.token);
        } else {
            return Observable.throw(new Error("No User"));
        }
    }

    logout(){
        // wow such javascript
        //localStorage['user'] = null;
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
        this._answers = { };
    }

    private _loginUrl: string = '/api/auth/';

    login(username: string, password: string){
        let body = JSON.stringify({'username':username, 'password':password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._loginUrl, body, options)
                      .map(res => this.requestUser(res.json().token)
                                      .subscribe(
                                        res => this.user = res,
                                        error => console.error(error)
                                      ))
                      .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error || 'Server Error');
    }

    private _userUrl: string = '/api/user/';

    requestUser(token: string){
        this.token = token;
        localStorage['user'] = token;
        let headers = new Headers({'Accept': 'application/json',
                                   'Authorization': 'Token ' + token });
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._userUrl, options)
                          .map(res => this.setUser(<User> res.json(), token))
                          .catch(this.handleError);
    }

    private _rdfUrl = '/api/rdf_survey/';

    getRDF(survey: number){
        let headers = new Headers({'Accept': 'application/json'});
        if(this.user){
            headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.user.token });
        }
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._rdfUrl + survey + '/', options)
                            .map(res => <string> res.text())
                            .catch(this.handleError);
    }

    setUser(user: User, token: string){
        user.token = token;
        this.user = user;
        return this.user
    }

    getValue(question: Question){
        return this._answers[question.id];
    }

    setValue(question: Question, value: string){
        this._answers[question.id] = value;
    }

    private _newSurvey: string = '/api/new_survey/';

    newSurvey(){
        if(this.token){
            let headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.get(this._newSurvey, options)
                              .map(res => res)
                              .catch(this.handleError);
        }
    }

    private _changeSurvey: string = '/api/change_survey/';

    changeSurvey(id: number){
        if(this.token){
            let headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.get(this._changeSurvey + id + '/', options)
                              .map(res => res)
                              .catch(this.handleError);
        }
    }

    deleteSurvey(id: number){
        if(this.token){
            let headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.delete(this._changeSurvey + id + '/', options)
                              .map(res => res)
                              .catch(this.handleError);
        }
    }

    private _surveyUrl = '/api/surveys/';

    getSurveys(){
        let headers = new Headers({'Accept': 'application/json'});
        if(this.token){
            headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
        }
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._surveyUrl, options)
                            .map(res => <Survey[]> res.json().results)
                            .catch(this.handleError);
    }

    private _currentUrl = '/api/survey/';

    getCurrentSurvey(){
        let headers = new Headers({'Accept': 'application/json'});
        if(this.token){
            headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
        }
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._currentUrl, options)
                            .map(res => <Survey> res.json())
                            .catch(this.handleError);
    }

    setSurvey(survey: Survey){
        if(this.token){
            let body = JSON.stringify(survey);
            let headers = new Headers({'Content-Type': 'application/json',
                                       'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.post(this._surveyUrl, body, options)
                          .map(res => <Survey> res.json())
                          .catch(this.handleError);
        }
    }
}
