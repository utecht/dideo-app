System.register([], function(exports_1) {
    var QUESTIONS;
    return {
        setters:[],
        execute: function() {
            exports_1("QUESTIONS", QUESTIONS = [
                { "id": 1, "text": "This is a question", "q_type": "text", "group": "tmd" },
                { "id": 2, "text": "This is a second question", "q_type": "combo", "group": "tmd", "options": ["A", "B", "C"] },
                { "id": 3, "text": "This is a third question", "q_type": "bool", "group": "tmd" },
            ]);
        }
    }
});
//# sourceMappingURL=mock-questions.js.map