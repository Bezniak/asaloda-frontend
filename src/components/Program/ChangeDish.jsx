import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MdClose } from "react-icons/md";
import {Preloader} from "../Preloader/Preloader.jsx";

const ChangeDish = ({ dishes, eatingType, onSelectDish, currentDish, onClose }) => {
    const [filteredChangeDishes, setFilteredChangeDishes] = useState(null); // Изначально null, чтобы отличить состояние до фильтрации
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        if (dishes.length > 0 && currentDish) {
            const newFilteredChangeDishes = dishes.filter(dish =>
                dish.attributes.eating_type === eatingType &&
                dayjs(dish.attributes.date).isSame(currentDish.attributes.date, 'day') &&
                dish.attributes.changedDish === true
            );
            setFilteredChangeDishes(newFilteredChangeDishes); // Устанавливаем отфильтрованные блюда
        } else {
            setFilteredChangeDishes([]); // Если условий нет, устанавливаем пустой массив
        }

        const dateTwoDaysLater = dayjs().add(2, 'day').format('DD.MM.YYYY');
        setNewDate(dateTwoDaysLater);
    }, [dishes, eatingType, currentDish]);

    const handleSelect = (dish) => {
        onSelectDish(dish);
    };

    return (
        <div
            id="drawer-right-example"
            className="fixed top-0 right-0 z-50 h-screen p-5 overflow-y-auto bg-white md:w-5/12 xs:w-full"
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
        >
            <button
                onClick={onClose}
                className="absolute top-14 right-14 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close"
            >
                <MdClose size={30}/>
            </button>

            <h2 id="drawer-right-label" className="mt-5 text-4xl text-left mb-3 font-semibold">
                Выберите замену
            </h2>
            <p className='text-left text-gray-500 mb-10'>
                Доставка будет изменена c {newDate}!
            </p>

            <div className="mb-10">
                <div className="mt-2 flex flex-row w-full items-center bg-gray-200 border border-gray-200 rounded-lg shadow">
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 xs:w-1/3 xs:h-auto md:rounded-none md:rounded-s-lg"
                        src={import.meta.env.VITE_UPLOAD_URL + currentDish?.attributes?.main_img?.data?.attributes?.url}
                        alt={currentDish?.attributes?.dish_name}
                    />
                    <div className="ml-5 mr-5 w-full flex flex-col justify-between p-4 leading-normal">
                        <div className='flex flex-row justify-between mb-5 text-gray-600 text-sm'>
                            <div className='flex flex-row justify-evenly'>
                                <p>Б {currentDish?.attributes?.squirrels}</p> &nbsp;
                                <p>Ж {currentDish?.attributes?.fats}</p> &nbsp;
                                <p>У {currentDish?.attributes?.carbohydrates}</p> &nbsp;
                            </div>
                            <div className='text-left'>
                                ККАЛ {currentDish?.attributes?.kcal}
                            </div>
                        </div>
                        <h2 className='text-base text-left'>{currentDish?.attributes?.dish_name}</h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-evenly">
                {filteredChangeDishes === null ? (
                    <Preloader/>
                ) : filteredChangeDishes.length > 0 ? (
                    filteredChangeDishes.map((dish) => (
                        <div
                            key={dish.id}
                            className="w-64 bg-white border border-gray-200 rounded-lg shadow mb-6 cursor-pointer"
                            onClick={() => handleSelect(dish)}
                        >
                            <img
                                className="rounded-t-lg w-full h-40 object-cover"
                                src={import.meta.env.VITE_UPLOAD_URL + dish?.attributes?.main_img?.data?.attributes?.url}
                                alt={dish?.attributes?.dish_name}
                            />
                            <div className="p-4">
                                <div className='flex flex-row justify-between mb-4 text-gray-600 text-sm'>
                                    <div className='flex flex-row justify-evenly'>
                                        <p>Б {dish?.attributes?.squirrels}</p> &nbsp;
                                        <p>Ж {dish?.attributes?.fats}</p> &nbsp;
                                        <p>У {dish?.attributes?.carbohydrates}</p> &nbsp;
                                    </div>
                                    <div>
                                        ККАЛ {dish?.attributes?.kcal}
                                    </div>
                                </div>
                                <p className="text-base font-normal text-gray-700 dark:text-gray-400">
                                    {dish?.attributes?.dish_name}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет доступных замен на выбранную дату.</p>
                )}
            </div>
        </div>
    );
};

export default ChangeDish;
