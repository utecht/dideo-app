import {Component} from 'angular2/core';
import {Question} from './question';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.component.html',
    styleUrls: ['css/question.component.css'],
    inputs: ['question']
})

export class QuestionComponent {
    public question: Question;
}
