import {Injectable} from 'angular2/core';
import {Definition} from './question';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DefinitionService {
    public defObserver: Observable<Definition[]>;
    private _definitionUrl = '/api/definitions/';

    constructor(private _http: Http) {
        this.defObserver = _http.get(this._definitionUrl)
                            .map(res => <Definition[]> res.json())
                            .catch(this.handleError)
                            .share();
    }

    getDefinitions(){
        return this.defObserver;
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
