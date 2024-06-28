import React, {useState} from 'react';
import {MdCircle} from "react-icons/md";
import Map from "./Map.jsx";
import Button from "../Button/Button.jsx";

const Delivery = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <>
            <div className='flex md:flex-row xs:flex-col'>
                <div className='flex-1 md:pr-20'>
                    <h2 className='text-5xl font-bold mb-10 md:text-left'>Доставка</h2>
                    <p className='text-left mt-10 mb-10 text-gray-400 text-base'>
                        Мы осуществляем доставку ПП еды регулярно (раз в два дня). Каждое утро или вечер — выбор за Вами
                    </p>
                    <div className='flex flex-row justify-start items-center mb-4'>
                        <MdCircle className='fill-[var(--green)] mr-4'/>
                        <p className='text-left font-bold text-base'>Доставляем бесплатно</p>
                    </div>
                    <div className='flex flex-row justify-start items-center'>
                        <MdCircle className='fill-yellow-300 mr-4'/>
                        <p className='text-left font-bold text-base'>Доставка платная</p>
                    </div>
                </div>
                <Map/>
            </div>
            <div className='md:mt-20 xs:mt-10'>
                <p className='text-left mb-8 text-base'>
                    Хотите разнообразить свой рацион и получить идеально подходящие блюда, учитывающие ваши пищевые
                    предпочтения и цели? Сервис BeFit позволяет заказывать готовое питание, включающее разнообразные
                    блюда на каждый день недели. Гарантируем, что каждое блюдо тщательно подсчитано по ккал, помогая вам
                    контролировать потребление энергии и добиваться желаемых результатов.
                    <br/>
                </p>
                <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isExpanded ? 'md:max-h-screen xs:max-h-fit' : 'max-h-0'}`}
                >
                    <p className="mt-2 text-left mb-8 text-base">
                        Наши профессиональные диетологи специализируются на составлении меню для легкого похудения. Наши
                        повара разрабатывают балансированные рационы с учетом калорийности каждого блюда. Выбирайте
                        специальные наборы, предназначенные для достижения ваших целей в сжатые сроки: детокс, набор
                        мышечной массы, похудение либо поддержание спортивной формы.
                    </p>

                    <p className="mt-2 text-left mb-8 text-base">
                        Заказывать у нас – легко и удобно. Просто посетите наш сайт, выберите интересующие вас блюда,
                        укажите желаемые ккал и оформите заказ в несколько кликов. Вы можете заменить любое блюдо в
                        заказе, и ккал автоматически пересчитаются. Доставляем заказы готового питания по городу в
                        пределах МКАД с бесплатной доставкой. У вас есть возможность выбора удобного интервала в
                        пределах 2 часов, а мы доставим заказ по адресу в удобных контейнерах. Оплатить заказ вы можете
                        как по карте, так и наличными курьеру при получении.
                    </p>

                    <p className="mt-2 text-left mb-8 text-base">
                        Наша команда уверена в качестве предлагаемых блюд и предельно внимательно следит за тем, чтобы
                        каждый заказанный у нас обед или ужин соответствовал вашим ожиданиям. Не упустите возможность
                        наслаждаться вкусной и здоровой пищей, оформляйте заказ с бесплатной доставкой у нас на сайте
                        уже сегодня!
                    </p>

                    <p className="mt-2 text-left mb-8 text-base">
                        Каждый заказ – это не только свежий завтрак, обед и ужин, но также полдник и второй завтрак,
                        которые вы получаете ежедневно. Заказать ПП блюда от Бифит легко! Выбирайте вариант рациона и
                        оформляйте заявку онлайн! Мы доставляем правильную еду по всей Москве и в ряде городов
                        Московской области, включая Красногорск, Химки, Долгопрудный, Мытищи, Пушкино, Ивантеевку,
                        Королев, Щелково, Балашиху, Реутов, Люберцы, Видное, Коммунарку и Одинцово.
                    </p>
                </div>
                <div className='xs:text-center'>
                    <Button onClick={toggleText} content={isExpanded ? 'Скрыть' : 'Показать далее'} color={'#7ECA1D'}
                            borderColor={'#7ECA1D'}/>
                </div>
            </div>
        </>
    );
};

export default Delivery;