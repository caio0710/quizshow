import { FunctionComponent } from "react";

import { QuestionType } from "@/helpers/question-helpers";
import Link from "next/link";

interface NavigationItemProps {
    number: string;
    difficulty: "easy" | "medium" | "hard";
    active: boolean;
    done: boolean;
    notReady: boolean;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ number, difficulty, active, done, notReady }) => {
    const difficultyColorMap = {
        easy: "green",
        medium: "yellow",
        hard: "red"
    };

    const difficultyColor = difficultyColorMap[difficulty];
    let itemClass = `p-4 flex justify-center rounded text-white font-bold text-lg cursor-default bg-${difficultyColor}-600`;

    if (active) {
        itemClass = `${itemClass} outline outline-offset-2 outline-${difficultyColor}-600`;
    }

    if (done) {
        itemClass = `${itemClass} opacity-40`;
    }

    if (notReady) {
        itemClass = `${itemClass} opacity-70`;
    }

    return <li className={itemClass}>{number}</li>;
};

interface NavigationProps {
    currentQuestion: number;
    questions: QuestionType[];
}

const Navigation: FunctionComponent<NavigationProps> = ({ currentQuestion, questions }) => {
    return (
        <aside className="w-96 h-screen shrink-0" aria-label="Sidebar">
            <div className="h-full px-3 py-8 bg-gray-50 flex flex-col">
                <ul className="grid grid-cols-3 gap-4">
                    {questions.map((question, index) => {
                        const questionNumber = index + 1;

                        const isDone = questionNumber < currentQuestion;
                        const isActive = questionNumber === currentQuestion;
                        const questionText = questionNumber < 10 ? `0${questionNumber}` : `${questionNumber}`;

                        return (
                            <NavigationItem
                                key={index}
                                number={questionText}
                                difficulty={question.level}
                                active={isActive}
                                done={isDone}
                                notReady={questionNumber > currentQuestion}
                            />
                        );
                    })}
                </ul>
                <Link
                    href="/"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-auto"
                >
                    Encerrar o jogo
                </Link>
            </div>
        </aside>
    );
};

export default Navigation;
