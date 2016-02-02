import {Injectable} from 'angular2/core';
import {User} from './user';
import {Question} from './question';

@Injectable()
export class UserService {
    public user: User = null;

    getUser(){
        return this.user;
    }

    logout(){
        this.user = null;
    }

    setUser(name: string){
        this.user = new User(name);
    }

    getValue(question: Question){
        return 'A';
    }

    setValue(question: Question){

    }
}
