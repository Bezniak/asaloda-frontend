import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import {FaCircle} from "react-icons/fa";
import DishModalWindow from "./DishModalWindow.jsx";
import ChangeDish from "./ChangeDish.jsx";
import {calculator} from "../../utils/utils.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.jsx";

dayjs.extend(localeData);
dayjs.locale('ru');

const DateCalendar = ({
                          allDish,
                          allChangeDish,
                          replacedDishes,
                          programType,
                          onUpdateDishes,
                          setUpdatedAllDishes,
                          onOrderClick,
                          allDishLoading,
                          allChangeDishLoading
                      }) => {
    const {locale} = useAuth();
    const [selectedDish, setSelectedDish] = useState(null);
    const [isAdditionalMenuVisible, setIsAdditionalMenuVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const today = dayjs();
    const [activeDate, setActiveDate] = useState(today.add(2, 'day'));
    const dates = Array.from({length: 8}, (_, i) => today.add(i, 'day'));
    const {t} = useTranslation();
    const dayAbbreviations = [
        t("Su"),
        t("Mo"),
        t("Tu"),
        t("We"),
        t("Th"),
        t("Fr"),
        t("Sa")
    ];

    const findOneDayPriceByProgramName = (dishes, programType) => {
        // Ensure programType is not empty and has attributes
        if (Array.isArray(programType) && programType.length > 0) {
            const matchedProgram = programType.find(program => program?.attributes?.program_name === dishes?.attributes?.program_type);
            return matchedProgram ? matchedProgram.attributes.one_day_price : null;
        }
        return null;
    };

    const eatingTypeOrder = {
        ru: {
            'Первый завтрак': 1,
            'Второй завтрак': 2,
            'Обед': 3,
            'Полдник': 4,
            'Ужин': 5
        },
        en: {
            'Breakfast': 1,
            'Lunch': 2,
            'Dinner': 3
        },
        be: {
            'Першы сняданак': 1,
            'Другі сняданак': 2,
            'Абед': 3,
            'Падвячорак': 4,
            'Вячэра': 5
        }
    };

    const handleDateClick = (date) => {
        setActiveDate(date);
    };

    useEffect(() => {
        let newFilteredDishes;

        if (replacedDishes[activeDate.format('YYYY-MM-DD')]) {
            newFilteredDishes = replacedDishes[activeDate.format('YYYY-MM-DD')];
        } else {
            newFilteredDishes = allDish.filter(dish => {
                return dayjs(dish.attributes.date).isSame(activeDate, 'day') && dish.attributes.changedDish === false;
            });
        }

        newFilteredDishes.sort((a, b) => {
            return (eatingTypeOrder[locale][a.attributes.eating_type] || 0) - (eatingTypeOrder[locale][b.attributes.eating_type] || 0);
        });

        setFilteredDishes(newFilteredDishes);
    }, [allDish, activeDate, replacedDishes, locale]);

    const openModal = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDish(null);
        setShowModal(false);
    };

    const handleDishReplace = (newDish) => {
        // Обновляем массив allDish, заменяя старое блюдо на новое
        const updatedAllDishes = allDish.map(dish =>
            dish.id === selectedDish.id ? newDish : dish
        );

        // Обновляем массив filteredDishes, заменяя старое блюдо на новое
        const updatedFilteredDishes = filteredDishes.map(dish =>
            dish.id === selectedDish.id ? newDish : dish
        );

        // Обновляем состояние в родительском компоненте
        onUpdateDishes(activeDate.format('YYYY-MM-DD'), updatedFilteredDishes);

        // Сохраняем обновленный массив блюд
        setFilteredDishes(updatedFilteredDishes);
        setUpdatedAllDishes(updatedAllDishes);

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


    if (allDishLoading || allChangeDishLoading) return <Preloader/>

    return (
        <div className='w-full max-w-7xl mx-auto p-3'>
            {/* Оверлей */}
            {isAdditionalMenuVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40"
                     onClick={() => setIsAdditionalMenuVisible(false)}></div>
            )}
            <div className='flex items-center md:justify-start xs:justify-center gap-10 mb-5'>
                <div
                    className='flex flex-row justify-start items-center gap-3 xs:text-base xs:flex-col-reverse md:flex-row'>
                    <FaCircle className='text-xs fill-gray-400 pointer-events-none'/>
                    <p className='text-gray-400 font-semibold'>
                        {t("cooking")}
                    </p>
                </div>
                <div
                    className='flex flex-row justify-start items-center gap-3 xs:text-base xs:flex-col-reverse md:flex-row'>
                    <FaCircle className='text-xs fill-orange-400 pointer-events-none'/>
                    <p className='font-semibold'>
                        {t("dishes_replace")}
                    </p>
                </div>
            </div>

            <div className='flex gap-2 xs:flex-col md:flex-row'>
                {dates.map(date => {
                    const isToday = date.isSame(today, 'day');
                    const isTomorrow = date.isSame(today.add(1, 'day'), 'day');
                    const isFuture = date.isAfter(today.add(1, 'day'));

                    return (
                        <div
                            key={date.format('YYYY-MM-DD')}
                            className={`p-4 px-5 mb-5 cursor-pointer ml-2 text-center rounded-full ${date.isSame(activeDate, 'day') ? 'bg-[var(--green)] text-white' : 'bg-gray-200'}`}
                            onClick={() => handleDateClick(date)}
                        >
                            <div className="font-bold text-sm mb-2">
                                {dayAbbreviations[date.day()]}
                            </div>
                            <div className='text-sm'>
                                {date.format('DD.MM')}
                            </div>
                            <div className='flex justify-center mt-2'>
                                {isToday && <FaCircle className='text-xs fill-gray-400 pointer-events-none'/>}
                                {isTomorrow && <FaCircle className='text-xs fill-gray-400 pointer-events-none'/>}
                                {isFuture && <FaCircle className='text-xs fill-orange-400 pointer-events-none'/>}
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
                                        {t("replace")}
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

                <div className="p-5 w-fit border border-gray-200 rounded-lg shadow">
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">
                            {t("kcal")}
                        </h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.kcal))).toFixed(0)}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">
                            {t("squirrels")}
                        </h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.squirrels))).toFixed(0)}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">
                            {t("fat")}
                        </h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.fats))).toFixed(0)}
                        </p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-2'>
                        <h3 className="text-base text-gray-700 text-left">
                            {t("carbohydrates")}
                        </h3>
                        <p className="text-base text-gray-700 text-right">
                            {calculator(filteredDishes.map(dish => (dish?.attributes?.carbohydrates))).toFixed(0)}
                        </p>
                    </div>
                    {
                        programType.length > 1
                            ? (
                                <p className="text-4xl font-bold mt-8 mb-10">
                                    {t("form")}
                                    &nbsp;
                                    {findOneDayPriceByProgramName(allDish[0], programType)}
                                    &nbsp;
                                    {t("rub_per_day")}
                                </p>
                            )
                            : (
                                <p className="text-4xl font-bold mt-8 mb-10">
                                    {t("form")}
                                    &nbsp;
                                    {programType?.attributes?.one_day_price}
                                    &nbsp;
                                    {t("rub_per_day")}
                                </p>
                            )
                    }
                    <button
                        className='rounded-full bg-[var(--green)] py-3 w-full text-white text-base mb-5 hover:!bg-[var(--oringe)] transition'
                        onClick={onOrderClick}
                    >
                        {t("order")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateCalendar;
