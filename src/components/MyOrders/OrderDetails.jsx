import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import useFetchAllData from "../../api/useFetchAllData.js";
import DishModalWindow from "../Program/DishModalWindow.jsx";
import ChangeDish from "../Program/ChangeDish.jsx";
import api from '../../api/api.js';

const OrderDetails = ({userName, programName, startDate, endDate, dates, dishes: initialDishes, nextDay, orderId, excludeSaturday, excludeSunday}) => {
    const [selectedDish, setSelectedDish] = useState(null);
    const [isAdditionalMenuVisible, setIsAdditionalMenuVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [updatedDishes, setUpdatedDishes] = useState(initialDishes);
    const [availableReplacementDishes, setAvailableReplacementDishes] = useState([]);

    console.log('updatedDishes', updatedDishes)

    const encodedProgramName = encodeURIComponent(programName);
    const formattedNextDay = dayjs(nextDay).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    const {data: allDish, loading: allDishLoading, error: allDishError} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${encodedProgramName}&filters[date][$gte]=${formattedNextDay}&filters[date][$lte]=${formattedEndDate}&filters[changedDish][$eq]=false&populate=*`
    );

    const {data: allChangeDish, loading: allChangeDishLoading, error: allChangeDishError} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${encodedProgramName}&filters[date][$gte]=${formattedNextDay}&filters[changedDish][$eq]=true&populate=*`
    );

    useEffect(() => {
        if (allDish) {
            setUpdatedDishes([...initialDishes, ...allDish]);
        }
    }, [allDish, initialDishes]);

    useEffect(() => {
        if (selectedDish) {
            // Filter available replacement dishes based on the selected dish's date and eating type
            const matchingDishes = allChangeDish.filter(changeDish =>
                dayjs(changeDish.attributes.date).isSame(dayjs(selectedDish.attributes.date), 'day') &&
                changeDish.attributes.eating_type === selectedDish.attributes.eating_type
            );
            // Include the current dish as a replacement option (if it’s not already in the list)
            if (!matchingDishes.some(dish => dish.id === selectedDish.id)) {
                setAvailableReplacementDishes([selectedDish, ...matchingDishes]);
            } else {
                setAvailableReplacementDishes(matchingDishes);
            }
        }
    }, [selectedDish, allChangeDish]);

    const openModal = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDish(null);
        setShowModal(false);
        setIsAdditionalMenuVisible(false);
    };

    const handleDishReplace = (newDish) => {
        const newUpdatedDishes = updatedDishes.map(dish =>
            dish.id === selectedDish.id ? newDish : dish
        );

        setUpdatedDishes(newUpdatedDishes);
        setIsAdditionalMenuVisible(false);
        setSelectedDish(newDish);

        // Update the entire order in Strapi with the new list of dishes
        updateOrderInStrapi(newUpdatedDishes);
    };

    const updateOrderInStrapi = async (dishes) => {
        try {
            const response = await api.put(`/orders/${orderId}`, {
                data: {
                    dishes: dishes.map(dish => dish.id), // Map updated dishes to their IDs
                }
            });
            console.log('Order updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    // Filter dates based on excludeSaturday and excludeSunday
    const filteredDates = dates.filter(date => {
        const dayOfWeek = date.day();
        if (excludeSaturday && dayOfWeek === 6) return false; // 6 represents Saturday
        if (excludeSunday && dayOfWeek === 0) return false; // 0 represents Sunday
        return true;
    });

    return (
        <div className="container mx-auto p-4 mt-10">
            <h2 className='py-8'>
                <span className='capitalize'>{userName}</span>, здравствуйте!
                Вы заказали
                программу {programName} с {dayjs(startDate).format('DD.MM.YYYY')} по {dayjs(endDate).format('DD.MM.YYYY')}
            </h2>

            {filteredDates.map((date) => {
                const weekday = date.locale('ru').format('dddd');
                const formattedDate = date.format('DD.MM.YYYY');

                const dishesForTheDay = updatedDishes.filter(dish =>
                    dayjs(dish.attributes.date).isSame(date, 'day')
                );

                return (
                    <div key={formattedDate} className="mb-6">
                        <hr/>
                        <h3 className="text-xl text-left py-3 uppercase">{weekday}, {formattedDate}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {dishesForTheDay.map(dish => {
                                const dishDate = dayjs(dish.attributes.date);
                                const imageUrl = `${import.meta.env.VITE_UPLOAD_URL}${dish.attributes.main_img.data.attributes.url}`;

                                const daysDifference = dishDate.diff(dayjs(), 'day');

                                return (
                                    <div key={dish.id}
                                         className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={dish.attributes.dish_name}
                                            className="rounded-t-lg cursor-pointer"
                                            onClick={() => openModal(dish)}
                                        />
                                        <h4 className="text-lg py-3">{dish.attributes.dish_name}</h4>
                                        <div className='mt-auto flex justify-between items-center px-4 py-2'>
                                            <p className='text-left text-base py-3 px-3'>{dish.attributes.eating_type}</p>
                                            {daysDifference >= 1 && (
                                                <button
                                                    className='border-0 text-base text-[var(--oringe)]'
                                                    onClick={() => {
                                                        setSelectedDish(dish);
                                                        setIsAdditionalMenuVisible(true);
                                                    }}
                                                >
                                                    Заменить
                                                </button>
                                            )}
                                        </div>
                                        {showModal && selectedDish?.id === dish.id && (
                                            <DishModalWindow onClose={closeModal} dishData={selectedDish}/>
                                        )}
                                        {isAdditionalMenuVisible && selectedDish?.id === dish.id && (
                                            <ChangeDish
                                                dishes={availableReplacementDishes}
                                                eatingType={dish.attributes.eating_type}
                                                onSelectDish={handleDishReplace}
                                                currentDish={selectedDish}
                                                onClose={() => setIsAdditionalMenuVisible(false)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderDetails;
