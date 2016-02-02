import {Component, OnChanges} from 'angular2/core';
import {Question} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionComponent],
    providers: [QuestionService],
    inputs: ['category']

})

export class CategoryComponent implements OnChanges {
    public category: string;
    public questions: Question[];
    constructor(private _questionService: QuestionService) { }

    ngOnChanges() {
        this._questionService.getQuestions(this.category)
            .then(questions => this.questions = questions);
    }
}
