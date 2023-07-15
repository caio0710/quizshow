import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { AnswerType, QuestionType } from "@/helpers/question-helpers";
import ConfirmationModal from "./ConfirmationModal";

const getLetterByIndex = (index: number) => {
    return ["A", "B", "C", "D"][index];
};

const getIndexByLetter = (letter: string) => {
    return { a: 0, b: 1, c: 2, d: 3 }[letter];
};

interface NavigationProps {
    questionNumber: number;
    question: QuestionType;
}

const QuestionView: FunctionComponent<NavigationProps> = ({ questionNumber, question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<AnswerType>();
    const [showModal, setShowModal] = useState(false);

    const onClickAnswer = useCallback(
        (answerIndex: number) => {
            setSelectedAnswer(question.answers[answerIndex]);
            setShowModal(true);
        },
        [question]
    );

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event;
            const answerIndex = getIndexByLetter(key);

            if (answerIndex !== undefined && !showModal) {
                setSelectedAnswer(question.answers[answerIndex]);
                setShowModal(true);
            }
        },
        [question, showModal]
    );

    const handleModalConfirm = useCallback(() => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return (
        question && (
            <div className="h-full flex flex-col">
                <div className="flex justify-center mb-5">
                    <Image src="/logo.png" alt="Super Quiz Logo" className="mr-3" width={400} height={400} priority />
                </div>
                <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow mt-8">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                        {questionNumber < 10 ? `0${questionNumber}` : questionNumber} - {question.question}
                    </h5>
                </div>
                <div className="max-w grid grid-cols-2 gap-4 mt-8">
                    {question.answers.map((answer, index) => {
                        return (
                            <button
                                key={index}
                                className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                                onClick={onClickAnswer.bind(null, index)}
                            >
                                <p className="font-normal text-gray-700">
                                    ({getLetterByIndex(index)}) - {answer.answer}
                                </p>
                            </button>
                        );
                    })}
                </div>
                <ConfirmationModal
                    show={showModal}
                    onClickConfirm={handleModalConfirm}
                    onClickClose={() => setShowModal(false)}
                >
                    Você tem certeza da sua resposta?
                    <br />
                    <span className="mt-4 text-base font-normal italic text-gray-500">
                        {'"' + selectedAnswer?.answer + '"'}
                    </span>
                </ConfirmationModal>
            </div>
        )
    );
};

export default QuestionView;
