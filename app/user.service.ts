import {Injectable} from 'angular2/core';
import {User} from './user';

@Injectable()
export class UserService {
    public user: User = new User("test");

    getUser(){
      return this.user;
    }

    logout(){
      this.user = null;
    }

    setUser(name: string){
      this.user = new User(name);
    }
}
