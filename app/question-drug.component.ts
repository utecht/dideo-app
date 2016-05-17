import {Component, OnInit, AfterViewChecked, EventEmitter} from 'angular2/core';
import {Question, Answer} from './question';
import {User} from './user';
import {Chebi} from './chebi';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';
import {DefinitionPipe} from './definition.pipe';

declare var jQuery:any;

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question-drug.html',
    styleUrls: ['css/question.css',],
    inputs: ['question', 'chebi'],
    outputs: ['changed'],
    pipes: [DefinitionPipe]
})

export class QuestionDrugComponent implements OnInit, AfterViewChecked {
    public question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;
    public chebi: Chebi[];

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
        jQuery('.chosen-select').chosen();
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
