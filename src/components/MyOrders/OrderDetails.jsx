import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import useFetchAllData from "../../api/useFetchAllData.js";
import DishModalWindow from "../Program/DishModalWindow.jsx";
import ChangeDish from "../Program/ChangeDish.jsx";
import api from '../../api/api.js';
import {Preloader} from "../Preloader/Preloader.jsx";

const OrderDetails = ({
                          userName,
                          programName,
                          startDate,
                          endDate,
                          dates,
                          dishes: initialDishes,
                          nextDay,
                          orderId,
                          excludeSaturday,
                          excludeSunday,
                          programStartDate,
                          programEndDate
                      }) => {
    const [selectedDish, setSelectedDish] = useState(null);
    const [isAdditionalMenuVisible, setIsAdditionalMenuVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [updatedDishes, setUpdatedDishes] = useState(initialDishes);
    const [availableReplacementDishes, setAvailableReplacementDishes] = useState([]);
    const [allDishError, setAllDishError] = useState(null);
    const [allChangeDishError, setAllChangeDishError] = useState(null);

    const encodedProgramName = encodeURIComponent(programName);
    const formattedNextDay = dayjs(nextDay).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    const {data: allDish, loading: allDishLoading} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${encodedProgramName}&filters[date][$gte]=${formattedNextDay}&filters[date][$lte]=${formattedEndDate}&filters[changedDish][$eq]=false&populate=*`
    );

    const {data: allChangeDish, loading: allChangeDishLoading} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${encodedProgramName}&filters[date][$gte]=${programStartDate}&filters[date][$lte]=${programEndDate}&populate=*`
    );

    useEffect(() => {
        if (allDishLoading || allChangeDishLoading) {
            setAllDishError(null);
            setAllChangeDishError(null);
        }
    }, [allDishLoading, allChangeDishLoading]);

    useEffect(() => {
        if (allDish) {
            const newUpdatedDishes = [...initialDishes, ...allDish];
            setUpdatedDishes(newUpdatedDishes);
        }
    }, [allDish, initialDishes]);

    useEffect(() => {
        if (selectedDish) {
            const matchingDishes = allChangeDish.filter(changeDish =>
                dayjs(changeDish.attributes.date).isSame(dayjs(selectedDish.attributes.date), 'day') &&
                changeDish.attributes.eating_type === selectedDish.attributes.eating_type
            );
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

        updateOrderInStrapi(newUpdatedDishes);
    };

    const updateOrderInStrapi = async (dishes) => {
        try {
            const response = await api.put(`/orders/${orderId}`, {
                data: {
                    dishes: dishes.map(dish => dish.id),
                }
            });
            console.log('Order updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const filteredDates = dates.filter(date => {
        const dayOfWeek = date.day();
        if (excludeSaturday && dayOfWeek === 6) return false;
        if (excludeSunday && dayOfWeek === 0) return false;
        return true;
    });

    const eatingTypeOrder = ['Первый завтрак', 'Второй завтрак', 'Обед', 'Полдник', 'Ужин'];

    const sortedDishes = updatedDishes.sort((a, b) => {
        const typeA = a.attributes.eating_type;
        const typeB = b.attributes.eating_type;
        return eatingTypeOrder.indexOf(typeA) - eatingTypeOrder.indexOf(typeB);
    });

    return (
        <div className="container mx-auto p-4 mt-10">
            {allDishLoading || allChangeDishLoading ? (
                <Preloader/> // Показать Preloader при загрузке
            ) : allDishError || allChangeDishError ? (
                <div className="text-red-500">
                    <p>Ошибка загрузки данных:</p>
                    {allDishError && <p>{allDishError.message}</p>}
                    {allChangeDishError && <p>{allChangeDishError.message}</p>}
                </div>
            ) : (
                <>
                    <h2 className='py-8 text-2xl'>
                        <span className='capitalize'>{userName}</span>, здравствуйте!
                        Вы заказали
                        программу {programName} с <span
                        className='font-bold'>{dayjs(startDate).format('DD.MM.YYYY')}</span> по <span
                        className='font-bold'>{dayjs(endDate).format('DD.MM.YYYY')}</span>
                    </h2>

                    {filteredDates.map((date) => {
                        const weekday = date.locale('ru').format('dddd');
                        const formattedDate = date.format('DD.MM.YYYY');

                        const dishesForTheDay = sortedDishes.filter(dish =>
                            dayjs(dish.attributes.date).isSame(date, 'day')
                        );

                        return (
                            <div key={formattedDate} className="mb-6">


                                <hr className="h-0.5 mt-8 mb-6 my-2 bg-gray-200 border-0 rounded w-full"/>


                                <h3 className="text-xl text-left py-3 uppercase text-[var(--green)] font-bold">{weekday}, {formattedDate}</h3>
                                <div className="flex justify-start items-start gap-10 flex-wrap">
                                    {dishesForTheDay.length > 0 ? (
                                        dishesForTheDay.map(dish => {
                                            const dishDate = dayjs(dish.attributes.date);
                                            const imageUrl = `${import.meta.env.VITE_UPLOAD_URL}${dish.attributes.main_img.data.attributes.url}`;
                                            const daysDifference = dishDate.diff(dayjs(), 'day');

                                            return (
                                                <div key={dish.id}
                                                     className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between h-[400px]"
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={dish.attributes.dish_name}
                                                        className="rounded-t-lg object-cover h-2/3"
                                                    />
                                                    <div className='flex flex-col h-full'>
                                                        <h4 className="text-lg py-3 px-4">{dish.attributes.dish_name}</h4>
                                                        <div
                                                            className='mt-auto flex justify-between items-center px-4 py-2'>
                                                            <p className='text-left text-base py-3'>{dish.attributes.eating_type}</p>
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
                                        })
                                    ) : (
                                        <div className="text-gray-500 text-center text-sm py-4">
                                            <p>Блюда скоро будут добавлены. Пожалуйста, проверьте меню позже.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default OrderDetails;
