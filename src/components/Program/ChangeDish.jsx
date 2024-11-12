import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {MdClose} from "react-icons/md";
import {Preloader} from "../Preloader/Preloader.jsx";
import {useTranslation} from "react-i18next";

const ChangeDish = ({dishes, eatingType, onSelectDish, currentDish, onClose}) => {
    const {t} = useTranslation();
    const [filteredChangeDishes, setFilteredChangeDishes] = useState(null);

    useEffect(() => {
        if (dishes.length > 0 && currentDish) {
            // Фильтрация только по типу приема пищи и дате
            const newFilteredChangeDishes = dishes.filter(dish =>
                dish.attributes.eating_type === eatingType &&
                dayjs(dish.attributes.date).isSame(currentDish.attributes.date, 'day')
            );
            setFilteredChangeDishes(newFilteredChangeDishes);
        } else {
            setFilteredChangeDishes([]);
        }

        // const dateTwoDaysLater = dayjs().add(2, 'day').format('DD.MM.YYYY');
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
                className="absolute top-10 right-8 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close"
            >
                <MdClose size={30}/>
            </button>

            <h2 id="drawer-right-label" className="mt-5 md:text-4xl text-center mb-10 font-semibold">
                {t("select_replacement")}
            </h2>

            <div className="mb-10">
                <div
                    className="mt-2 flex lg:flex-row xs:flex-col w-full items-center bg-green-50 border border-green-100 rounded-lg shadow">
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 xs:w-full xs:h-auto md:rounded-none md:rounded-s-lg"
                        src={import.meta.env.VITE_UPLOAD_URL + currentDish?.attributes?.main_img?.data?.attributes?.url}
                        alt={currentDish?.attributes?.dish_name}
                    />
                    <div className="ml-5 mr-5 w-full flex flex-col justify-between p-4 leading-normal">
                        <div className='flex flex-row justify-between mb-5 text-gray-600 text-sm'>
                            <div className='flex flex-row justify-evenly md:gap-5 sx:gap-2'>
                                <p>{t("squirrels")} &nbsp; {currentDish?.attributes?.squirrels}</p> &nbsp;
                                <p>{t("fat")} &nbsp; {currentDish?.attributes?.fats}</p> &nbsp;
                                <p>{t("carbohydrates")} &nbsp; {currentDish?.attributes?.carbohydrates}</p> &nbsp;
                            </div>
                            <div className='text-left'>
                                {t("kcal")} &nbsp; {currentDish?.attributes?.kcal}
                            </div>
                        </div>
                        <h2 className='text-base text-left'>{currentDish?.attributes?.dish_name}</h2>
                    </div>
                </div>
            </div>

            <h2 className='text-2xl text-left mt-5 mb-10'>
                {t("replacement_options")}:
            </h2>
            <div className="flex flex-wrap gap-6 justify-evenly">
                {filteredChangeDishes === null ? (
                    <Preloader/>
                ) : filteredChangeDishes.length > 0 ? (
                    filteredChangeDishes.map((dish) => (
                        <div
                            key={dish.id}
                            className="w-72 bg-white border border-gray-200 rounded-lg shadow mb-6 cursor-pointer"
                            onClick={() => handleSelect(dish)}
                        >
                            <img
                                className="rounded-t-lg w-full h-40 object-cover"
                                src={import.meta.env.VITE_UPLOAD_URL + dish?.attributes?.main_img?.data?.attributes?.url}
                                alt={dish?.attributes?.dish_name}
                            />
                            <div className="p-4">
                                <div className='flex flex-row justify-between mb-4 text-gray-600 text-sm'>
                                    <div className='flex flex-row justify-evenly md:gap-5 sx:gap-2'>
                                        <p>{t("squirrels")} {dish?.attributes?.squirrels}</p> &nbsp;
                                        <p>{t("fat")} {dish?.attributes?.fats}</p> &nbsp;
                                        <p>{t("carbohydrates")} {dish?.attributes?.carbohydrates}</p> &nbsp;
                                    </div>
                                    <div>
                                        {t("kcal")} &nbsp; {dish?.attributes?.kcal}
                                    </div>
                                </div>
                                <p className="text-base font-normal text-gray-700 dark:text-gray-400">
                                    {dish?.attributes?.dish_name}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        {t("no_available_substitutions")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangeDish;
