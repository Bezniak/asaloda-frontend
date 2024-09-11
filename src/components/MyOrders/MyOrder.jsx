import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import OrderDetails from './OrderDetails.jsx';
import {ROUTES} from "../../config/routes.js";

const MyOrder = () => {
    const {id} = useParams();  // Get the order ID from the URL params
    const {
        data,
        loading,
        error
    } = useFetchAllData(`/orders/${id}?populate[dishes][populate]=*&populate[user][populate]=*`);
    const {user} = useAuth(); // Get the current user
    const navigate = useNavigate(); // For redirecting

    if (loading) return <Preloader/>;
    if (error) return <div className="text-center mt-8 text-red-500">Ошибка: {error.message}</div>;

    // Проверяем, что данные пользователя есть
    if (!data || !data.attributes || !data.attributes.user) {
        return <div className="text-center mt-8 text-red-500">Ошибка: данные отсутствуют</div>;
    }

    // Проверяем, что пользователь может просматривать этот заказ
    const orderUserId = data.attributes.user.data.id;
    if (user?.id !== orderUserId) {
        navigate(ROUTES.HOME);
        return null;
    }

    const startDate = dayjs(data.attributes.startDate);
    const endDate = dayjs(data.attributes.endDate);
    const userName = data.attributes.user.data.attributes.username;
    const programName = data.attributes.programName;
    const excludeSaturday = data.attributes.excludeSaturday;
    const excludeSunday = data.attributes.excludeSunday;
    const programStartDate = dayjs(data.attributes.startDate).format('YYYY-MM-DD');
    const programEndDate = dayjs(data.attributes.endDate).format('YYYY-MM-DD');

    const dishDates = data.attributes.dishes.data.map(dish => dayjs(dish.attributes.date));
    const latestDishDate = dishDates.reduce((latest, current) => current.isAfter(latest) ? current : latest, dishDates[0]);
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
