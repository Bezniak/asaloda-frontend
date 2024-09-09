import React from 'react';
import {Parallax} from 'react-parallax';

const Ration = ({scrollToProgram}) => {
    return (
        <Parallax
            bgImage="/containerFood.jpg" // Изменённый фон
            strength={800} // Обновлённая сила параллакса
            className="parallax-slide"
        >
            <div className="max-w-7xl h-90vh mx-auto flex flex-col justify-center">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">
                    <div className="relative flex flex-col justify-center items-center md:ml-16 p-4 md:pl-20">
                        <h5 className="text-4xl font-bold text-white mb-4">
                            Настройте свой рацион
                        </h5>
                        <p className="text-white mb-6 text-base">
                            Вы можете исключить любой ингредиент, блюдо или тип блюда по желанию. Укажите удобное время
                            для
                            доставки готовых рационов правильного питания: по утрам или вечером.
                        </p>
                        <button
                            className="mt-10 text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10"
                            onClick={scrollToProgram}
                        >
                            Выбрать программу
                        </button>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Ration;
