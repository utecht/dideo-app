import {Component, OnChanges} from '@angular/core';
import {Question, Category} from './question';
import {QuestionDrugComponent} from './question-drug.component';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {User} from './user';

@Component({
    selector: 'my-drug-category',
    templateUrl: 'templates/category-drug.html',
    styleUrls: ['css/category.css'],
    directives: [QuestionDrugComponent],
    inputs: ['category']

})

export class CategoryDrugComponent implements OnChanges {
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
            .subscribe(questions => this.setQuestions(questions),
                       error => this.errorMessage = <any>error);
    }

    setQuestions(questions: Question[]){
        this.questions = questions;
        for(let i = 0; i < questions.length; i++){
            for(let j = 0; j < questions[i].depends_on.length; j++){
                for(let k = 0; k < questions.length; k++){
                    if(questions[k].id === questions[i].depends_on[j]){
                        if(questions[k].answer){
                            this.questions[i].disabled = (questions[k].answer.text === null);
                        } else {
                            this.questions[i].disabled = true;
                        }
                    }
                }
            }
        }
    }

    checkDeps(answer) {
        for(let i = 0; i < this.questions.length; i++){
            for(let j = 0; j < this.questions[i].depends_on.length; j++){
                if(this.questions[i].depends_on[j] === answer.question){
                    this.questions[i].disabled = (answer.text === null);
                }
            }
        }
    }
}
