import { FunctionComponent, ReactNode } from "react";

interface ConfirmationModalProps {
    show: boolean;
    onClickConfirm: () => void;
    onClickClose: () => void;
    children?: ReactNode;
}

const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({
    children,
    show,
    onClickConfirm,
    onClickClose
}) => {
    return (
        <div
            className={
                "fixed top-0 left-0 right-0 z-50 p-4 overflow-hidden h-full bg-black/50 flex items-center justify-center" +
                (!show ? " hidden" : "")
            }
        >
            <div className="relative w-2/5 max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        onClick={onClickClose}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{children}</h3>
                        <button
                            onClick={onClickConfirm}
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                            Sim <i>(Enter)</i>
                        </button>
                        <button
                            onClick={onClickClose}
                            className="text-red-600 bg-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-600 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                        >
                            Não <i>(Esc)</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
