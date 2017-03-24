import {Input, Component, OnInit,
    AfterViewChecked, EventEmitter } from '@angular/core';
import {
    state, trigger, style, animate, transition, keyframes} from '@angular/animations';
import {Question, Answer} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';

declare var jQuery:any;

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css',],
    inputs: ['question'],
    outputs: ['changed'],
    animations: [
        trigger('visibilityChanged', [
            state('true', style({ opacity: 1, display: 'inline'})),
            state('false', style({ opacity: 0, display: 'none'})),
            transition('void <=> true', animate('.5s', keyframes([
                style({opacity: 0, display: 'inline', offset: 0}),
                style({opacity: 1, display: 'inline', offset: 1}),
            ]))),
            transition('void <=> false', animate('.5s', keyframes([
                style({opacity: 1, display: 'inline', offset: 0}),
                style({opacity: 0, display: 'inline', offset: 1}),
            ]))),
            transition('new => *', animate('0s')),
        ])
    ],
})

export class QuestionComponent implements OnInit {
    public question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;
    public visibility: string;


    constructor(private _questionService: QuestionService,
                private _definitionService: DefinitionService,
                private _userService: UserService) { }

    ngOnInit(){
        if(this.question.old){
            this.visibility = String(this.question.enabled);
        } else {
            this.visibility = 'new';
        }
        if(this.question.answer){
            this.answer = this.question.answer;
        } else {
            this.answer = {'question': this.question.id};
        }
        this._userService.getUser().subscribe(
            user => this.user = user,
            error => console.error(error)
        );
    }

    setCheck(id: number){
      if(this.answer.options){
        this.answer.options.push(id);
      } else {
        this.answer.options = [id];
      }
      this.setValue();
    }

    isChecked(id: number){
      // indexOf returns -1 when item not found
      if(this.answer.options){
          return this.answer.options.indexOf(id) > -1;
      } else {
          return false;
      }
    }

    setValue(){
        if(this.user){
            this.answer.question = this.question.id;
            this._questionService.setValue(this.answer, this.user)
                        .subscribe(res => console.log(res),
                                   error => console.error(error));
            if(this.question.q_type === "bool"){
                this.changed.emit(this.answer);
            }
         } else {
             console.log("Must be logged in to submit");
         }
    }
}
