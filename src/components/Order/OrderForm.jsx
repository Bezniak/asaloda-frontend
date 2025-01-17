import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {NavLink, useOutletContext} from "react-router-dom";
import Select from 'react-select'
import dayjs from "dayjs";
import {useAuth} from "../../context/AuthContext.jsx";
import api from "../../api/api.js";
import {ROUTES} from "../../config/routes.js";
import {customStyles} from "../../utils/customOrderFormStyles.jsx";
import {useTranslation} from "react-i18next";
import CryptoJS from 'crypto-js';

import 'dayjs/locale/ru';
import 'dayjs/locale/be';
import 'dayjs/locale/en';


const OrderForm = ({program, userChosenDishes}) => {
    const {t} = useTranslation();
    const {locale} = useAuth();
    const {userClickedProgram} = useOutletContext(); // Получаем контекст
    const [currentProgram, setCurrentProgram] = useState(null)
    const today = dayjs();
    const [isFocused, setIsFocused] = useState(false);
    const {user, role} = useAuth();
    const [showInputPromoCode, setShowInputPromoCode] = useState(false);
    const [promoCodeValue, setPromoCodeValue] = useState("");
    const [discount, setDiscount] = useState(null);
    const [promoCodeMessage, setPromoCodeMessage] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [excludeSaturday, setExcludeSaturday] = useState(false);
    const [excludeSunday, setExcludeSunday] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);  // For disabling the button
    const [submissionMessage, setSubmissionMessage] = useState("");  // For success/error messages
    const [formSubmitted, setFormSubmitted] = useState(false);  // To track form submission
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        trigger,
    } = useForm();


// Универсальная функция для получения программы по имени или массиву имен
    const getProgramByUserChoice = (program, userClickedProgram) => {
        if (Array.isArray(program)) {
            // Если program массив, то продолжаем поиск по массиву
            return program.find(item => item.attributes.program_name === userClickedProgram);
        } else if (program?.attributes) {
            // Если program — это объект, сравниваем напрямую
            return program;
        } else {
            console.error('Program data is not in the expected format:', program);
            return null; // Вернем null, если формат данных неожиданный
        }
    };

// useEffect для отслеживания изменений userClickedProgram и program
    useEffect(() => {
        if (program && userClickedProgram) {
            const chosenProgram = getProgramByUserChoice(program, userClickedProgram);
            setCurrentProgram(chosenProgram); // Обновляем состояние с выбранной программой
        }
    }, [userClickedProgram, program]); // Перезапуск при изменении userClickedProgram или program


    const calculateEffectiveDays = (startDate, duration, excludeSaturday, excludeSunday) => {
        let effectiveDays = 0;
        const start = dayjs(startDate);
        for (let i = 0; i < duration; i++) {
            const day = start.add(i, 'day');
            const isSaturday = day.day() === 6;
            const isSunday = day.day() === 0;
            if ((isSaturday && excludeSaturday) || (isSunday && excludeSunday)) {
                continue;
            }
            effectiveDays++;
        }
        return effectiveDays;
    };

    const calculateTotalPrice = (startDate, duration, discount, excludeSaturday, excludeSunday) => {
        const effectiveDays = calculateEffectiveDays(startDate, duration, excludeSaturday, excludeSunday);
        const basePrice = currentProgram?.attributes?.one_day_price * effectiveDays;
        return discount
            ? (basePrice * (1 - discount / 100)).toFixed(2)
            : basePrice.toFixed(2);
    };

    const calculateDiscountAmount = (startDate, duration, discount, excludeSaturday, excludeSunday) => {
        const effectiveDays = calculateEffectiveDays(startDate, duration, excludeSaturday, excludeSunday);
        const basePrice = currentProgram?.attributes?.one_day_price * effectiveDays;
        return discount ? ((basePrice * discount) / 100).toFixed(2) : 0;
    };

    // const getBonuses = (duration) => {
    //     return duration >= 14 ? bonusesForOrdering * (duration / 7) : 0;
    // };

    const filterDishesByDateAndDay = (dishes, startDate, duration, excludeSaturday, excludeSunday) => {
        const start = dayjs(startDate);
        return dishes.filter(dish => {
            const dishDate = dayjs(dish.attributes.date);
            const dayDifference = dishDate.diff(start, 'day');
            const isWithinDuration = dayDifference >= 0 && dayDifference < duration
            const isSaturday = dishDate.day() === 6;
            const isSunday = dishDate.day() === 0;
            const isExcluded = (isSaturday && excludeSaturday) || (isSunday && excludeSunday);
            return isWithinDuration && !isExcluded;
        });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true); // Отключение кнопки отправки для предотвращения повторной отправки

        try {
            // Расчет конечной даты и отфильтрованных блюд
            const endDate = dayjs(data.startDate.value).add(selectedDuration.value - 1, 'day');
            const endDateFormatted = endDate.format('YYYY-MM-DD');
            const filteredDishes = filterDishesByDateAndDay(
                userChosenDishes,
                data.startDate.value,
                selectedDuration.value,
                excludeSaturday,
                excludeSunday
            );
            const totalPrice = parseFloat(
                calculateTotalPrice(
                    data.startDate.value,
                    data.duration.value,
                    discount,
                    excludeSaturday,
                    excludeSunday
                )
            );

            // Данные для подписи
            const storeId = import.meta.env.VITE_STORE_ID; // ID магазина
            const orderNum = String(Date.now()); // Уникальный номер заказа
            const seed = String(Date.now()); // Случайная последовательность
            const testMode = '0'; // 0 — реальный платеж, 1 — тест
            const currencyId = 'BYN'; // Валюта платежа
            const secretKey = import.meta.env.VITE_SECRET_KEY; // Ваш секретный ключ

            // Формирование строки подписи
            const signatureString = `${seed}${storeId}${orderNum}${testMode}${currencyId}${totalPrice.toFixed(0)}${secretKey}`;
            const signature = CryptoJS.SHA1(signatureString).toString();


            // Создание данных для платежа
            // const paymentPayload = {
            //     scart: '', // Обязательно по документации
            //     wsb_storeid: storeId,
            //     wsb_order_num: orderNum,
            //     wsb_currency_id: currencyId,
            //     wsb_version: 2, // Используется версия 2
            //     wsb_language_id: 'russian',
            //     wsb_test: testMode,
            //     wsb_seed: seed,
            //     wsb_signature: signature,
            //     wsb_total: totalPrice.toFixed(2),
            //     wsb_invoice_item_name: filteredDishes.map((dish) => dish?.attributes?.dish_name), // Названия позиций
            //     wsb_invoice_item_quantity: filteredDishes.map(() => '1'), // Количество позиций как строки
            //     wsb_invoice_item_price: filteredDishes.map(() =>
            //         parseFloat((totalPrice / filteredDishes.length).toFixed(2)).toString()
            //     ), // Цена как строки
            // };

            const paymentPayload = {
                '*scart': '',
                wsb_storeid: 695796847,
                wsb_store: 'AsalodaFood',
                wsb_order_num: orderNum,
                wsb_currency_id: 'BYN',
                wsb_test: 0,
                wsb_version: "2",
                wsb_seed: seed,
                wsb_signature: signature,
                wsb_total: totalPrice.toFixed(0),
                wsb_return_url: 'https://asalodafood.by/conrifm',
                wsb_cancel_return_url: 'https://asalodafood.by/cancel',
                'wsb_invoice_item_name[0]': currentProgram?.attributes?.program_name,
                'wsb_invoice_item_quantity[0]': data.duration.value,
                'wsb_invoice_item_price[0]': currentProgram?.attributes?.one_day_price,

            };
            // console.log(signature);
            // alert(signature);


            // console.log(filteredDishes);
            console.log('Payment Payload:', paymentPayload); // Лог данных для отладки

            // Создание формы и отправка на сервер оплаты
            const form = document.createElement('form');
            form.action = 'https://payment.webpay.by'; // Реальный платежный URL
            form.method = 'POST';

            Object.entries(paymentPayload).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = Array.isArray(value) ? JSON.stringify(value) : value;
                form.appendChild(input);
            });

            document.body.appendChild(form); // Добавить форму в DOM
            form.submit(); // Отправить форму

            // Сохранение данных заказа в Strapi
            const orderPayload = {
                data: {
                    address: data.address,
                    comment: data.comment || '',
                    deliveryTime: data.deliveryTime?.value || '',
                    duration: data.duration.value.toString(),
                    excludeSaturday: excludeSaturday,
                    excludeSunday: excludeSunday,
                    programName: currentProgram?.attributes?.program_name,
                    promoCode: showInputPromoCode ? promoCodeValue : '',
                    startDate: data.startDate.value,
                    endDate: endDateFormatted,
                    totalPrice: Number(totalPrice.toFixed(2)),
                    user: user?.id || null,
                    userName: data.userName,
                    userEmail: data.email,
                    userPhone: data.userPhone,
                    dishes: filteredDishes.map((dish) => dish.id),
                    order_num: orderNum,
                },
            };

            console.log(orderPayload);

            await api.post(`${import.meta.env.VITE_API_URL}/orders`, orderPayload);


            setFormSubmitted(true);
            setSubmissionMessage(t('order_accepted')); // Отображение успешного сообщения
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false); // Включение кнопки отправки
            setSubmissionMessage(`Error: ${error.message || 'An unknown error occurred.'}`); // Отображение ошибки
        }
    };


    const dateOptions = Array.from({length: 14}, (_, i) => {
        const date = today.add(2 + i, 'day');
        return {value: date.format('YYYY-MM-DD'), label: date.format('DD MMMM')};
    });

    const timeOptions = [
        {value: '18:00 - 20:00', label: '18:00 - 20:00'},
        {value: '21:00 - 23:00', label: '21:00 - 23:00'},
    ];

    const durations = [
        {value: 1, label: t("one_Day")},
        {value: 2, label: t("two_Days")},
        {value: 3, label: t("three_Days")},
        {value: 4, label: t("fore_Days")},
        {value: 5, label: t("five_Days")},
        {value: 6, label: t("six_Days")},
        {value: 7, label: t("one_Week")},
        {value: 14, label: t("two_Weeks")},
        {value: 21, label: t("three_Weeks")},
        {value: 28, label: t("fore_Weeks")},
    ];

    const [selectedDuration, setSelectedDuration] = useState(durations[0]);
    const [selectedStartDate, setSelectedStartDate] = useState(dateOptions[0]);

    const applyPromoCode = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/promo-codes?filters[code][$eq]=${promoCodeValue}`);
            const data = await response.json();

            if (data.data.length === 0 || data.data[0].attributes.code !== promoCodeValue) {
                setPromoCodeMessage(t("invalid_promoCode"));
                setDiscount(null);
            } else {
                setDiscount(data.data[0].attributes.discount); // Здесь устанавливается discount
                setPromoCodeMessage(`${t("promoCode_applied_discount")} " " ${data.data[0].attributes.discount}%`);

            }
        } catch (error) {
            console.error("Ошибка при проверке промокода:", error);
            setPromoCodeMessage(t("error_checking_promoCode"));
        }
    };

    const generateCalendarDates = () => {
        const startDate = dayjs(selectedStartDate.value).locale(locale); // Устанавливаем локаль
        const duration = selectedDuration.value;
        const dates = [];

        for (let i = 0; i < duration; i++) {
            const date = startDate.add(i, 'day');
            const isSaturday = date.day() === 6;
            const isSunday = date.day() === 0;
            dates.push({
                date: date.format('DD MMMM'), // Форматирует дату в зависимости от локали
                dayOfWeek: date.format('dddd'), // День недели в зависимости от локали
                isExcluded: (isSaturday && excludeSaturday) || (isSunday && excludeSunday),
                isSaturday,
                isSunday,
            });
        }
        return dates;
    };

    // Conditionally render the form or the success message
    if (formSubmitted) {
        return (
            <div className='bg-white p-10 flex flex-col gap-5 min-h-96 items-center justify-center'>
                <h2 className='text-2xl font-bold'>{submissionMessage}</h2>
            </div>
        );
    }


    return (
        <div className='bg'>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='w-full max-w-5xl mx-auto md:mt-20 md:mb-20 xs:mt-10 xs:mb-10 bg-white md:p-10 xs:p-3 flex flex-col gap-5'>
                <div className='min-h-40 flex flex-row justify-around items-center rounded-lg bg-[var(--green)]'>
                    <h2 className='uppercase text-white font-bold md:text-4xl'>
                        {t("order")}
                        &nbsp;
                        «{userChosenDishes[0]?.attributes?.program_type}»</h2>
                </div>
                <div className='mb-4'>
                    <p className='text-left mt-4 mb-2 font-bold'>
                        {t("program_duration")}
                    </p>
                    <Controller
                        name="duration"
                        control={control}
                        defaultValue={durations[0]}
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={durations}
                                styles={customStyles}
                                className='w-full xs:text-base md:text-lg'
                                placeholder={t("program_duration")}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => {
                                    setIsFocused(false);
                                    trigger("duration");
                                }}
                                onChange={(selectedOption) => {
                                    setSelectedDuration(selectedOption);
                                    field.onChange(selectedOption);
                                }}
                            />
                        )}
                    />
                    {errors.duration &&
                        <span className='text-red-500 xs:text-base md:text-lg'>
                            {t("program_duration")}
                        </span>
                    }
                </div>

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex md:flex-row xs:flex-col justify-between items-center gap-5'>
                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input
                            type="checkbox"
                            name='excludeSaturday'
                            id='excludeSaturday'
                            {...register('excludeSaturday')}
                            checked={excludeSaturday}
                            onChange={() => {
                                setExcludeSaturday(!excludeSaturday);
                                trigger("excludeSaturday");
                            }}
                            className='w-6 h-6 appearance-none border-2 border-gray-300 rounded checked:bg-[var(--green)] checked:border-[var(--green)] focus:outline-none'
                        />
                        <label htmlFor="excludeSaturday" className='xs:text-base md:text-lg'>
                            {t("exclude_saturday")}
                        </label>
                    </div>

                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input
                            type="checkbox"
                            name='excludeSunday'
                            id='excludeSunday'
                            {...register('excludeSunday')}
                            checked={excludeSunday}
                            onChange={() => {
                                setExcludeSunday(!excludeSunday);
                                trigger("excludeSunday");
                            }}
                            className='w-6 h-6 appearance-none border-2 border-gray-300 rounded checked:bg-[var(--green)] checked:border-[var(--green)] focus:outline-none'
                        />
                        <label htmlFor="excludeSunday" className='xs:text-base md:text-lg'>
                            {t("exclude_sunday")}
                        </label>
                    </div>
                </div>

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                    <input
                        type="checkbox"
                        name='promoCode'
                        id='promoCode'
                        {...register('promoCode')}
                        checked={showInputPromoCode}
                        onChange={() => setShowInputPromoCode(!showInputPromoCode)}
                        className='w-6 h-6 appearance-none border-2 border-gray-300 rounded checked:bg-[var(--green)] checked:border-[var(--green)] focus:outline-none'
                    />
                    <label htmlFor="promoCode" className='xs:text-base md:text-lg'>
                        {t("i_have_promo_code")}
                    </label>
                </div>


                {showInputPromoCode && (
                    <div className='flex xs:flex-col md:flex-row items-center gap-5'>
                        <input
                            type="text"
                            name='promoCodeValue'
                            id='promoCodeValue'
                            {...register('promoCodeValue', {required: showInputPromoCode})}
                            value={promoCodeValue}
                            onChange={(e) => setPromoCodeValue(e.target.value)}
                            className='w-full border p-3 rounded outline-none xs:text-base md:text-lg'
                            placeholder={t("enter_promoCode")}
                        />
                        <button
                            type="button"
                            onClick={applyPromoCode}
                            className='bg-[var(--green)] px-12 py-3 rounded-full text-white hover:!bg-[var(--oringe)] transition xs:text-base md:text-lg'
                        >
                            {t("apply")}
                        </button>
                    </div>
                )}

                {promoCodeMessage && (
                    <div className='bg-green-100 p-3 rounded'>
                        <p>{promoCodeMessage}</p>
                    </div>
                )}

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <h2 className='text-left text-bold md:text-4xl'>
                    {t("delivery")}
                </h2>
                <div className='flex xs:flex-col md:flex-row gap-5'>

                    <div className='flex flex-col w-full'>
                        <input type="text"
                               name='userName'
                               id='userName'
                               {...register('userName', {required: true})}
                               placeholder={t("name")}
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.userName ? 'border-red-500' : ''} xs:text-base md:text-lg`}
                               onBlur={() => trigger("userName")}
                        />
                        {errors.userName &&
                            <span className='text-red-500 mt-2 mb-2 xs:text-base md:text-lg'>
                                {t("enter_your_name")}
                            </span>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <input type="tel"
                               name='userPhone'
                               id='userPhone'
                               {...register('userPhone', {
                                   required: true,
                                   pattern: /^[+]?[0-9\s]*$/,
                                   minLength: 10,
                                   maxLength: 15
                               })}
                               placeholder={t("telephone")}
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.userPhone ? 'border-red-500' : ''} xs:text-base md:text-lg`}
                               onBlur={() => trigger("userPhone")}
                        />
                        {errors.userPhone &&
                            <span className='text-red-500 mt-2 mb-2 xs:text-base md:text-lg'>
                                {t("valid_phone_number")}
                            </span>
                        }
                    </div>
                </div>
                <div className='flex xs:flex-col md:flex-row gap-5'>

                    <div className='flex flex-col w-full'>
                        <input type="email"
                               name='email'
                               id='email'
                               {...register('email', {required: true})}
                               placeholder={t("email_required")}
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.email ? 'border-red-500' : ''} xs:text-base md:text-lg`}
                               onBlur={() => trigger("email")}
                        />
                        {errors.email &&
                            <span className='text-red-500 mt-2 mb-2 xs:text-base md:text-lg'>
                                {t("enter_email")}
                            </span>
                        }
                    </div>

                    <div className='flex flex-col w-full'>
                        <input type="text"
                               name='address'
                               id='address'
                               {...register('address', {required: true})}
                               placeholder={t("street_houseNumber_apartment_number")}
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.address ? 'border-red-500' : ''} xs:text-base md:text-lg `}
                               onBlur={() => trigger("address")}
                        />
                        {errors.address &&
                            <span className='text-red-500 mt-2 mb-2 xs:text-base md:text-lg'>
                                {t("enter_address")}
                            </span>
                        }
                    </div>
                </div>

                <div className='flex xs:flex-col md:flex-row gap-5'>

                    <div className='mb-4 w-full'>
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={dateOptions}
                                    styles={customStyles}
                                    className='w-full xs:text-base md:text-lg'
                                    placeholder={t("start_date")}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        trigger("startDate");
                                    }}
                                    onChange={(selectedOption) => {
                                        setSelectedStartDate(selectedOption);
                                        field.onChange(selectedOption);
                                    }}
                                />
                            )}
                        />
                        {errors.startDate &&
                            <span className='text-red-500 xs:text-base md:text-lg'>
                                {t("start_date")}
                            </span>
                        }
                    </div>

                    <div className='mb-4 w-full'>
                        <Controller
                            name="deliveryTime"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={timeOptions}
                                    styles={customStyles}
                                    className='w-full xs:text-base md:text-lg'
                                    placeholder={t("delivery_time")}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        trigger("deliveryTime");
                                    }}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                />
                            )}
                        />
                        {errors.deliveryTime &&
                            <span className='text-red-500 xs:text-base md:text-lg'>
                        {t("delivery_time")}
                            </span>
                        }
                    </div>
                </div>

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                    <input
                        type="checkbox"
                        name='comment'
                        id='comment'
                        {...register('comment')}
                        checked={showComment}
                        onChange={() => setShowComment(!showComment)}
                        className='w-6 h-6 appearance-none border-2 border-gray-300 rounded checked:bg-[var(--green)] checked:border-[var(--green)] focus:outline-none xs:text-base md:text-lg'
                    />
                    <label htmlFor="comment" className='xs:text-base md:text-lg'>
                        {t("add_comment_to_order")}
                    </label>
                </div>


                {showComment && (
                    <div className='flex items-center gap-5'>
                        <textarea
                            name='comment'
                            id='comment'
                            {...register('comment')}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            className='w-full border p-3 rounded outline-none resize-none md:h-60 xs:h-36 xs:text-base md:text-lg'
                            placeholder={t("comment")}
                        />
                    </div>
                )}

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400 text-left xs:text-base md:text-lg'>
                            {t("program_cost")}:
                        </p>
                        <p className='font-medium xs:text-base md:text-lg'>
                            {currentProgram?.attributes?.one_day_price * selectedDuration.value} BYN
                        </p>
                    </div>

                    {discount && (
                        <>
                            <div className='flex justify-between items-center border-b border-dashed pb-3'>
                                <p className='text-gray-400 xs:text-base md:text-lg'>
                                    {t("promoCode_discount")}
                                </p>
                                <p className='font-medium xs:text-base md:text-lg'>
                                    {discount} %
                                </p>
                            </div>
                            <div className='flex justify-between items-center border-b border-dashed pb-3'>
                                <p className='text-gray-400 xs:text-base md:text-lg'>
                                    {t("discount_amount")}
                                </p>
                                <p className='font-medium xs:text-base md:text-lg'>
                                    {calculateDiscountAmount(selectedStartDate.value, selectedDuration.value, discount, excludeSaturday, excludeSunday)} BYN
                                </p>
                            </div>
                        </>
                    )}

                    {/*{getBonuses(selectedDuration.value) > 0 && (*/}
                    {/*    <div className='flex justify-between items-center border-b border-dashed pb-3'>*/}
                    {/*        <h2 className='text-gray-400 xs:text-base md:text-lg'>Будет начислено бонусов</h2>*/}
                    {/*        <p className='font-medium xs:text-base md:text-lg'>*/}
                    {/*            {getBonuses(selectedDuration.value)} Б*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='font-extrabold xs:text-lg md:text-2xl'>{t("total_amount")}:</p>
                        <p className='font-extrabold xs:text-lg md:text-2xl'>
                            {calculateTotalPrice(selectedStartDate.value, selectedDuration.value, discount, excludeSaturday, excludeSunday)} BYN
                        </p>
                    </div>
                </div>

                <h2 className='mt-5 text-left xs:text-base md:text-lg'>
                    {t("program_schedule")}
                </h2>
                <div className='flex flex-wrap gap-5 justify-evenly items-center'>
                    {generateCalendarDates().map((dateObj, index) => (
                        <div key={index}
                             className={`p-2 text-center rounded border text-base ${dateObj.isExcluded ? 'line-through text-gray-400' : ''} `}>
                            <div className='xs:text-sm md:text-lg'>{dateObj.date}</div>
                            <div className='xs:text-sm md:text-lg'>{dateObj.dayOfWeek}</div>
                        </div>
                    ))}
                </div>

                <div className='flex xs:flex-col md:flex-row justify-between items-center gap-10 mt-10'>
                    <p className='xs:text-base md:text-lg'>
                        {t("checkout_button_agree")}
                        <br/>
                        <NavLink to={ROUTES.PRIVACY_POLICY}
                                 className='font-semibold hover:!text-[var(--oringe)] text-[var(--green)] transition xs:text-base md:text-lg'>
                            {t("processing_of_personal_data")}
                        </NavLink>
                    </p>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='bg-[var(--green)] md:px-20 xs:px-12 md:py-5 xs:py-2 rounded-full w-fit text-white hover:!bg-[var(--oringe)] transition xs:text-base md:text-lg'
                    >
                        {isSubmitting ? t("sending") : t("place_an_order")}
                    </button>
                </div>
            </form>
            {submissionMessage && (
                <div className='mt-5 xs:h-10vh md:h-80vh'>
                    <p className='text-red-500 xs:text-base md:text-lg'>{submissionMessage}</p>
                </div>
            )}
        </div>
    );
};

export default OrderForm;