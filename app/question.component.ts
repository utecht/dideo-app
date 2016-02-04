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

    constructor(private _questionService: QuestionService,
                private _userService: UserService) { }

    ngOnInit(){
        if(this.question.answer.length > 0){
            this.answer = this.question.answer[0];
        } else {
            this.answer = {'question': this.question.id};
        }
    }

    setValue(){
        this.answer.question = this.question.id;
        this._questionService.setValue(this.answer, this._userService.getUser())
                    .subscribe(res => console.log(res),
                               error => console.error(error));
    }
}
