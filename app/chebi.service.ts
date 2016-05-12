import {Injectable} from 'angular2/core';
import {Chebi} from './chebi';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChebiService {
    public chebiObserver: Observable<Chebi[]>;
    
    private _chebiUrl = '/chebi.json';
    constructor(private _http: Http) {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.chebiObserver = _http.get(this._chebiUrl, options)
                            .map(res => <Chebi[]> res.json())
                            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
