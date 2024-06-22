import React from 'react';
import HealthyFood from "./HealthyFood.jsx";

const HealthyFoodContainer = () => {
    return (
        <div>
            <h1 className='text-3xl mt-14 font-medium'>Здоровое питание от AsalodaFood</h1>
            <div
                className='w-full max-w-7xl mx-auto mt-10 mb-10 flex flex-col md:flex-row items-stretch justify-between gap-10 px-4'
            >
                <HealthyFood img={'/icon1.svg'} title={'На здоровье!'}
                             description={'Без консервантов, усилителей вкуса и химии'}
                             additionalInfoClick={'Всегда свежее, качественное и вкусное питание из натуральных продуктов - залог отличного самочувствия и крепкого здоровья.'}
                             modalTitle={'С AsalodaFood быть здоровым просто'}
                             modalDescription={'Всегда свежее, качественное и вкусное питание из натуральных продуктов - залог отличного самочувствия и крепкого здоровья'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'Ешь и худей!'}
                             description={'Придерживайся питания AsalodaFood и сбрасывай от 2 до 5 кг за неделю!'}
                             additionalInfoClick={'Придерживайся питания BeFit и сбрасывай от 2 до 5 кг за неделю!'}
                             modalTitle={'Ешь и худей!'}
                             modalDescription={'Придерживайся питания AsalodaFood и сбрасывай от 2 до 5 кг за неделю!'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'+14 часов свободы от кухни, магазинов и мыслей о еде'}
                             description={'Доверь заботу о своем питании профессионалам'}
                             additionalInfoClick={'Освободи время для по-настоящему важных дел, а заботу о питании возьмет на себя AsalodaFood'}
                             modalTitle={'Экономь 2 часа ежедневно на походе в магазин, готовке и мытье посуды.'}
                             modalDescription={'Освободи время для по-настоящему важных дел, а заботу о питании возьмет на себя BeFit.'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'Здоровое питание с заботой об экологии.'}
                             description={'Наши курьеры принимают использованные контейнеры в переработку'}
                             additionalInfoClick={'Поэтому Все наши клиенты могут передать использованные, предварительно очищенные от остатков пищи, контейнеры нашему курьеру, а он передаст их в переработку'}
                             modalTitle={'Нам на самом деле не все равно, куда девается пластик из-под наших рационов.'}
                             modalDescription={'Поэтому Все наши клиенты могут передать использованные, предварительно очищенные от остатков пищи, контейнеры нашему курьеру, а он передаст их в переработку.'}
                             isButtonShow={true}
                />
            </div>
        </div>
    );
};

export default HealthyFoodContainer;
