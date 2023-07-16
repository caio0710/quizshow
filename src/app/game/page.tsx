"use client";

import { useCallback, useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import { QuestionType, loadGameQuestions } from "@/helpers/question-helpers";
import QuestionView from "@/components/QuestionView";

export default function Home() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [hasUsedPower, setHasUsedPower] = useState(false);
    const [hasUsedPowerPlus, setHasUsedPowerPlus] = useState(false);
    const [powers, setPowers] = useState({
        powerplus: 0,
        power: 0
    });

    const goToNextQuestion = useCallback(() => {
        setCurrentQuestion((current) => current + 1);
        setHasUsedPower(false);
        setHasUsedPowerPlus(false);
    }, []);

    const usePower = useCallback((power: "power" | "powerplus") => {
        setPowers((powers) => ({ ...powers, [power]: powers[power] + 1 }));
        setHasUsedPower(power === "power");
        setHasUsedPowerPlus(power === "powerplus");
    }, []);

    useEffect(() => {
        const loadedQuestions = loadGameQuestions();

        setQuestions(loadedQuestions);
        setHasUsedPower(false);
        setHasUsedPowerPlus(false);
        setPowers({
            powerplus: 0,
            power: 0
        });
    }, []);

    return (
        <main className="flex min-h-screen">
            <div className="p-8 grow">
                <QuestionView
                    questionNumber={currentQuestion}
                    question={questions[currentQuestion - 1]}
                    goToNextQuestion={goToNextQuestion}
                    hasUsedPower={hasUsedPower}
                    hasUsedPowerPlus={hasUsedPowerPlus}
                />
            </div>
            <Navigation
                currentQuestion={currentQuestion}
                questions={questions}
                powers={powers}
                usePower={usePower}
                hasUsedPower={hasUsedPower}
                hasUsedPowerPlus={hasUsedPowerPlus}
            ></Navigation>
        </main>
    );
}
