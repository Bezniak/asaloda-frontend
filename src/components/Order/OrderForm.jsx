import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import Select from 'react-select'
import dayjs from "dayjs";

const OrderForm = ({program, color}) => {

    const programName = program?.attributes?.program_name;
    const today = dayjs();
    const [isFocused, setIsFocused] = useState(false);

    const [showInputPromoCode, setShowInputPromoCode] = useState(false);
    const [promoCodeValue, setPromoCodeValue] = useState("");
    const [discount, setDiscount] = useState(null);
    const [promoCodeMessage, setPromoCodeMessage] = useState("");

    const [showComment, setShowComment] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const [excludeSaturday, setExcludeSaturday] = useState(false);
    const [excludeSunday, setExcludeSunday] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        control,
        trigger,
    } = useForm();

    const oneDayPrice = program?.attributes?.one_day_price;
    const bonusesForOrdering = program?.attributes?.bonuses_for_ordering;

    const calculateTotalPrice = (duration, discount, excludeSaturday, excludeSunday) => {
        let effectiveDays = duration;
        if (excludeSaturday) effectiveDays -= 1;
        if (excludeSunday) effectiveDays -= 1;
        const basePrice = oneDayPrice * effectiveDays;
        return discount
            ? (basePrice * (1 - discount / 100)).toFixed(2)
            : basePrice.toFixed(2);
    };

    const calculateDiscountAmount = (duration, discount, excludeSaturday, excludeSunday) => {
        let effectiveDays = duration;
        if (excludeSaturday) effectiveDays -= 1;
        if (excludeSunday) effectiveDays -= 1;
        const basePrice = oneDayPrice * effectiveDays;
        return discount ? ((basePrice * discount) / 100).toFixed(2) : 0;
    };

    const getBonuses = (duration) => {
        return duration >= 14 ? bonusesForOrdering * (duration / 7) : 0;
    };

    const onSubmit = (data) => {
        const formData = {
            ...data,
            deliveryTime: data.deliveryTime.label,
            duration: data.duration.label,
            startDate: data.startDate.label,
            totalPrice: calculateTotalPrice(data.duration.value, discount, excludeSaturday, excludeSunday),
            programName: programName,
        };
        console.log(formData);
    };

    const dateOptions = Array.from({ length: 14 }, (_, i) => {
        const date = today.add(2 + i, 'day');
        return { value: date.format('DD MMMM'), label: date.format('DD MMMM') };
    });

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: '10px',
            border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`,
            boxShadow: state.isFocused ? '0 0 0 1px #7ECA1D' : provided.boxShadow,
            '&:hover': {
                border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`,
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#7ECA1D' : provided.backgroundColor,
            color: state.isFocused ? '#fff' : provided.color,
        }),
        menu: (provided) => ({
            ...provided,
            padding: '12px',
        }),
    };

    const timeOptions = [
        { value: '18:00 - 20:00', label: '18:00 - 20:00' },
        { value: '21:00 - 23:00', label: '21:00 - 23:00' },
    ];

    const durations = [
        { value: '1', label: '1 день' },
        { value: '2', label: '2 дня' },
        { value: '3', label: '3 дня' },
        { value: '4', label: '4 дня' },
        { value: '5', label: '5 дней' },
        { value: '6', label: '6 дней' },
        { value: '7', label: '1 неделя (7 дней)' },
        { value: '14', label: '2 недели (14 дней)' },
        { value: '21', label: '3 недели (21 день)' },
        { value: '28', label: '4 недели (28 дней)' },
    ];

    const [selectedDuration, setSelectedDuration] = useState(durations[7]);

    const applyPromoCode = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/promo-codes?filters[code][$eq]=${promoCodeValue}`);
            const data = await response.json();

            if (data.data.length === 0 || data.data[0].attributes.code !== promoCodeValue) {
                setPromoCodeMessage("Промокод недействительный или срок действия истек");
                setDiscount(null);
            } else {
                setDiscount(data.data[0].attributes.discount);
                setPromoCodeMessage(`Промокод применен: скидка ${data.data[0].attributes.discount}%`);
            }
        } catch (error) {
            console.error("Ошибка при проверке промокода:", error);
            setPromoCodeMessage("Произошла ошибка при проверке промокода");
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-10 flex flex-col gap-5'>

                <div className='mb-4'>
                    <Controller
                        name="duration"
                        control={control}
                        defaultValue={durations[7]}
                        rules={{required: true}}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={durations}
                                styles={customStyles}
                                className='w-full'
                                placeholder='Выберите продолжительность программы'
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
                    {errors.duration && <span className='text-red-500'>Выберите продолжительность программы</span>}
                </div>

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex justify-between items-center gap-5'>
                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input type="checkbox"
                               name='excludeSaturday'
                               id='excludeSaturday'
                               {...register('excludeSaturday')}
                               checked={excludeSaturday}
                               onChange={() => {
                                   setExcludeSaturday(!excludeSaturday);
                                   trigger("excludeSaturday");
                               }}
                        />
                        <label htmlFor="excludeSaturday">Исключить субботу</label>
                    </div>

                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input type="checkbox"
                               name='excludeSunday'
                               id='excludeSunday'
                               {...register('excludeSunday')}
                               checked={excludeSunday}
                               onChange={() => {
                                   setExcludeSunday(!excludeSunday);
                                   trigger("excludeSunday");
                               }}
                        />
                        <label htmlFor="excludeSunday">Исключить воскресенье</label>
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
                    />
                    <label htmlFor="promoCode">У меня есть промокод</label>
                </div>

                {showInputPromoCode && (
                    <div className='flex items-center gap-5'>
                        <input
                            type="text"
                            name='promoCodeValue'
                            id='promoCodeValue'
                            {...register('promoCodeValue', { required: showInputPromoCode })}
                            value={promoCodeValue}
                            onChange={(e) => setPromoCodeValue(e.target.value)}
                            className='w-full border p-3 rounded outline-none'
                            placeholder='Введите промокод'
                        />
                        <button
                            type="button"
                            onClick={applyPromoCode}
                            className='bg-[var(--green)] px-12 py-3 rounded-full text-white'
                        >
                            Применить
                        </button>
                    </div>
                )}

                {promoCodeMessage && (
                    <div className='bg-gray-200 p-3 rounded'>
                        <p>{promoCodeMessage}</p>
                    </div>
                )}

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <h2 className='text-3xl text-left text-bold'>Доставка</h2>
                <div className='flex gap-5'>

                    <div className='flex flex-col w-full'>
                        <input type="text"
                               name='userName'
                               id='userName'
                               {...register('userName', {required: true})}
                               placeholder='Имя'
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.userName ? 'border-red-500' : ''}`}
                               onBlur={() => trigger("userName")}
                        />
                        {errors.userName && <span className='text-red-500 mt-2 mb-2 text-sm'>Введите имя</span>}
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
                               placeholder='Телефон'
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.userPhone ? 'border-red-500' : ''}`}
                               onBlur={() => trigger("userPhone")}
                        />
                        {errors.userPhone &&
                            <span className='text-red-500 mt-2 mb-2 text-sm'>Введите правильный номер телефона</span>}
                    </div>
                </div>
                <div className='flex gap-5'>

                    <div className='flex flex-col w-full'>
                        <input type="email"
                               name='email'
                               id='email'
                               {...register('email', {required: true})}
                               placeholder='Email (обязательно)'
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.email ? 'border-red-500' : ''}`}
                               onBlur={() => trigger("email")}
                        />
                        {errors.email && <span className='text-red-500 mt-2 mb-2 text-sm'>Введите email</span>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <input type="text"
                               name='address'
                               id='address'
                               {...register('address', {required: true})}
                               placeholder='Улица, номер дома, номер квартиры'
                               className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.address ? 'border-red-500' : ''}`}
                               onBlur={() => trigger("address")}
                        />
                        {errors.address && <span className='text-red-500 mt-2 mb-2 text-sm'>Введите адрес</span>}
                    </div>
                </div>

                <div className='flex gap-5'>

                    <div className='mb-4 w-full'>
                        <Controller
                            name="startDate"
                            control={control}
                            defaultValue={dateOptions[0]}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={dateOptions}
                                    styles={customStyles}
                                    className='w-full'
                                    placeholder='Выберите дату начала'
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        trigger("startDate");
                                    }}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                />
                            )}
                        />
                        {errors.startDate && <span className='text-red-500'>Выберите дату начала</span>}
                    </div>

                    <div className='mb-4 w-full'>
                        <Controller
                            name="deliveryTime"
                            control={control}
                            defaultValue={timeOptions[0]}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={timeOptions}
                                    styles={customStyles}
                                    className='w-full'
                                    placeholder='Выберите время доставки'
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        trigger("deliveryTime");
                                    }}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                />
                            )}
                        />
                        {errors.deliveryTime && <span className='text-red-500'>Выберите время доставки</span>}
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
                    />
                    <label htmlFor="comment">Добавить комментарий к заказу</label>
                </div>

                {showComment && (
                    <div className='flex items-center gap-5'>
                        <textarea
                            name='comment'
                            id='comment'
                            {...register('comment')}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            className='w-full border p-3 rounded outline-none resize-none md:h-60 xs:h-36'
                            placeholder='Комментарий'
                        />
                    </div>
                )}

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>Стоимость программы: {programName}</p>
                        <p className='font-medium'
                           style={{color: `${color}`}}
                        >
                            {oneDayPrice * selectedDuration.value} BYN
                        </p>
                    </div>

                    {discount && (
                        <>
                            <div className='flex justify-between items-center border-b border-dashed pb-3'>
                                <p className='text-gray-400'>Скидка по промокоду</p>
                                <p className='font-medium' style={{color: `${color}`}}>{discount} %</p>
                            </div>
                            <div className='flex justify-between items-center border-b border-dashed pb-3'>
                                <p className='text-gray-400'>Сумма скидки</p>
                                <p className='font-medium' style={{color: `${color}`}}>
                                    {calculateDiscountAmount(selectedDuration.value, discount)} BYN
                                </p>
                            </div>
                        </>
                    )}

                    {getBonuses(selectedDuration.value) > 0 && (
                        <div className='flex justify-between items-center border-b border-dashed pb-3'>
                            <h2 className='text-gray-400'>Будет начислено бонусов</h2>
                            <p className='font-medium'
                               style={{color: `${color}`}}
                            >
                                {getBonuses(selectedDuration.value)} Б
                            </p>
                        </div>
                    )}

                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>Итоговая сумма:</p>
                        <p className='font-extrabold' style={{color: `${color}`}}>
                            {calculateTotalPrice(selectedDuration.value, discount, excludeSaturday, excludeSunday)} BYN
                        </p>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-10 mt-10'>
                    <p>Нажимая кнопку “Оформить” Вы даёте согласие на
                        <NavLink to='' style={{color: `${color}`}} className='font-semibold'> обработку персональных
                            данных</NavLink>
                        &nbsp; и &nbsp;
                        <NavLink to='' style={{color: `${color}`}} className='font-semibold'> соглашаетесь с публичной
                            офертой</NavLink>
                    </p>
                    <button type="submit"
                            className='bg-[var(--green)] px-20 py-5 rounded-full w-fit text-white'
                            style={{backgroundColor: `${color}`}}
                    >
                        Оформить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
