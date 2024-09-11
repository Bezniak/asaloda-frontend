import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {eachDayOfInterval, format, parseISO} from 'date-fns';
import {CSVLink} from 'react-csv';
import {Preloader} from "../Preloader/Preloader.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const AllOrdersForAdmin = () => {
    const {user, role} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dishOrder = {
        'Первый завтрак': 1,
        'Второй завтрак': 2,
        'Обед': 3,
        'Полдник': 4,
        'Ужин': 5
    };


    useEffect(() => {

        if (role !== 'admin') {
            // Если роль пользователя не "admin", перенаправляем на главную страницу
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/orders?populate=*');
                const rawOrders = response.data.data;

                console.log('rawOrders', rawOrders)

                const processedOrders = rawOrders.flatMap(order => {
                    const {startDate, endDate, dishes} = order.attributes;
                    const start = parseISO(startDate);
                    const end = parseISO(endDate);
                    const dates = eachDayOfInterval({start, end});

                    return dates.map(date => {
                        const formattedDate = format(date, 'dd.MM.yyyy');

                        // Формируем блюда только для текущей даты
                        const formattedDishes = dishes.data
                            .filter(dish => format(parseISO(dish.attributes.date), 'dd.MM.yyyy') === formattedDate)
                            .map((dish, index) => {
                                const {eating_type, dish_name, changedDish} = dish.attributes;
                                return {
                                    dish_info: `${eating_type}: ${dish_name}`,
                                    changedDish
                                };
                            })
                            .sort((a, b) => (dishOrder[a.eating_type] || 99) - (dishOrder[b.eating_type] || 99))
                            .map(dish => {
                                return `${dish.dish_info}${dish.changedDish ? ' (изменено)' : ''}`;
                            })
                            .join('; ');

                        return {
                            ...order,
                            date: formattedDate,
                            username: order.attributes.user?.data?.attributes?.username || order.attributes.userName || 'Не указано',
                            address: order.attributes.address,
                            programName: order.attributes.programName,
                            duration: order.attributes.duration,
                            deliveryTime: order.attributes.deliveryTime,
                            excludeSaturday: order.attributes.excludeSaturday ? 'Да' : 'Нет',
                            excludeSunday: order.attributes.excludeSunday ? 'Да' : 'Нет',
                            promoCode: order.attributes.promoCodeValue,
                            totalPrice: order.attributes.totalPrice,
                            comment: order.attributes.comment,
                            formattedDishes
                        };
                    });
                });

                setOrders(processedOrders);
            } catch (err) {
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [role, navigate]);

    const groupedOrders = orders.reduce((acc, order) => {
        const {date} = order;
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
    }, {});

    const columns = [
        {Header: 'Номер заказа', accessor: 'id'},
        {Header: 'Имя пользователя', accessor: 'username'},
        {Header: 'Адрес', accessor: 'address'},
        {Header: 'Название программы', accessor: 'programName'},
        {Header: 'Дата', accessor: 'date'},
        {Header: 'Длительность', accessor: 'duration'},
        {Header: 'Время доставки', accessor: 'deliveryTime'},
        {Header: 'Исключить субботу', accessor: 'excludeSaturday'},
        {Header: 'Исключить воскресенье', accessor: 'excludeSunday'},
        {Header: 'Промокод', accessor: 'promoCode'},
        {Header: 'Комментарий', accessor: 'comment'},
        {Header: 'Общая стоимость', accessor: 'totalPrice'},
        {Header: 'Блюда', accessor: 'formattedDishes'}
    ];

    if (loading) return <Preloader />;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
    if (!user || role !== 'admin') return <p className="text-center mt-4 text-red-500">Нет доступа</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-6 text-center">Все заказы</h1>
            {Object.entries(groupedOrders).map(([date, orders]) => (
                <div key={date} className="mb-8">
                    <h2 className="text-2xl text-left font-bold mb-4">{date}</h2>
                    <CSVLink
                        data={orders.map(order => {
                            const {formattedDishes, ...rest} = order;
                            return {
                                ...rest,
                                formattedDishes: formattedDishes.replace(/<\/?strong>/g, '').replace('; ', '\n')
                            };
                        })}
                        headers={columns.map(col => ({label: col.Header, key: col.accessor}))}
                        filename={`orders_${date.replace(/\./g, '-')}.csv`}
                        className="mb-4 inline-block bg-green-500 text-white px-3 py-3 rounded"
                    >
                        Скачать меню на {date}
                    </CSVLink>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-sm table-auto">
                            <thead>
                            <tr className="bg-gray-100">
                                {columns.map(column => (
                                    <th
                                        key={column.Header}
                                        className="border border-gray-300 px-2 py-1 text-left"
                                        style={{minWidth: '100px'}}
                                    >
                                        {column.Header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-200">
                                    {columns.map(column => {
                                        const cellValue = column.accessor.split('.').reduce((obj, key) => (obj ? obj[key] : null), order);
                                        return (
                                            <td
                                                key={column.Header}
                                                className="border border-gray-300 px-2 py-1 break-words whitespace-pre-line"
                                                style={{minWidth: '100px', maxWidth: '200px'}}
                                            >
                                                {column.accessor === 'formattedDishes'
                                                    ? cellValue.split('; ').map((dish, index) => (
                                                        <div
                                                            key={index}
                                                            dangerouslySetInnerHTML={{__html: dish}}
                                                            style={{color: dish.includes('(изменено)') ? 'red' : 'inherit'}}
                                                        />
                                                    ))
                                                    : cellValue}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllOrdersForAdmin;
