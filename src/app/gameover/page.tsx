import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen game-over">
            <div className="p-8 grow">
                <div className="h-full flex flex-col">
                    <div className="flex justify-center mb-5">
                        <Image
                            src="/logo.png"
                            alt="Super Quiz Logo"
                            className="mr-3"
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                    <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow mt-4 mx-auto flex flex-col justify-center">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                            Fim de jogo
                        </h5>
                        <p className="mb-10 font-normal text-gray-700 dark:text-gray-400 text-center">
                            Que pena, você não conseguiu finalizar o quiz.
                            <br />
                            Mas não tem problema, você pode tentar novamente!
                        </p>
                        <Link
                            href="game"
                            className="mx-auto w-1/2 px-6 py-3.5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Iniciar um novo jogo
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
