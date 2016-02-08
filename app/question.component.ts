import {Component, OnInit} from 'angular2/core';
import {Question, Answer} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';
import {DefinitionPipe} from './definition.pipe';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css'],
    inputs: ['question'],
    pipes: [DefinitionPipe]
})

export class QuestionComponent implements OnInit {
    public question: Question;
    public answer: Answer;

    constructor(private _questionService: QuestionService,
                private _definitionService: DefinitionService,
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
