import {Component, OnInit} from '@angular/core';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {ChebiService} from './chebi.service';
import {Category, Survey} from './question';
import {Router} from '@angular/router';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['css/questionnaire.css', 'css/mystrap.css'],
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
        if(!this._userService.haveUser()){
            this._router.navigate(['/login']);
        }
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

    downloadRDF(){
        this._userService.getRDF(this.survey.id)
            .subscribe(
                data => this.openRDF(data),
                error => console.error(error)
            );
    }

    openRDF(data: string){
        let blob = new Blob([data], { type: 'rdf/xml'})
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        if (typeof a.download === 'undefined') {
          window.location.href = url;
        } else {
            a.href = url;
            a.style.display = "none";
            a.download = 'survey' + this.survey.id + '.xml';
            document.body.appendChild(a);
            a.click();
        }
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
