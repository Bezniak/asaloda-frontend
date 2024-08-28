import React from 'react';
import dayjs from 'dayjs';
import {useAuth} from "../../context/AuthContext.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";

const MyOrders = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetchAllData(`/orders?filters[user][$eq]=${user?.id}&populate=*`);

    if (loading) return <Preloader/>;
    if (error) return <div className="text-center mt-8 text-red-500">Ошибка: {error.message}</div>;

    console.log('data my orders', data)

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-left">Мои заказы</h1>

            {data?.length === 0 ? (
                <div className="text-center text-gray-500">У вас нет заказов</div>
            ) : (
                data?.map((order) => (
                    <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 mb-10">
                        <h2 className="text-2xl font-semibold mb-4 text-left">Заказ № {order.id}</h2>
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col justify-start items-start">
                                <p><span className="font-bold">Программа:</span> {order.attributes.programName}</p>
                                <p><span className="font-bold">Адрес доставки:</span> {order.attributes.address}</p>
                                <p><span className="font-bold">Время доставки:</span> {order.attributes.deliveryTime}
                                </p>
                                <p><span
                                    className="font-bold">Дата начала:</span> {dayjs(order.attributes.startDate).format('DD.MM.YYYY')}
                                </p>
                            </div>
                            <div className="flex flex-col justify-end items-end">
                                <p><span className="font-bold">Стоимость:</span> {order.attributes.totalPrice} BYN</p>
                                <p><span
                                    className="font-bold">Продолжительность:</span> {order.attributes.duration} дней</p>
                                {order.attributes.excludeSaturday && (
                                    <p><span className="font-bold">Суббота исключена:</span> Да</p>
                                )}
                                {order.attributes.excludeSunday && (
                                    <p><span className="font-bold">Воскресенье исключено:</span> Да</p>
                                )}
                                {order.attributes.promoCode && (
                                    <p><span className="font-bold">Промо-код:</span> {order.attributes.promoCodeValue}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;