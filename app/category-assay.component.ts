import {Component, OnChanges} from 'angular2/core';
import {Question, Category} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';
import {ChebiService} from './chebi.service';
import {UserService} from './user.service';
import {Chebi} from './chebi';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category-assay.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionComponent],
    inputs: ['category']

})

export class CategoryAssayComponent implements OnChanges {
    public category: Category;
    public questions: Question[];
    public errorMessage: any;
    public chebi: Chebi[];

    constructor(private _questionService: QuestionService,
                private _chebiService: ChebiService,
                private _userService: UserService){ }

    ngOnInit(){
        this._chebiService.chebiObserver.subscribe(
            res => this.chebi = res,
            error => console.error(error)
        );
    }

    ngOnChanges() {
        this._questionService.getQuestions(this.category.id, this._userService.getUser())
            .subscribe(questions => this.questions = questions,
                       error => this.errorMessage = <any>error);
    }

    checkDeps(answer) {
        for(let i = 0; i < this.questions.length; i++){
            for(let j = 0; j < this.questions[i].depends_on.length; j++){
                if(this.questions[i].depends_on[j] === answer.question){
                    this.questions[i].disabled = !answer.yesno;
                }
            }
        }
    }
}
