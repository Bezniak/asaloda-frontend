import React from 'react';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import useModal from "../../utils/useModal.jsx";
import {useTranslation} from "react-i18next";

const HealthyFood = ({title, description, modalTitle, modalDescription, isButtonShow, svg: SvgIcon}) => {
    const {isModalOpen, openModal, closeModal} = useModal();
    const {t} = useTranslation();


    return (
        <div
            className="flex flex-col justify-between p-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-center'>
                <SvgIcon className="text-5xl text-[var(--green)]"/>
            </div>
            <div className="flex-grow p-5">
                <h5 className="mb-2 text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="mb-3 text-left text-base text-gray-700 dark:text-gray-400">
                    {description}
                </p>
            </div>
            {isButtonShow && (
                <>
                    <div
                        className="px-3 py-2 text-base text-gray-400 w-fit hover:text-[var(--oringe)] hover:cursor-pointer transition"
                        onClick={openModal}>
                        {t("read_more")}
                    </div>
                    {isModalOpen &&
                        <ModalWindow onClose={closeModal} modalTitle={modalTitle} modalDescription={modalDescription}/>
                    }
                </>
            )}
        </div>
    );
};

export default HealthyFood;
