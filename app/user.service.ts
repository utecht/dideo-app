import {Injectable} from 'angular2/core';
import {User} from './user';
import {Question} from './question';

@Injectable()
export class UserService {
    public user: User = null;
    private _answers: { [q_id: number]: string } = { };

    getUser(){
        return this.user;
    }

    logout(){
        this.user = null;
        this._answers = { };
    }

    setUser(name: string){
        this.user = new User(name);
    }

    getValue(question: Question){
        console.log(this._answers);
        return this._answers[question.id];
    }

    setValue(question: Question, value: string){
        this._answers[question.id] = value;
    }
}
