import {Injectable} from 'angular2/core';
import {QUESTIONS} from './mock-questions';

@Injectable()
export class QuestionService {
    getQuestions(){
        return Promise.resolve(QUESTIONS);
    }

    getQuestion(id: number) {
        return Promise.resolve(QUESTIONS).then(
                questions => questions.filter(q => q.id === id)[0]
        );
    }
}
