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
    powers: {
        powerplus: number;
        power: number;
    };
    usePower: (power: "power" | "powerplus") => void;
    hasUsedPower: boolean;
    hasUsedPowerPlus: boolean;
}

const Navigation: FunctionComponent<NavigationProps> = ({
    currentQuestion,
    questions,
    powers,
    usePower,
    hasUsedPower,
    hasUsedPowerPlus
}) => {
    return (
        <aside className="w-96 h-screen shrink-0" aria-label="Sidebar">
            <div className="bg-yellow-600"></div>
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
                <div className="mt-8 flex grid grid-cols-2 gap-4">
                    <button
                        onClick={usePower.bind(null, "power")}
                        disabled={hasUsedPowerPlus || hasUsedPower || powers.power >= 2}
                        className={
                            "flex items-center justify-center rounded border-2 border-gray-300 py-2" +
                            (hasUsedPowerPlus || hasUsedPower || powers.power >= 2
                                ? " opacity-30"
                                : " hover:bg-gray-100")
                        }
                    >
                        <svg
                            className="w-6 h-6 text-gray-800 mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16.5 7A2.5 2.5 0 0 1 19 4.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 1 1 0 5V12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5A2.5 2.5 0 0 1 16.5 7Z"
                            />
                        </svg>
                        x 1 <i>({2 - powers.power})</i>
                    </button>
                    <button
                        onClick={usePower.bind(null, "powerplus")}
                        disabled={hasUsedPowerPlus || hasUsedPower || powers.powerplus >= 1}
                        className={
                            "flex items-center justify-center rounded border-2 border-gray-300 py-2" +
                            (hasUsedPowerPlus || hasUsedPower || powers.powerplus >= 1
                                ? " opacity-30"
                                : " hover:bg-gray-100")
                        }
                    >
                        <svg
                            className="w-6 h-6 text-gray-800 mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16.5 7A2.5 2.5 0 0 1 19 4.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 1 1 0 5V12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5A2.5 2.5 0 0 1 16.5 7Z"
                            />
                        </svg>
                        x 2<i>({1 - powers.powerplus})</i>
                    </button>
                </div>
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
