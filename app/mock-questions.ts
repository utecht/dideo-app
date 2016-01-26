import { Question, QTypes } from './question';

export var QUESTIONS: Question[] = [
    {"id": 1, "text": "This is a question", "q_type": QTypes.Text},
    {"id": 2, "text": "This is a second question", "q_type": QTypes.Combo},
    {"id": 3, "text": "This is a third question", "q_type": QTypes.Bool},
];
