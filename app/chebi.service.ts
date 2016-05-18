import {Injectable} from '@angular/core';
import {Chebi} from './chebi';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChebiService {
    constructor(private _http: Http) { }

    private _chebiUrl = 'api/chebi/';
    public searchChebi(partial: string){
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._chebiUrl + partial + '/', options)
                            .map(res => <Chebi[]> res.json())
                            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
