import React, {useEffect, useState} from 'react';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import {useTranslation} from "react-i18next";

const Discounts = ({img, title, modalTitle, modalDescription, listTitle, list}) => {
    const {t} = useTranslation();
    const [showModalWindow, setShowModalWindow] = useState(false);

    const openModal = () => {
        setShowModalWindow(true);
    };

    const closeModal = () => {
        setShowModalWindow(false);
    };

    // Disable scroll when modal is open
    useEffect(() => {
        if (showModalWindow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModalWindow]);

    return (
        <div
            className="flex flex-col justify-between w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="block w-full h-auto rounded-t-lg" src={img} alt={title}/>
            <div className="p-5">
                <h2 className="mb-2 md:text-2xl xs:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
                <div
                    className="mt-8 text-base text-gray-400 md:hover:text-[var(--green)] hover:cursor-pointer transition"
                    onClick={openModal}
                >
                    {t("read_more")}
                </div>
                {showModalWindow && (
                    <ModalWindow
                        onClose={closeModal}
                        modalTitle={modalTitle}
                        modalDescription={modalDescription}
                        listTitle={listTitle}
                        list={list}
                        buttonContent={t("it_clear")}
                    />
                )}
            </div>
        </div>
    );
};

export default Discounts;
