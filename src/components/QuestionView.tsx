import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { QuestionType } from "@/helpers/question-helpers";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";

const getLetterByIndex = (index: number) => {
    return ["A", "B", "C", "D"][index];
};

const getIndexByLetter = (letter: string) => {
    return { a: 0, b: 1, c: 2, d: 3 }[letter];
};

interface NavigationProps {
    questionNumber: number;
    question: QuestionType;
    goToNextQuestion: () => void;
    hasUsedPower: boolean;
    hasUsedPowerPlus: boolean;
}

const QuestionView: FunctionComponent<NavigationProps> = ({
    questionNumber,
    question,
    goToNextQuestion,
    hasUsedPower,
    hasUsedPowerPlus
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [isRightAnswer, setIsRightAnswer] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const router = useRouter();

    const handleModalConfirm = useCallback(() => {
        const correct = !!question.answers[selectedAnswer]?.correct;

        setIsRightAnswer(correct);
        setShowResult(true);
        setShowModal(false);

        setTimeout(() => {
            if (correct) {
                if (questionNumber === 15) {
                    router.replace("/finish");
                } else {
                    goToNextQuestion();
                }
            } else {
                router.replace("/gameover");
            }
        }, 3000);
    }, [selectedAnswer, question, goToNextQuestion, router, questionNumber]);

    const onClickAnswer = useCallback((answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        setShowModal(true);
    }, []);

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event;
            const answerIndex = getIndexByLetter(key);

            if (answerIndex !== undefined && !showModal) {
                setSelectedAnswer(answerIndex);
                setShowModal(true);
            } else if (showModal) {
                if (key === "Enter") {
                    handleModalConfirm();
                } else if (key === "Escape") {
                    setShowModal(false);
                }
            }
        },
        [showModal, handleModalConfirm]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    useEffect(() => {
        setIsRightAnswer(false);
        setShowResult(false);
        setSelectedAnswer(-1);
    }, [questionNumber]);

    let countDisabled = 0;

    const answers = question?.answers.map((answer) => {
        if (answer.correct) return { ...answer };

        if ((hasUsedPower && countDisabled < 1) || (hasUsedPowerPlus && countDisabled < 2)) {
            countDisabled++;
            return { ...answer, disabled: true };
        }

        return { ...answer };
    });

    console.log(hasUsedPower, hasUsedPowerPlus);
    console.log(answers);

    return (
        question && (
            <div className="h-full flex flex-col">
                <div className="flex justify-center mb-5">
                    <Image src="/logo.png" alt="Super Quiz Logo" className="mr-3" width={400} height={400} priority />
                </div>
                <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow mt-4 relative">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                        {questionNumber < 10 ? `0${questionNumber}` : questionNumber} - {question.question}
                    </h5>
                </div>
                <div className="max-w grid grid-cols-2 gap-4 mt-8">
                    {answers.map((answer, index) => {
                        let answerClass = "";

                        if (showResult) {
                            answerClass += answer.correct
                                ? "outline outline-offset-2 outline-green-600"
                                : "outline outline-offset-2 outline-red-600";
                            answerClass += " cursor-default";

                            if (index === selectedAnswer) {
                                answerClass += answer.correct ? " bg-green-600" : " bg-red-600";
                                answerClass += " text-white";
                            } else {
                                answerClass += " bg-white text-gray-700";
                            }
                        } else if (answer.disabled) {
                            answerClass += " bg-white text-gray-700 hover:bg-gray-100 opacity-30";
                        } else {
                            answerClass += " bg-white text-gray-700 hover:bg-gray-100";
                        }

                        return (
                            <button
                                key={index}
                                className={"max-w p-6 border border-gray-200 rounded-lg shadow " + answerClass}
                                onClick={onClickAnswer.bind(null, index)}
                                disabled={showResult || answer.disabled}
                            >
                                <p className="font-normal">
                                    ({getLetterByIndex(index)}) - {answer.answer}
                                </p>
                            </button>
                        );
                    })}
                </div>
                {showResult && isRightAnswer && (
                    <div className="p-6 bg-green-600 rounded-lg shadow mt-4 w-fit mx-auto">
                        <h2 className="text-white text-center">Parabéns, você acertou a resposta!</h2>
                    </div>
                )}
                {showResult && !isRightAnswer && (
                    <div className="p-6 bg-red-600 rounded-lg shadow mt-4 w-fit mx-auto">
                        <h2 className="text-white text-center">Que pena, você errou!</h2>
                    </div>
                )}
                <ConfirmationModal
                    show={showModal}
                    onClickConfirm={handleModalConfirm}
                    onClickClose={() => setShowModal(false)}
                >
                    Você tem certeza da sua resposta?
                    <br />
                    <span className="mt-4 text-base font-normal italic text-gray-500">
                        {'"' + question.answers[selectedAnswer]?.answer + '"'}
                    </span>
                </ConfirmationModal>
            </div>
        )
    );
};

export default QuestionView;
