import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import Select from 'react-select'
import dayjs from "dayjs";


const OrderForm = ({program}) => {

    console.log('program', program)

    const today = dayjs();
    const [isFocused, setIsFocused] = useState(false);

    const [showInputPromoCode, setShowInputPromoCode] = useState(false);
    const [promoCodeValue, setPromoCodeValue] = useState("");
    const [discount, setDiscount] = useState(null);
    const [promoCodeMessage, setPromoCodeMessage] = useState("");

    const [showComment, setShowComment] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        errors
    } =
        useForm()


    const onSubmit = (data) => {
        console.log(data)
    }


    const dateOptions = Array.from({length: 14}, (_, i) => {
        const date = today.add(2 + i, 'day');
        return {value: date.format('DD MMMM'), label: date.format('DD MMMM')};
    });

    // Состояние для отслеживания фокуса на выпадающем списке

    // Кастомные стили для компонента Select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: '10px',
            border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`,
            boxShadow: state.isFocused ? '0 0 0 1px #7ECA1D' : provided.boxShadow,
            '&:hover': {
                border: `1px solid ${state.isFocused ? '#7ECA1D' : '#ccc'}`
            }
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
        {value: '18:00 - 20:00', label: '18:00 - 20:00'},
        {value: '21:00 - 23:00', label: '21:00 - 23:00'},
    ]

    const durations = [
        {value: 'oneDay', label: '1 день'},
        {value: 'twoDays', label: '2 дня'},
        {value: 'threeDays', label: '3 дня'},
        {value: 'fourDays', label: '4 дня'},
        {value: 'fiveDays', label: '5 дней'},
        {value: 'sixDays', label: '6 дней'},
        {value: 'oneWeek', label: '1 неделя (7 дней)'},
        {value: 'twoWeeks', label: '2 недели (14 дней)'},
        {value: 'threeWeeks', label: '3 недели (21 день)'},
        {value: 'fourWeeks', label: '4 недели (28 дней)'},
    ];

    // State for duration selection and prices
    const [selectedDuration, setSelectedDuration] = useState(durations[7]); // Default to 2 weeks

    // Mapping of durations to their prices
    const durationPrices = {
        oneDay: program?.attributes?.one_day_price,
        twoDays: program?.attributes?.two_day_price,
        threeDays: program?.attributes?.three_day_price,
        fourDays: program?.attributes?.fore_day_price,
        fiveDays: program?.attributes?.five_day_price,
        sixDays: program?.attributes?.six_day_price,
        oneWeek: program?.attributes?.one_week_price,
        twoWeeks: program?.attributes?.two_week_price,
        threeWeeks: program?.attributes?.three_week_price,
        fourWeeks: program?.attributes?.four_week_price,
    };

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
                <Select
                    options={durations}
                    styles={customStyles}
                    className='w-full'
                    placeholder='Выберите продолжительность программы'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    defaultValue={durations[7]} // Default to 2 weeks
                    onChange={(selectedOption) => setSelectedDuration(selectedOption)}
                />

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex justify-between items-center gap-5'>
                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input type="checkbox"
                               name='excludeSaturday'
                               id='excludeSaturday'
                               {...register('excludeSaturday', {})}
                        />
                        <label htmlFor="excludeSaturday">Исключить субботу</label>
                    </div>

                    <div className='border w-full p-3 flex justify-start items-center gap-5 rounded'>
                        <input type="checkbox"
                               name='excludeSunday'
                               id='excludeSunday'
                               {...register('excludeSunday', {})}
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
                            {...register('promoCodeValue', {required: true})}
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

                {promoCodeMessage && <p className='text-red-500'>{promoCodeMessage}</p>}

                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <h2 className='text-3xl text-left text-bold'>Доставка</h2>
                <div className='flex gap-5'>
                    <input type="text"
                           name='userName'
                           id='userName'
                           {...register('userName', {
                               required: true,
                           })}
                           placeholder='Имя'
                           className='w-full border p-3 border-gray-200 rounded outline-none'
                    />
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
                           className='w-full border p-3 border-gray-200 rounded outline-none'
                    />
                </div>
                <div className='flex gap-5'>
                    <input type="email"
                           name='email'
                           id='email'
                           {...register('email', {
                               required: true
                           })}
                           placeholder='Email (обязательно)'
                           className='w-full border p-3 border-gray-200 rounded outline-none'
                    />
                    <input type="text"
                           name='address'
                           id='address'
                           {...register('address', {
                               required: true,
                           })}
                           placeholder='Адрес: г. Гродно, ул. Горького, 91, кв. 22'
                           className='p-3 w-full border rounded outline-none'
                    />
                </div>

                <div className='flex gap-5'>

                    <Select
                        options={dateOptions}
                        styles={customStyles}
                        className='w-full'
                        placeholder='Начиная с'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    <Select
                        options={timeOptions}
                        styles={customStyles}
                        className='w-full'
                        placeholder='Время'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
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
                            {...register('comment', {})}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            className='w-full border p-3 rounded outline-none'
                            placeholder='Комментарий'
                        />
                    </div>
                )}


                <hr className='h-0.5 my-2 bg-gray-200 border-0'/>

                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>{program?.attributes?.program_name}</p>
                        <p className='font-medium'>{discount
                            ? durationPrices[selectedDuration.value] * (1 - discount / 100)
                            : durationPrices[selectedDuration.value]} BYN</p>
                    </div>

                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>Скидка</p>
                        <p className='text-[var(--green)] font-medium'>{discount || ''} %</p>
                    </div>

                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>Будет начислено бонусов</p>
                        <p className='text-[var(--green)] font-medium'>200 Б</p>
                    </div>

                    <div className='flex justify-between items-center border-b border-dashed pb-3'>
                        <p className='text-gray-400'>Итого</p>
                        <p className='text-[var(--green)] font-extrabold'>80 BYN</p>
                    </div>
                </div>


                <div className='flex justify-between items-center gap-10 mt-10'>
                    <p>Нажимая кнопку “Оформить” Вы даёте согласие на
                        <NavLink to='' className='text-[var(--green)]'> обработку персональных данных</NavLink>
                        &nbsp; и &nbsp;
                        <NavLink to='' className='text-[var(--green)]'> соглашаетесь с публичной офертой</NavLink>
                    </p>
                    <button type="submit"
                            className='bg-[var(--green)] px-20 py-5 rounded-full w-fit text-white'
                    >
                        Оформить
                    </button>
                </div>

            </form>
        </div>
    );
};

export default OrderForm;