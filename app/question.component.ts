import {Component, OnInit} from 'angular2/core';
import {Question} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {UserService} from './user.service';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css'],
    inputs: ['question', 'user']
})

export class QuestionComponent implements OnInit {
    public question: Question;
    public value: string;
    public user: User;

    constructor(private _questionService: QuestionService,
                private _userService: UserService) { }

    ngOnInit(){
        this.user = this._userService.getUser();
        if(this.user){
            this.value = this._userService.getValue(this.question);
        } else {
        }
    }
}
