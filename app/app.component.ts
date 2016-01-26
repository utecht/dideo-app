import {Component} from 'angular2/core';
import {Question} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    directives: [QuestionComponent],
    providers: [QuestionService]

})

export class AppComponent { 
    constructor(private _questionService: QuestionService){
        this.questions = _questionService.getQuestions().then(questions => this.questions = questions);
    }
}
