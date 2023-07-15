"use client";

import { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import { QuestionType, loadGameQuestions } from "@/helpers/question-helpers";
import QuestionView from "@/components/QuestionView";

export default function Home() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        const loadedQuestions = loadGameQuestions();

        setQuestions(loadedQuestions);
    }, []);

    return (
        <main className="flex min-h-screen">
            <div className="p-8 grow">
                <QuestionView questionNumber={currentQuestion} question={questions[currentQuestion - 1]} />
            </div>
            <Navigation currentQuestion={currentQuestion} questions={questions}></Navigation>
        </main>
    );
}
