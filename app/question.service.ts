import {Injectable} from 'angular2/core';
import {Question, Category, Answer} from './question';
import {User} from './user';
import {CATEGORIES} from './mock-categories';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuestionService {
    constructor(private _http: Http) { }

    private _categoryUrl = '/api/categories/';

    getCategories(){
        // return Promise.resolve(CATEGORIES);
        return this._http.get(this._categoryUrl)
                            .map(res => <Category[]> res.json().results)
                            .catch(this.handleError);
    }

    private _questionUrl = '/api/questions/';

    getQuestions(category: number){
        return this._http.get(this._questionUrl + category + '/')
                            .map(res => <Question[]> res.json())
                            .catch(this.handleError);
    }

    private _answerUrl = '/api/answer/';

    setValue(answer: Answer, user: User){
        console.log(user);
        if(user){
            answer.user = user.id;
            console.log('made it');
            let body = JSON.stringify(answer);
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: headers});
        
            return this._http.post(this._answerUrl, body, options)
                          .map(res => <Answer> res.json().results)
                          .catch(this.handleError);

        }
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
