import {Component, OnChanges} from '@angular/core';
import {Question, Category} from './question';
import {QuestionComponent} from './question.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {User} from './user';

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
    public user: User;

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
        for(let i = 0; i < this.questions.length; i++){
            for(let j = 0; j < this.questions[i].depends_on.length; j++){
                if(this.questions[i].depends_on[j] === answer.question){
                    this.questions[i].disabled = !answer.yesno;
                }
            }
        }
    }
}
