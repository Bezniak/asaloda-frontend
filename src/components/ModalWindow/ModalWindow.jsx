import React from 'react';
import Button from "../Button/Button.jsx";

const ModalWindow = ({onClose, modalTitle, modalDescription}) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black opacity-70"></div>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-10 mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 text-left">
                        {modalTitle}
                    </h3>
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 p-3 flex items-center justify-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
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
                </div>
                <div className="space-y-4">
                    <p className="text-base leading-relaxed text-dark text-left">
                        {modalDescription}
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Button content={'Понятно'} onClick={onClose} borderColor={'lightgray'} color={'#7ECA1D'}/>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
