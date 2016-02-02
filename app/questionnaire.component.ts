import {Component, OnInit} from 'angular2/core';
import {CategoryComponent} from './category.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css'],
    directives: [CategoryComponent],
    providers: [QuestionService]
})

export class QuestionnaireComponent implements OnInit {
    public categories: string[];
    public selectedCategory: string;

    constructor(private _questionService: QuestionService){ }
    
    ngOnInit(){
        this._questionService.getCategories()
            .then(categories => this.setCategories(categories));
    }

    setCategories(categories){
        this.categories = categories;
        if(this.categories && this.categories.length > 0){
            this.selectedCategory = this.categories[0];
        }
    }

    onSelect(category: string) {
        this.selectedCategory = category;
    }
}
