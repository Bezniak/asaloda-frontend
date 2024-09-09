import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Parallax } from 'react-parallax';

const WhyAsalodaFood = () => {
    return (
        <div className='w-full max-w-7xl mx-auto md:mt-32 md:mb-32'>
            <h2 className="text-5xl font-bold mb-6 md:text-left">Почему AsalodaFood?</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center">
                {/* Параллакс-эффект для изображения */}
                <Parallax bgImage="/circle-food-3.webp" strength={900} className="w-full md:w-1/2 p-4 flex justify-center">
                    <div className="h-80 md:h-auto flex justify-center items-center">
                        <img
                            className="object-cover w-full max-w-md rounded-lg"
                            src="/circle-food-3.webp" alt=""
                        />
                    </div>
                </Parallax>

                <div className="w-full md:w-1/2 p-4">
                    <div className="mb-6">
                        <h5 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-[#7ECA1D] text-white rounded-full p-3 mr-5">
                                <FiCheck />
                            </span>
                            Контроль качества
                        </h5>
                        <p className="text-gray-700 mb-2 flex items-center text-left">
                            — Только проверенные поставщики
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left">
                            — Все продукты подтверждены сертификатом качества
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left">
                            — Не используем консервантов или другой химии
                        </p>
                        <p className="text-gray-700 flex items-center text-left">
                            — Используем натуральный сахарозаменитель
                        </p>
                    </div>

                    <div className="mb-14 mt-14">
                        <h5 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-[#7ECA1D] text-white rounded-full p-3 mr-5">
                                <FiCheck />
                            </span>
                            Технология Smart frost
                        </h5>
                        <p className="text-gray-700 text-left">
                            Делаем заготовки овощей и мяса, готовим салаты и молочные блюда в
                            охлажденном до 8 градусов помещении, где поддерживается постоянная температура. Эта
                            технология позволяет сохранить максимум полезности и витаминов.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-[#7ECA1D] text-white rounded-full p-3 mr-5">
                                <FiCheck />
                            </span>
                            Переработка пластика
                        </h5>
                        <p className="text-gray-700 text-left">
                            Мы заботимся об окружающей среде. Курьер может забрать нашу упаковку на переработку.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyAsalodaFood;
