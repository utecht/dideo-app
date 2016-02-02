import {Component} from 'angular2/core';
import {Question} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionComponent],
    providers: [QuestionService],
    inputs: ['category']

})

export class CategoryComponent {
    public category: string;
    public questions: Question[];
    constructor(private _questionService: QuestionService){
        _questionService.getQuestions(this.category)
            .then(questions => this.questions = questions);
    }
}
