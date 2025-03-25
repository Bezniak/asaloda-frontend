import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {eachDayOfInterval, format, parseISO} from 'date-fns';
import {CSVLink} from 'react-csv';
import {Preloader} from "../Preloader/Preloader.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import dayjs from 'dayjs';

const AllOrdersForAdmin = () => {
    const {user, role} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openTables, setOpenTables] = useState([dayjs().format('DD.MM.YYYY')]);

    const dishOrder = {
        'Первый завтрак': 1,
        'Второй завтрак': 2,
        'Обед': 3,
        'Полдник': 4,
        'Ужин': 5
    };

    useEffect(() => {
        if (role !== 'admin') {
            navigate(ROUTES.HOME);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/orders?populate=*');
                const rawOrders = response.data.data;

                const processedOrders = rawOrders.flatMap(order => {
                    const {startDate, endDate, dishes, userEmail, userPhone, payStatus} = order.attributes;
                    const start = parseISO(startDate);
                    const end = parseISO(endDate);
                    const dates = eachDayOfInterval({start, end});

                    return dates.map(date => {
                        const formattedDate = format(date, 'dd.MM.yyyy');

                        const formattedDishes = dishes.data
                            .filter(dish => format(parseISO(dish.attributes.date), 'dd.MM.yyyy') === formattedDate)
                            .map((dish) => {
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
                            userEmail,
                            order_num: order.attributes.order_num || 'Не указано',
                            userPhone,
                            address: order.attributes.address,
                            programName: order.attributes.programName,
                            duration: order.attributes.duration,
                            deliveryTime: order.attributes.deliveryTime,
                            excludeSaturday: order.attributes.excludeSaturday ? 'Да' : 'Нет',
                            excludeSunday: order.attributes.excludeSunday ? 'Да' : 'Нет',
                            promoCode: order.attributes.promoCodeValue,
                            totalPrice: order.attributes.totalPrice,
                            comment: order.attributes.comment,
                            formattedDishes,
                            payStatus
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

    const updatePayStatus = async (orderId, newStatus) => {
        const confirmChange = window.confirm("Вы действительно хотите изменить статус оплаты заказа?");
        if (!confirmChange) return;

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
                data: {payStatus: newStatus}
            });

            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId ? {...order, payStatus: newStatus} : order
            ));
        } catch (err) {
            console.error('Failed to update pay status:', err);
        }
    };

    const groupedOrders = orders.reduce((acc, order) => {
        const {date} = order;
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
    }, {});

    const sortedGroupedOrders = Object.entries(groupedOrders).reduce((acc, [date, orders]) => {
        acc[date] = orders.sort((a, b) => a.programName.localeCompare(b.programName));
        return acc;
    }, {});

    const toggleTable = (date) => {
        setOpenTables(prev =>
            prev.includes(date)
                ? prev.filter(d => d !== date)
                : [...prev, date]
        );
    };

    const countPrograms = (orders) => {
        const programCount = orders.reduce((acc, order) => {
            const programName = order.programName;
            if (!acc[programName]) acc[programName] = 0;
            acc[programName]++;
            return acc;
        }, {});
        return programCount;
    };

    const columns = [
        {Header: '№', accessor: 'index'},
        {Header: 'ID заказа в Strapi', accessor: 'id'},
        {Header: 'Номер заказа в WebPay', accessor: 'order_num'},
        {Header: 'Статус оплаты', accessor: 'payStatus'},
        {Header: 'Имя пользователя', accessor: 'username'},
        {Header: 'Email пользователя', accessor: 'userEmail'},
        {Header: 'Телефон пользователя', accessor: 'userPhone'},
        {Header: 'Адрес доставки', accessor: 'address'},
        {Header: 'Время доставки', accessor: 'deliveryTime'},
        {Header: 'Название программы', accessor: 'programName'},
        {Header: 'Длительность', accessor: 'duration'},
        {Header: 'Дата', accessor: 'date'},
        {Header: 'Исключить субботу', accessor: 'excludeSaturday'},
        {Header: 'Исключить воскресенье', accessor: 'excludeSunday'},
        {Header: 'Блюда', accessor: 'formattedDishes'},
        {Header: 'Промокод', accessor: 'promoCode'},
        {Header: 'Комментарий', accessor: 'comment'},
        {Header: 'Общая стоимость', accessor: 'totalPrice'}
    ];

    if (loading) return <Preloader/>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
    if (!user || role !== 'admin') return <p className="text-center mt-4 text-red-500">Нет доступа</p>;

    return (
        <div className="container mx-auto px-4">
            {Object.entries(sortedGroupedOrders).map(([date, orders]) => {
                const programCount = countPrograms(orders);
                return (
                    <div key={date} className="mb-8">
                        <h2 className="text-2xl text-left font-bold mb-4">{date}</h2>
                        <button
                            onClick={() => toggleTable(date)}
                            className="mb-4 mr-10 inline-block bg-[var(--green)] hover:text-white hover:bg-[var(--oringe)] transition text-white px-3 py-3 rounded"
                        >
                            {openTables.includes(date) ? `Скрыть таблицу на ${date}` : `Показать таблицу на ${date}`}
                        </button>
                        <CSVLink
                            data={orders.map(order => {
                                const {formattedDishes, ...rest} = order;
                                return {
                                    ...rest,
                                    formattedDishes: formattedDishes.replace(/;<\/?.*?>/g, '\n')
                                };
                            })}
                            headers={columns.map(col => ({label: col.Header, key: col.accessor}))}
                            filename={`orders_${date.replace(/\./g, '-')}.csv`}
                            className="mb-4 inline-block bg-[var(--green)] hover:text-white hover:bg-[var(--oringe)] transition text-white px-3 py-3 rounded"
                        >
                            Скачать заказы на {date}
                        </CSVLink>

                        {openTables.includes(date) && (
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
                                    {orders.map((order, index) => (
                                        <tr key={order.id} className="hover:bg-gray-200">
                                            {columns.map(column => {
                                                const cellValue = column.accessor === 'index' ? index + 1 : column.accessor.split('.').reduce((obj, key) => (obj ? obj[key] : null), order);
                                                if (column.accessor === 'payStatus') {
                                                    return (
                                                        <td
                                                            key={column.Header}
                                                            className="border border-gray-300 px-2 py-1 break-words whitespace-pre-line"
                                                        >
                                                            <select
                                                                value={order.payStatus}
                                                                onChange={(e) => updatePayStatus(order.id, e.target.value)}
                                                                className="border border-gray-300 rounded px-2 py-1"
                                                            >
                                                                <option value="created">created</option>
                                                                <option value="paid">paid</option>
                                                                <option value="not paid">not paid</option>
                                                            </select>
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td
                                                        key={column.Header}
                                                        className="border border-gray-300 px-2 py-1 break-words whitespace-pre-line"
                                                    >
                                                        {cellValue}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AllOrdersForAdmin;
