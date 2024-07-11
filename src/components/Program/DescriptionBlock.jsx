import React, {useEffect, useState} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const DescriptionBlock = ({img, title, description, modalTitle, modalDescription, textColor}) => {

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
        <div className='flex flex-row justify-between gap-5'>
            <div
                className="mt-14 max-w-sm cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                onClick={openModal}
            >
                <img className="rounded-t-lg py-4 px-6"
                     src={import.meta.env.VITE_UPLOAD_URL + img}
                     alt={title}
                />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl text-left font-bold tracking-tight"
                        style={{color: `${textColor}`}}
                    >
                        {title}
                    </h5>
                    <p className="mb-3 font-normal text-left"
                       style={{color: `${textColor}`}}
                    >
                        {description}
                    </p>
                </div>
            </div>
            {showModal && (
                <ModalWindow onClose={closeModal} modalTitle={modalTitle} modalDescription={modalDescription}
                             buttonContent={'Понятно'}
                />
            )}
        </div>
    );
};

export default DescriptionBlock;