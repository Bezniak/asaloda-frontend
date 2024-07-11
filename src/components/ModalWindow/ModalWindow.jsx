import React from 'react';
import Button from "../Button/Button.jsx";
import {LuCircle} from "react-icons/lu";

const ModalWindow = ({onClose, modalTitle, modalDescription, img, listTitle, list, buttonContent}) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black opacity-70"></div>
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg mx-4 max-h-full overflow-hidden">
                {img &&
                    <img className="rounded-t-lg w-full max-h-64 object-cover"
                         src={import.meta.env.VITE_UPLOAD_URL + img} alt={'img'}/>
                }
                <div className="flex items-center justify-between p-5">
                    <h3 className="text-xl font-bold text-gray-900 text-left">
                        {modalTitle}
                    </h3>
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-green-700 rounded-lg text-sm w-10 h-10 p-3 flex items-center justify-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path
                                stroke="#7ECA1D"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="space-y-4 px-5">
                    <p className="text-base leading-relaxed text-dark text-left">
                        {modalDescription}
                    </p>
                </div>
                {list && (
                    <ul className="list-disc p-3 space-y-2">
                        <li className="font-bold">{listTitle}</li>
                        {list.map((item, index) => (
                            <li key={index} className='text-sm'><LuCircle className='text-green-600 inline'/> {item}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-center mt-4 pb-5">
                    <Button content={buttonContent} onClick={onClose} borderColor={'lightgray'} color={'#7ECA1D'}/>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
