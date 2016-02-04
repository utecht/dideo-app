import {Injectable} from 'angular2/core';
import {User} from './user';
import {Question} from './question';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
    public user: User = null;
    private _answers: { [q_id: number]: string } = { };

    constructor(private _http: Http) { }

    getUser(){
        return this.user;
    }

    logout(){
        this.user = null;
        this._answers = { };
    }

    private _loginUrl: string = '/api/auth/';

    login(username: string, password: string){
        let body = JSON.stringify({'username':username, 'password':password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
    
        return this._http.post(this._loginUrl, body, options)
                      .map(res => this.setUser(username, res.json().token))
                      .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    setUser(username: string, token: string){
        console.log(token);
        this.user = new User(username, token);
    }

    getValue(question: Question){
        return this._answers[question.id];
    }

    setValue(question: Question, value: string){
        this._answers[question.id] = value;
    }
}
