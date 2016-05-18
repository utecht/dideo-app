import {Component, OnChanges} from '@angular/core';
import {Question, Category} from './question';
import {QuestionDrugComponent} from './question-drug.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';

@Component({
    selector: 'my-drug-category',
    templateUrl: 'templates/category-drug.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionDrugComponent],
    inputs: ['category']

})

export class CategoryDrugComponent implements OnChanges {
    public category: Category;
    public questions: Question[];
    public errorMessage: any;

    constructor(private _questionService: QuestionService,
                private _userService: UserService){ }

    ngOnInit(){ }

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
