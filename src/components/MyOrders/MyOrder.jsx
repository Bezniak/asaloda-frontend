import React from 'react';
import { useParams } from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import OrderDetails from './OrderDetails.jsx';

const MyOrder = () => {
    const { id } = useParams();  // Get the order ID from the URL params
    const { data, loading, error } = useFetchAllData(`/orders/${id}?populate[dishes][populate]=*&populate[user][populate]=*`);

    console.log('data MyOrder', data)

    if (loading) return <Preloader />;
    if (error) return <div className="text-center mt-8 text-red-500">Ошибка: {error.message}</div>;

    // Check if data and its nested properties exist
    if (!data || !data.attributes || !data.attributes.dishes || !data.attributes.user) {
        return <div className="text-center mt-8 text-red-500">Ошибка: данные отсутствуют или структура данных неправильная</div>;
    }

    const startDate = dayjs(data.attributes.startDate);
    const endDate = dayjs(data.attributes.endDate);
    const userName = data.attributes.user.data.attributes.username;
    const programName = data.attributes.programName;
    const excludeSaturday = data.attributes.excludeSaturday;
    const excludeSunday = data.attributes.excludeSunday;
    const programStartDate = dayjs(data.attributes.startDate).format('YYYY-MM-DD');
    const programEndDate = dayjs(data.attributes.endDate).format('YYYY-MM-DD');


    // Extract all the dish dates, checking if dishes data exists
    const dishDates = data.attributes.dishes.data.map(dish => dayjs(dish.attributes.date));

    // Find the latest date among the dishes
    const latestDishDate = dishDates.reduce((latest, current) => current.isAfter(latest) ? current : latest, dishDates[0]);

    // Get the next day after the latest dish date
    const nextDay = latestDishDate.add(1, 'day').format("YYYY-MM-DD");

    const dates = [];
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    return (
        <OrderDetails
            userName={userName}
            programName={programName}
            startDate={startDate}
            endDate={endDate}
            dates={dates}
            dishes={data.attributes.dishes.data}
            nextDay={nextDay}
            orderId={id}
            excludeSaturday={excludeSaturday}
            excludeSunday={excludeSunday}
            programStartDate={programStartDate}
            programEndDate={programEndDate}
        />
    );
};

export default MyOrder;
