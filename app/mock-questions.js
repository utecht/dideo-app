System.register(['./question'], function(exports_1) {
    var question_1;
    var QUESTIONS;
    return {
        setters:[
            function (question_1_1) {
                question_1 = question_1_1;
            }],
        execute: function() {
            exports_1("QUESTIONS", QUESTIONS = [
                { "id": 1, "text": "This is a question", "q_type": question_1.QTypes.Text },
                { "id": 2, "text": "This is a second question", "q_type": question_1.QTypes.Combo },
                { "id": 3, "text": "This is a third question", "q_type": question_1.QTypes.Bool },
            ]);
        }
    }
});
//# sourceMappingURL=mock-questions.js.map