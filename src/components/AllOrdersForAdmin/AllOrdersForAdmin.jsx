import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {addDays, eachDayOfInterval, format, parseISO} from 'date-fns';
import {CSVLink} from 'react-csv';
import {Preloader} from "../Preloader/Preloader.jsx";

const AllOrdersForAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log('orders', orders);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/orders?populate=*');
                const rawOrders = response.data.data;

                console.log('rawOrders', rawOrders)

                const processedOrders = rawOrders.flatMap(order => {
                    const {startDate, duration, replacedDishes} = order.attributes;
                    const start = parseISO(startDate);
                    const end = addDays(start, duration - 1);
                    const dates = eachDayOfInterval({start, end});

                    return dates.map(date => {
                        const formattedDate = format(date, 'dd.MM.yyyy');
                        const replacedDishesForDate = replacedDishes?.[formattedDate.replace(/\./g, '-')];

                        return {
                            ...order,
                            date: formattedDate,
                            username: order.attributes.user?.data?.attributes?.username || order.attributes.userName || 'Не указано',
                            userphone: order.attributes.user?.data?.attributes?.userphone || order.attributes.userPhone || 'Не указано',
                            email: order.attributes.user?.data?.attributes?.email || order.attributes.userEmail || 'Не указано',
                            replacedDishesForDate: replacedDishesForDate?.map(dish => dish.attributes.dish_name).join(', ') || 'Нет замен'
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
    }, []);

    const groupedOrders = orders.reduce((acc, order) => {
        const {date} = order;
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
    }, {});

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Имя пользователя',
            accessor: 'username',
        },
        {
            Header: 'Телефон',
            accessor: 'userphone',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Адрес',
            accessor: 'attributes.address',
        },
        {
            Header: 'Название программы',
            accessor: 'attributes.programName',
        },
        {
            Header: 'Дата начала',
            accessor: 'attributes.startDate',
            Cell: ({value}) => format(parseISO(value), 'dd.MM.yyyy'),
        },
        {
            Header: 'Длительность',
            accessor: 'attributes.duration',
        },
        {
            Header: 'Время доставки',
            accessor: 'attributes.deliveryTime',
        },
        {
            Header: 'Исключить субботу',
            accessor: 'attributes.excludeSaturday',
            Cell: ({value}) => (value ? 'Да' : 'Нет'),
        },
        {
            Header: 'Исключить воскресенье',
            accessor: 'attributes.excludeSunday',
            Cell: ({value}) => (value ? 'Да' : 'Нет'),
        },
        {
            Header: 'Промокод',
            accessor: 'attributes.promoCodeValue',
        },
        {
            Header: 'Замененные блюда',
            accessor: 'replacedDishesForDate',
        },
        {
            Header: 'Комментарий',
            accessor: 'attributes.comment',
        },
        {
            Header: 'Общая стоимость',
            accessor: 'attributes.totalPrice',
        },
    ];

    if (loading) return <Preloader/>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-6 text-center">Все заказы</h1>
            {Object.entries(groupedOrders).map(([date, orders]) => (
                <div key={date} className="mb-8">
                    <h2 className="text-2xl text-left font-bold mb-4">{date}</h2>
                    <CSVLink
                        data={orders}
                        headers={columns.map(col => ({label: col.Header, key: col.accessor}))}
                        filename={`orders_${date.replace(/\./g, '-')}.csv`}
                        className="mb-4 inline-block bg-[var(--green)] text-dark px-3 py-3 rounded"
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
                                        style={{minWidth: '100px'}} // Ensure minimum width for each column
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
                                        const cellValue = column.accessor
                                            .split('.')
                                            .reduce((obj, key) => (obj ? obj[key] : null), order);
                                        return (
                                            <td
                                                key={column.Header}
                                                className={`border border-gray-300 px-2 py-1 break-words whitespace-normal ${
                                                    column.accessor === 'replacedDishesForDate' && cellValue !== 'Нет замен' ? 'bg-red-400' : ''
                                                }`}
                                                style={{minWidth: '100px', maxWidth: '200px'}} // Control column width
                                            >
                                                {column.Cell ? column.Cell({
                                                    value: cellValue,
                                                    row: {original: order}
                                                }) : cellValue}
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
