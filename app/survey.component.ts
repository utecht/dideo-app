import {Component} from 'angular2/core';
import {Question} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-survey',
    templateUrl: 'templates/survey.html',
    styleUrls: ['css/survey.component.css'],
    directives: [QuestionComponent],
    providers: [QuestionService]

})

export class SurveyComponent { 
    constructor(private _questionService: QuestionService){
        this.questions = _questionService.getQuestions().then(questions => this.questions = questions);
    }
}
