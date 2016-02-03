import {Component, OnChanges} from 'angular2/core';
import {Question, Category} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionComponent],
    inputs: ['category']

})

export class CategoryComponent implements OnChanges {
    public category: Category;
    public questions: Question[];
    public errorMessage: any;

    constructor(private _questionService: QuestionService){ } 

    ngOnChanges() {
        this._questionService.getQuestions(this.category.id)
            .subscribe(questions => this.questions = questions,
                       error => this.errorMessage = <any>error);
    }
}
