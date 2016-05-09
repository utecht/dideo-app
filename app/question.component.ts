import {Component, OnInit, AfterViewChecked, EventEmitter} from 'angular2/core';
import {Question, Answer} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';
import {DefinitionPipe} from './definition.pipe';

declare var jQuery:any;

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css',],
    inputs: ['question'],
    outputs: ['changed'],
    pipes: [DefinitionPipe]
})

export class QuestionComponent implements OnInit, AfterViewChecked {
    public question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;

    constructor(private _questionService: QuestionService,
                private _definitionService: DefinitionService,
                private _userService: UserService) { }

    ngOnInit(){
        if(this.question.answer){
            this.answer = this.question.answer;
        } else {
            this.answer = {'question': this.question.id};
        }
        this.user = this._userService.getUser();
    }

    ngAfterViewChecked(){
        jQuery('[data-toggle="popover"]').popover();
    }

    setValue(){
        if(this.user){
            this.answer.question = this.question.id;
            this._questionService.setValue(this.answer, this._userService.getUser())
                        .subscribe(res => console.log(res),
                                   error => console.error(error));
            this.changed.emit(this.question.id);
         } else {
             console.log("Must be logged in to submit");
         }
    }
}
