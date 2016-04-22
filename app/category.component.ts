import {Component, OnChanges} from 'angular2/core';
import {Question, Category} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionComponent],
    inputs: ['category']

})

export class CategoryComponent implements OnChanges {
    public category: Category;
    public questions: Question[];
    public errorMessage: any;

    constructor(private _questionService: QuestionService, private _userService: UserService){ } 

    ngOnChanges() {
        this._questionService.getQuestions(this.category.id, this._userService.getUser())
            .subscribe(questions => this.questions = questions,
                       error => this.errorMessage = <any>error);
    }

    checkDeps(e) {
        console.log("test " + e);
        for(let i = 0; i < this.questions.length; i++){
            this.questions[i].disabled = true;
        }
    }
}
