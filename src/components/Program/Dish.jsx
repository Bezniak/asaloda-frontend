import React, {useEffect, useState} from 'react';
import DishModalWindow from "./DishModalWindow.jsx";
import ChangeDish from "./ChangeDish.jsx";

const Dish = ({dish, selectedDate, twoDaysFromToday, setEatingType, changedDishData}) => {

    console.log('dish', dish)

    const [isAdditionalMenuVisible, setIsAdditionalMenuVisible] = useState(false);
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
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
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
                    {selectedDate.isAfter(twoDaysFromToday) && (
                        <button className='border-0 text-base text-[var(--oringe)]'
                                onClick={() => {
                                    setIsAdditionalMenuVisible(!isAdditionalMenuVisible);
                                    setEatingType(dish?.attributes?.eating_type);
                                }}
                        >
                            Заменить
                        </button>

                    )}
                </div>
            </div>
            {showModal && (
                <DishModalWindow onClose={closeModal} dishData={dish}/>
            )}

            {isAdditionalMenuVisible && (
                <ChangeDish isAdditionalMenuVisible={isAdditionalMenuVisible}
                            setIsAdditionalMenuVisible={setIsAdditionalMenuVisible}
                            dish={dish}
                            changedDishData={changedDishData}
                />
            )}
        </div>
    );
};

export default Dish;
