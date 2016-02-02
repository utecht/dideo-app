import {Component} from 'angular2/core';
import {CategoryComponent} from './category.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css'],
    directives: [CategoryComponent],
    providers: [QuestionService]
})

export class QuestionnaireComponent {
    public categories: string[];
    public selectedCategory: string;

    constructor(private _questionService: QuestionService){
        _questionService.getCategories()
            .then(categories => this.categories = categories);
    }

    onSelect(category: string) {
        this.selectedCategory = category;
    }
}
