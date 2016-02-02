import {Component, OnInit} from 'angular2/core';
import {Question} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {UserService} from './user.service';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css'],
    providers: [QuestionService, UserService],
    inputs: ['question']
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
            console.log('hmm');
            this.value = this._userService.getValue(this.user, this.question);
        } else {
            console.log('yup');
        }
    }
}
