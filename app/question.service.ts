import {Injectable} from 'angular2/core';
import {Question, Category} from './question';
import {CATEGORIES} from './mock-categories';
import {Http, Response} from 'angular2/http';
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

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
