import questions from "@/db/questions.json";

export type AnswerType = {
    answer: string;
    correct: boolean;
    disabled: boolean;
};

export type QuestionType = {
    level: "easy" | "medium" | "hard";
    question: string;
    answers: AnswerType[];
};

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const makeQuestionsForLevel = (level: "easy" | "medium" | "hard"): QuestionType[] => {
    const questionsByLevel = questions[level];
    shuffleArray(questionsByLevel);

    const top5Questions = questionsByLevel.slice(0, 5).map((question) => {
        const questionObject = question as QuestionType;

        questionObject.level = level;
        shuffleArray(questionObject.answers);

        return questionObject;
    });

    return top5Questions;
};

export const loadGameQuestions = () => {
    const easyQuestions = makeQuestionsForLevel("easy");
    const mediumQuestions = makeQuestionsForLevel("medium");
    const hardQuestions = makeQuestionsForLevel("hard");

    return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
};
