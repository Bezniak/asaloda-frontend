import React, {useEffect, useState} from 'react';
import DishModalWindow from "./DishModalWindow.jsx";

const Dish = ({dish, setIsAdditionalMenuVisible, isAdditionalMenuVisible}) => {

    // console.log('dish', dish)

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(!showModal);
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
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <img className="rounded-t-lg cursor-pointer"
                 src={import.meta.env.VITE_UPLOAD_URL + dish?.attributes?.main_img?.data?.attributes?.url}
                 alt={dish?.attributes?.main_img?.data?.attributes?.name}
                 onClick={openModal}
            />
            <div className="p-5">
                <h2 className="mb-2 text-1xl font-medium tracking-tight cursor-pointer hover:text-[var(--green)] transition"
                    onClick={openModal}
                >
                    {dish?.attributes?.dish_name}
                </h2>
                <div className='mt-5 flex justify-between items-center'>
                    <p className="text-base text-gray-700 text-left">
                        {dish?.attributes?.eating_type}
                    </p>
                    <button className='border-0 text-base text-[var(--oringe)]'
                            onClick={() => setIsAdditionalMenuVisible(!isAdditionalMenuVisible)}
                    >
                        Заменить
                    </button>
                </div>
            </div>
            {showModal && (
                <DishModalWindow onClose={closeModal} dishData={dish}/>
            )}
        </div>
    );
};

export default Dish;