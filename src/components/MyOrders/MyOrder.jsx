import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import Russian locale for dayjs

const MyOrder = () => {
    const {id} = useParams();
    const {
        data,
        loading,
        error
    } = useFetchAllData(`/orders/${id}?populate[dishes][populate]=*&populate[user][populate]=*`);

    console.log('блюдо', data);

    if (loading) return <Preloader/>;
    if (error) return <div className="text-center mt-8 text-red-500">Ошибка: {error.message}</div>;

    if (!data || !data.attributes || !data.attributes.dishes) {
        return <div className="text-center mt-8 text-red-500">Ошибка: данные отсутствуют или структура данных
            неправильная</div>;
    }

    const startDate = dayjs(data?.attributes?.startDate);
    const endDate = dayjs(data?.attributes?.endDate);
    const userName = data?.attributes?.user?.data?.attributes?.username;
    const programName = data?.attributes?.programName;

    const dates = [];
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    return (
        <div className="container mx-auto p-4 mt-10">
            <h2 className='py-8'>
                <span className='capitalize'>{userName}</span>, здравствуйте!
                Вы заказали программу {programName} с {startDate.format('DD.MM.YYYY')} по {endDate.format('DD.MM.YYYY')}
            </h2>

            {dates.map((date) => {
                const weekday = date.locale('ru').format('dddd');
                const formattedDate = date.format('DD.MM.YYYY');

                const dishesForTheDay = data.attributes.dishes.data.filter(dish =>
                    dayjs(dish.attributes.date).isSame(date, 'day')
                );

                return (
                    <div key={formattedDate} className="mb-6">
                        <hr/>
                        <h3 className="text-xl text-left py-3 uppercase">{weekday}, {formattedDate}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {dishesForTheDay.map(dish => {
                                const imageUrl = `${import.meta.env.VITE_UPLOAD_URL}${dish.attributes.main_img.data.attributes.url}`;

                                return (
                                    <div key={dish.id}
                                         className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={dish.attributes.dish_name}
                                            className="rounded-t-lg cursor-pointer"
                                        />
                                        <h4 className="text-lg py-3">{dish.attributes.dish_name}</h4>
                                        <div>
                                            <p className='text-left text-base py-3 px-3'>{dish.attributes.eating_type}</p>
                                        </div>
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

export default MyOrder;
