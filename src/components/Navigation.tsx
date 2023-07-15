import Image from "next/image";
import { FunctionComponent } from "react";

type NavigationItemProps = {
    number: string;
    difficulty: "easy" | "medium" | "hard";
    active: boolean;
    done: boolean;
};

const getDifficultyColorClass = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
        case "medium":
            return "bg-yellow-600 color-yellow-600";
        case "hard":
            return "bg-red-600 color-red-600";
        default:
            return "bg-green-600 color-green-600";
    }
};

const difficultyColorMap = {
    easy: "green",
    medium: "yellow",
    hard: "red"
};

const NavigationItem = ({ number, difficulty, active, done }: NavigationItemProps) => {
    const difficultyColor = difficultyColorMap[difficulty];
    let itemClass = `p-4 flex justify-center rounded text-white font-bold text-lg cursor-default`;

    if (active) {
        itemClass = `${itemClass} outline outline-offset-2 outline-${difficultyColor}-600`;
    }

    if (done) {
        itemClass = `${itemClass} bg-${difficultyColor}-700`;
    } else {
        itemClass = `${itemClass} bg-${difficultyColor}-600`;
    }

    return <li className={itemClass}>{number}</li>;
};

const Navigation: FunctionComponent = () => {
    return (
        <aside className="w-96 h-screen" aria-label="Sidebar">
            <div className="h-full px-3 py-8 bg-gray-50 flex flex-col">
                <div className="flex justify-center mb-5">
                    <Image src="/logo.png" alt="Super Quiz Logo" className="mr-3" width={150} height={150} priority />
                </div>
                <ul className="grid grid-cols-3 gap-4">
                    <NavigationItem number="01" difficulty="easy" active={false} done={true} />
                    <NavigationItem number="02" difficulty="easy" active={false} done={true} />
                    <NavigationItem number="03" difficulty="easy" active={false} done={true} />
                    <NavigationItem number="04" difficulty="easy" active={true} done={false} />
                    <NavigationItem number="05" difficulty="easy" active={false} done={false} />
                    <NavigationItem number="06" difficulty="medium" active={false} done={false} />
                    <NavigationItem number="07" difficulty="medium" active={false} done={false} />
                    <NavigationItem number="08" difficulty="medium" active={false} done={false} />
                    <NavigationItem number="09" difficulty="medium" active={false} done={false} />
                    <NavigationItem number="10" difficulty="medium" active={false} done={false} />
                    <NavigationItem number="11" difficulty="hard" active={false} done={false} />
                    <NavigationItem number="12" difficulty="hard" active={false} done={false} />
                    <NavigationItem number="13" difficulty="hard" active={false} done={false} />
                    <NavigationItem number="14" difficulty="hard" active={false} done={false} />
                    <NavigationItem number="15" difficulty="hard" active={false} done={false} />
                </ul>
                <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-auto"
                >
                    Encerrar o jogo
                </button>
            </div>
        </aside>
    );
};

export default Navigation;
