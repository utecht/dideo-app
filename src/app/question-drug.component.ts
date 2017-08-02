import {Component, OnInit, AfterViewChecked, EventEmitter} from '@angular/core';
import {Question, Answer} from './question';
import {User} from './user';
import {Chebi} from './chebi';
import {QuestionService} from './question.service';
import {ChebiService} from './chebi.service';
import {UserService} from './user.service';
import {Select2Option, Select2Value} from 'select2-component/angular';

@Component({
    selector: 'my-drug',
    templateUrl: 'templates/question-drug.html',
    styleUrls: ['css/question.css',],
    inputs: ['question'],
    outputs: ['changed'],
})

export class QuestionDrugComponent implements OnInit{
    public question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;
    public search: string;
    public chebi: Chebi[];
    public items: Select2Option[] = [{value: null,
                                      label: 'Chebi Search...',
                                      disabled: true}];
    public select_value: Select2Value;

    constructor(private _questionService: QuestionService,
                private _chebiService: ChebiService,
                private _userService: UserService) { }

    ngOnInit(){
        if(this.question.answer){
            this.answer = this.question.answer;
            this.select_value = this.question.answer.text;
            this.items = [{value: this.question.answer.text,
                           label: this.question.answer.text}];
        } else {
            this.answer = {'question': this.question.id};
        }
        this._userService.getUser().subscribe(
            user => this.user = user,
            error => console.error(error)
        );
    }

    checkChebi(partial: string){
        this._chebiService.searchChebi(partial)
            .subscribe(
                chebi => this.updateChebi(chebi),
                error => console.error(error)
            );
    }

    updateChebi(chebi: Chebi[]){
        this.chebi = chebi;
        this.items = [];
        this.chebi.forEach((compound: Chebi) => {
            this.items.push({
                value: compound.accession,
                label: compound.accession + ' ' + compound.name
            });
        });
    }

    setValue(drug: string){
        this.answer.text = drug;
        if(this.user){
            this.answer.question = this.question.id;
            this._questionService.setValue(this.answer, this.user)
                        .subscribe(res => console.log(res),
                                   error => console.error(error));
            this.changed.emit(this.answer);
         } else {
             console.log("Must be logged in to submit");
         }
    }
}
