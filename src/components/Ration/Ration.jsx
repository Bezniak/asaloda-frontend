import React from 'react';
import Button from "../Button/Button.jsx";

const Ration = () => {
    return (
        <div
            className="relative w-full pt-28 pb-28 max-w-7xl mx-auto mt-10 mb-10 md:mt-32 md:mb-32 flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#ECFBFF] to-[#F5FFE5] rounded-lg shadow-lg p-6">
            <img
                src="/containerFood.jpg"
                alt="meal"
                className="object-contain max-w-full max-h-96 md:max-h-auto rounded-lg w-full md:w-auto"
            />
            <div className="flex flex-col justify-center items-center md:ml-16 p-4 md:pl-20">
                <h5 className="text-3xl font-bold text-gray-900 mb-4">
                    Настройте свой рацион
                </h5>
                <p className="text-gray-700 mb-6 text-base">
                    Вы можете исключить любой ингредиент, блюдо или тип блюда по желанию. Укажите удобное время для
                    доставки готовых рационов правильного питания: по утрам или вечером.
                </p>
                <Button content={'Выбрать программу'} bgColor={'#7ECA1D'} color={'white'}/>
            </div>
            <div
                className="absolute top-4 right-4 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-lg p-4 text-center">
                <span className="text-yellow-500 text-2xl mb-2">😋</span>
                <p className="text-xs font-semibold text-gray-700">Вот так выглядит наш набор готового питания на
                    сутки</p>
            </div>
        </div>


    );
};

export default Ration;
