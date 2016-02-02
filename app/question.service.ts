import {Injectable} from 'angular2/core';
import {Question} from './question';
import {QUESTIONS} from './mock-questions';
import {CATEGORIES} from './mock-categories';

@Injectable()
export class QuestionService {
    getCategories(){
        return Promise.resolve(CATEGORIES);
    }

    getQuestions(category: string){
        var filtered: Question[] = [];
        for(var i = 0; i < QUESTIONS.length; i++){
            if(QUESTIONS[i].category === category){
                filtered.push(QUESTIONS[i]);
            }
        }
        return Promise.resolve(filtered);
    }
}
