import {Component, OnInit} from 'angular2/core';
import {CategoryComponent} from './category.component';
import {QuestionService} from './question.service';
import {Category} from './question';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css'],
    directives: [CategoryComponent],
    providers: [QuestionService]
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public selectedCategory: Category;
    public errorMessage: any;

    constructor(private _questionService: QuestionService){ }
    
    ngOnInit(){
        this._questionService.getCategories()
            .subscribe(categories => this.setCategories(categories),
                       error => this.errorMessage = <any>error);
    }

    setCategories(categories){
        this.categories = categories;
        if(this.categories && this.categories.length > 0){
            this.selectedCategory = this.categories[0];
        }
    }

    onSelect(category: Category) {
        this.selectedCategory = category;
    }
}
