import {Component, OnChanges} from '@angular/core';
import {Question, Category} from './question';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {User} from './user';

@Component({
    selector: 'my-assay-category',
    templateUrl: 'templates/category-assay.html',
    styleUrls: ['css/category.css'],
    inputs: ['category']

})

export class CategoryAssayComponent implements OnChanges {
    public category: Category;
    public questions: Question[];
    public errorMessage: any;
    public user:User;

    constructor(private _questionService: QuestionService,
                private _userService: UserService){ }

    ngOnInit(){ }

    ngOnChanges() {
        this._userService.getUser()
            .subscribe(
                user => this.user = user,
                error => this.user = null);
        this._questionService.getQuestions(this.category.id, this.user)
            .subscribe(questions => this.questions = questions,
                       error => this.errorMessage = <any>error);
    }

    checkDeps(answer) {
    }
}
