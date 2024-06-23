import React, {useState, useEffect} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const HealthyFood = ({img, title, description, modalTitle, modalDescription, isButtonShow}) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Disable scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div
            className="flex flex-col justify-between p-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-center'>
                <img className="rounded-t-lg w-24 sm:w-32 md:w-40 lg:w-28" src={img} alt="imgName"/>
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
                        className="px-3 py-2 text-base text-gray-400 md:hover:text-[var(--green)] hover:cursor-pointer transition"
                        onClick={openModal}>
                        Подробнее
                    </div>
                    {showModal &&
                        <ModalWindow onClose={closeModal} modalTitle={modalTitle} modalDescription={modalDescription}
                                     buttonContent={'Понятно'}
                        />
                    }
                </>
            )}
        </div>
    );
};

export default HealthyFood;
