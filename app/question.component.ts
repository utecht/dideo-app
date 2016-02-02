import {Component} from 'angular2/core';
import {Question} from './question';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['css/question.css'],
    inputs: ['question']
})

export class QuestionComponent {
    public question: Question;
}
