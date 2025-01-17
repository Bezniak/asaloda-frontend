import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from "../../api/api.js";
import { ROUTES } from "../../config/routes.js";

const ConfirmPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderNum = searchParams.get('wsb_order_num'); // Получаем номер заказа
    const transactionId = searchParams.get('wsb_tid'); // Получаем ID транзакции

    useEffect(() => {
        const confirmPayment = async () => {
            if (!orderNum || !transactionId) {
                console.error('Отсутствуют необходимые параметры платежа.');
                navigate(ROUTES.CANSEL); // Перенаправление на страницу ошибки
                return;
            }

            try {
                // 1. Запрос на сервер для верификации данных оплаты
                const response = await api.post(`/payments/verify`, {
                    orderNum,
                    transactionId,
                });

                if (response.data.success) {
                    // 2. Успешный платеж: создание заказа в системе
                    await api.post(`${import.meta.env.VITE_API_URL}/orders`, response.data.orderPayload);
                    navigate(ROUTES.CONFIRM); // Перенаправление на страницу успешной оплаты
                } else {
                    console.warn('Платеж не подтвержден:', response.data.responseText);
                    navigate(ROUTES.CANSEL); // Перенаправление на страницу ошибки
                }
            } catch (error) {
                console.error('Ошибка обработки подтверждения платежа:', error);
                navigate(ROUTES.CANSEL); // Перенаправление на страницу ошибки
            }
        };

        confirmPayment();
    }, [orderNum, transactionId, navigate]);

    return (
        <div>
            <h1>Обработка платежа...</h1>
            <p>Пожалуйста, подождите. Мы проверяем ваш платеж.</p>
        </div>
    );
};

export default ConfirmPage;
