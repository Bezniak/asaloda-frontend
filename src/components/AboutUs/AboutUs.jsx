import React from 'react';
import {LuClock2} from "react-icons/lu";
import {IoNutritionOutline} from "react-icons/io5";
import {FaSuitcase} from "react-icons/fa";
import {TbTargetArrow} from "react-icons/tb";

const AboutUs = ({data}) => {
    return (
        <div className="w-full max-w-7xl mx-auto mt-10 mb-20 px-4">
            <h1 className="text-4xl font-extrabold text-left">
                Что такое AsalodaFood
            </h1>
            <h2 className="text-xl font-medium text-left mt-4 mb-12">
                Доставка здорового питания
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
                {data.map((item) => (
                    <div key={item.id}
                         className="flex flex-col items-center p-6 w-96 h-80 bg-white border-2 border-green-500 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                        <div className="flex justify-center items-center bg-green-100 rounded-full p-4 mb-4">
                            <img src={item.img} alt="icon" className="w-16 h-16"/>
                        </div>
                        <p className="text-center text-gray-700 font-medium">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className='mt-32 flex md:flex-row xs:flex-col justify-center items-center gap-10'>
                <div className='w-4/5'>
                    <img className='object-cover' src='/aboutUs.jpg' alt="картинка AsalodaFood"/>
                </div>
                <div>
                    <h2 className='text-3xl font-bold mb-10'>Преимущества</h2>
                    <ul className='flex flex-col gap-10'>
                        <li className='flex justify-start items-center gap-3'>
                            <LuClock2 className='text-3xl text-[var(--green)]'/>
                            Существенная экономия Вашего времени
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <IoNutritionOutline className='text-3xl text-[var(--green)]'/>
                            Нормализация режима питания
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <FaSuitcase className='text-3xl text-[var(--green)]'/>
                            Удобно брать с собой
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <TbTargetArrow className='text-5xl text-[var(--green)]'/>
                            Быстрое достижение цели в строительстве фигуры, благодаря систематичности в питании
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
