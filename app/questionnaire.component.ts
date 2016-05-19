import {Component, OnInit} from '@angular/core';
import {CategoryComponent} from './category.component';
import {CategoryDrugComponent} from './category-drug.component';
import {CategoryAssayComponent} from './category-assay.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {DefinitionService} from './definition.service';
import {ChebiService} from './chebi.service';
import {Category, Survey} from './question';
import {Router} from '@angular/router';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css'],
    directives: [CategoryComponent, CategoryDrugComponent, CategoryAssayComponent],
    providers: [QuestionService, DefinitionService, ChebiService]
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public trialCategory: Category;
    public assayCategory: Category;
    public drugCategory: Category;
    public errorMessage: any;
    public survey: Survey;

    constructor(private _questionService: QuestionService,
                private _router: Router,
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

    newSurvey(){
        this._userService.newSurvey()
            .subscribe(
                res => this.navigateSurvey(res.text()),
                error => console.error(error)
            );
    }

    navigateSurvey(test:any){
        if(test === 'true'){
            this.ngOnInit()
        } else {
            this.errorMessage = "Error creating new survey, please contact administrator.\n" + test;
        }
    }

    setCategories(categories){
        this.categories = categories;
        if(this.categories && this.categories.length > 0){
            this.trialCategory = this.categories[0];
        }
        for(let i = 0; i < categories.length; i++){
            if(categories[i].name === "Drug"){
                this.drugCategory = categories[i];
            } else if(categories[i].name === "Assay"){
                this.assayCategory = categories[i];
            } else if(categories[i].name === "Trial"){
                this.trialCategory = categories[i];
            }
        }
    }
}
