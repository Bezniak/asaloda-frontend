import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import { FaCircle } from "react-icons/fa";
import DishModalWindow from "./DishModalWindow.jsx";
import ChangeDish from "./ChangeDish.jsx";
import { calculator } from "../../utils/utils.js";

dayjs.extend(localeData);
dayjs.locale('ru');

const DateCalendar = ({ allDish, allChangeDish, programType, onUpdateDishes }) => {
    const [selectedDish, setSelectedDish] = useState(null);
    const [isAdditionalMenuVisible, setIsAdditionalMenuVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const today = dayjs();
    const [activeDate, setActiveDate] = useState(today.add(2, 'day'));
    const dates = Array.from({ length: 8 }, (_, i) => today.add(i, 'day'));
    const dayAbbreviations = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    // Define the order for eating types
    const eatingTypeOrder = {
        'Первый завтрак': 1,
        'Второй завтрак': 2,
        'Обед': 3,
        'Полдник': 4,
        'Ужин': 5
    };

    const handleDateClick = (date) => {
        setActiveDate(date);
    };

    useEffect(() => {
        const newFilteredDishes = allDish.filter(dish => {
            return dayjs(dish.attributes.date).isSame(activeDate, 'day') && dish.attributes.changedDish === false;
        });

        // Sort dishes based on the predefined eating type order
        newFilteredDishes.sort((a, b) => {
            return (eatingTypeOrder[a.attributes.eating_type] || 0) - (eatingTypeOrder[b.attributes.eating_type] || 0);
        });

        setFilteredDishes(newFilteredDishes);
    }, [allDish, activeDate]);

    const openModal = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDish(null);
        setShowModal(false);
    };

    const handleDishReplace = (newDish) => {
        const updatedFilteredDishes = filteredDishes.map(dish =>
            dish.id === selectedDish.id ? newDish : dish
        );
        setFilteredDishes(updatedFilteredDishes);

        const updatedAllDishes = allDish.map(dish =>
            dish.id === selectedDish.id ? newDish : dish
        );
        console.log('Updated allDish array:', updatedAllDishes);

        onUpdateDishes(updatedAllDishes)

        setIsAdditionalMenuVisible(false);
        setSelectedDish(newDish);
    };

    useEffect(() => {
        if (showModal || isAdditionalMenuVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal, isAdditionalMenuVisible]);

    useEffect(() => {
        return () => {
            setSelectedDish(null);
            setIsAdditionalMenuVisible(false);
            setShowModal(false);
            setFilteredDishes([]);
        };
    }, []);

    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10'>
            {/* Оверлей */}
            {isAdditionalMenuVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40"
                     onClick={() => setIsAdditionalMenuVisible(false)}></div>
            )}
            <div className='flex items-center md:justify-start xs:justify-center gap-10 mb-5'>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <FaCircle className='text-xs fill-gray-400 pointer-events-none'/>
                    <p className='text-gray-400 font-semibold'>
                        Уже готовим
                    </p>
                </div>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <FaCircle className='text-xs fill-orange-400 pointer-events-none'/>
                    <p className='font-semibold'>
                        Можно менять
                    </p>
                </div>
            </div>

            <div className='flex gap-2'>
                {dates.map(date => {
                    const isToday = date.isSame(today, 'day');
                    const isTomorrow = date.isSame(today.add(1, 'day'), 'day');
                    const isFuture = date.isAfter(today.add(1, 'day'));

                    return (
                        <div
                            key={date.format('YYYY-MM-DD')}
                            className={`p-4 mb-5 cursor-pointer text-center rounded-lg ${date.isSame(activeDate, 'day') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handleDateClick(date)}
                        >
                            <div className="font-bold text-sm mb-2">
                                {dayAbbreviations[date.day()]}
                            </div>
                            <div className='text-sm'>
                                {date.format('DD.MM')}
                            </div>
                            <div className='flex justify-center mt-2'>
                                {isToday && <FaCircle className='text-xs fill-gray-400 pointer-events-none' />}
                                {isTomorrow && <FaCircle className='text-xs fill-gray-400 pointer-events-none' />}
                                {isFuture && <FaCircle className='text-xs fill-orange-400 pointer-events-none' />}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {filteredDishes.map(dish => (
                    <div key={dish.id}
                         className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
                        <img src={import.meta.env.VITE_UPLOAD_URL + dish.attributes.main_img?.data?.attributes?.url}
                             alt={dish.attributes.dish_name}
                             className="rounded-t-lg cursor-pointer"
                             onClick={() => openModal(dish)}
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h2
                                className="mb-8 text-1xl font-medium tracking-tight cursor-pointer hover:text-[var(--green)] transition"
                                onClick={() => openModal(dish)}
                            >
                                {dish?.attributes?.dish_name}
                            </h2>

                            <div className='mt-auto flex justify-between items-center'>
                                <p className="text-base text-gray-700 text-left">
                                    {dish?.attributes?.eating_type}
                                </p>
                                {dayjs(dish.attributes.date).isAfter(today.add(1, 'day')) && (
                                    <button className='border-0 text-base text-[var(--oringe)]'
                                            onClick={() => {
                                                const matchingDishes = allChangeDish.filter(changeDish =>
                                                    dayjs(changeDish.attributes.date).isSame(dish.attributes.date, 'day') &&
                                                    changeDish.attributes.eating_type === dish.attributes.eating_type
                                                );
                                                setSelectedDish(dish);
                                                setIsAdditionalMenuVisible(!isAdditionalMenuVisible);
                                                console.log('Matching change dishes:', matchingDishes);
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
                                dishes={allChangeDish}
                                eatingType={dish.attributes.eating_type}
                                onSelectDish={handleDishReplace}
                                currentDish={selectedDish}  // Pass the selected dish
                                onClose={() => setIsAdditionalMenuVisible(false)}
                            />
                        )}
                    </div>
                ))}

                <div className="p-5 w-full border border-gray-200 rounded-lg shadow">
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">Ккал</h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.kcal)))}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">Белки</h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.squirrels))).toFixed(1)}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">Жиры</h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.fats)))}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">Углеводы</h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.carbohydrates)))}
                        </p>
                    </div>
                    <p className="text-4xl font-bold mt-8 mb-10">от {programType?.attributes?.one_day_price} руб/день</p>
                    <button
                        className='rounded-full bg-[var(--green)] py-3 w-full text-white text-base mb-5 hover:!bg-green-600 transition'
                    >
                        Заказать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateCalendar;
