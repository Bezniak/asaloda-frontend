import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useSearchParams} from 'react-router-dom';
import axios from "axios";
import {ROUTES} from "../../config/routes.js";
import {useTranslation} from "react-i18next";
import {handleClick} from "../../utils/utils.js";

const ConfirmPage = () => {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState({
        title: t("confirmation_page.processing_payment"),
        text: t("confirmation_page.please_wait"),
    });

    const orderNum = searchParams.get('wsb_order_num'); // Получаем номер заказа
    const transactionId = searchParams.get('wsb_tid'); // Получаем ID транзакции
    // console.log("transaction ID : " + transactionId);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                // Функция получения токена и проверки транзакции
                async function getTokenAndCheckTransaction() {
                    try {
                        const tokenUrl = "https://billing.webpay.by/api/login";

                        const tokenPayload = {
                            merchantId: import.meta.env.VITE_MERCHANT_ID,
                            username: import.meta.env.VITE_USERNAME,
                            password: import.meta.env.VITE_PASSWORD,
                        };

                        const tokenResponse = await axios.post(tokenUrl, tokenPayload);
                        const authToken = tokenResponse.data['data']['auth_token'];

                        const transactionUrl = `https://billing.webpay.by/api/v1/transactions/info/invoice/${orderNum}`;

                        const transactionResponse = await axios.get(transactionUrl, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        });

                        console.log("Статус транзакции:", transactionResponse.data);

                        if (transactionResponse.status === 200) {
                            // Обновляем сообщение на успешную оплату
                            setMessage({
                                title: t("confirmation_page.payment_processed"),
                                text: t("confirmation_page.thank_for_order"),
                            });
                        }
                    } catch (error) {
                        console.error("Ошибка:", error.response?.data || error.message);
                    }
                }

                await getTokenAndCheckTransaction();
            } catch (error) {
                console.error('Ошибка обработки подтверждения платежа:', error);
            }
        };

        confirmPayment();
    }, [orderNum, transactionId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="p-6 text-center max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{message.title}</h1>
                <p className="text-gray-600 mb-6">{message.text}</p>
                {message.title === t("confirmation_page.payment_processed") && (
                    <NavLink to={ROUTES.HOME} onClick={handleClick}
                             className='bg-[var(--green)] md:px-20 xs:px-12 md:py-5 xs:py-2 rounded-full w-fit text-white hover:!bg-[var(--oringe)] transition xs:text-base md:text-lg'
                    >
                        {t("confirmation_page.to_main_page")}
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default ConfirmPage;
