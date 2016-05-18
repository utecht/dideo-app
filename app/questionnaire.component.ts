import {Component, OnInit} from '@angular/core';
import {CategoryComponent} from './category.component';
import {CategoryDrugComponent} from './category-drug.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {DefinitionService} from './definition.service';
import {ChebiService} from './chebi.service';
import {Category, Survey} from './question';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css'],
    directives: [CategoryComponent, CategoryDrugComponent],
    providers: [QuestionService, DefinitionService, ChebiService]
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public selectedCategory: Category;
    public errorMessage: any;
    public survey: Survey;
    public drugCategory: Category;

    constructor(private _questionService: QuestionService,
                private _userService: UserService){ }

    ngOnInit(){
        this._questionService.getCategories()
            .subscribe(categories => this.setCategories(categories),
                       error => this.errorMessage = <any>error);
        this._userService.getCurrentSurvey()
            .subscribe(survey => this.survey = survey,
                       error => this.errorMessage = <any>error)
    }

    saveSurvey(){
        this._userService.setSurvey(this.survey)
            .subscribe(survey => survey,
                       error => this.errorMessage = <any>error);
    }

    setCategories(categories){
        this.categories = categories;
        if(this.categories && this.categories.length > 0){
            this.selectedCategory = this.categories[0];
        }
        for(let i = 0; i < categories.length; i++){
            if(categories[i].name === "Drug"){
                this.drugCategory = categories[i];
            }
        }
    }

    onSelect(category: Category) {
        this.selectedCategory = category;
    }
}
