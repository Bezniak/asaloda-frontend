import React from 'react';
import Discounts from "./Discounts.jsx";
import {useTranslation} from "react-i18next";

const DiscountsContainer = () => {
    const {t} = useTranslation();


    return (
        <div className='w-full max-w-7xl mx-auto md:mt-20 md:mb-20 xs:mb-10 p-3'>
            <h1 className='md:text-4xl xs:text-2xl font-bold mb-10 md:text-left'>
                {t("discount")}
            </h1>
            <div
                className='flex flex-col md:flex-row items-stretch justify-between gap-10 px-4'
            >
                <Discounts img={'/discount7.5.webp'} title={'Скидка 7,5% при заказе на месяц!'}
                           modalTitle={'Скидка 7,5% при заказе на месяц!'}
                           modalDescription={'При заказе любой программы питания на месяц - скидка 7,5% !! Скидки по другим акциям и промокодам не суммируются.'}
                />
                <Discounts img={'/100_discount.webp'}
                           title={'Бонусная программа для наших клиентов'}
                           modalTitle={'Бонусная программа для наших клиентов'}
                           modalDescription={'При заказе любой программы питания на месяц - скидка 7,5% !! Скидки по другим акциям и промокодам не суммируются.'}
                           listTitle={'Рекомендации друзьям'}
                           list={['Вы рекомендуете наш сервис Вашим друзьям и знакомым.', 'Ваш знакомый, делая заказ, называет Ваш контактный телефон или e-mail адрес.', 'Вы и Ваш друг получаете до 1500 бонусных баллов на свой счет!']}
                />
                <Discounts img={'/5_discount.webp'}
                           title={'Скидка 5 % за заказ на 2 недели'}
                           modalTitle={'Скидка 5 % за заказ на 2 недели'}
                           modalDescription={'Хотите питаться правильно и выгодно? Тогда самое время заказать питание на 2 недели со скидкой 5% !!! Скидка применяется к любой программе питания на выбор. Скидки по другим акциям и промокодам не суммируются.'}
                />
            </div>
        </div>
    );
};

export default DiscountsContainer;