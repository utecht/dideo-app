import {Component, OnInit} from 'angular2/core';
import {Question, Answer} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {UserService} from './user.service';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css'],
    inputs: ['question']
})

export class QuestionComponent implements OnInit {
    public question: Question;
    public answer: Answer;
    public value: string;

    constructor(private _questionService: QuestionService,
                private _userService: UserService) { }

    ngOnInit(){
        this.answer = this.question.answer;
    }

    setValue(){
        this.answer.question = this.question.id;
        this._questionService.setValue(this.answer, this._userService.getUser());
    }
}
