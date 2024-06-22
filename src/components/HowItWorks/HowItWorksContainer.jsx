import React from 'react';
import HealthyFood from "../HealthyFoodContainer/HealthyFood.jsx";
import HowItWorks from "./HowItWorks.jsx";

const HowItWorksContainer = () => {
    return (
        <div
            className='w-full max-w-7xl mx-auto mt-10 mb-10 flex flex-col md:flex-row items-stretch justify-between gap-10 px-4'
        >
            <HowItWorks img={'/rules-icon.svg'} title={'Выберите тариф'}
                         description={'Мы составляем меню каждую неделю, считаем БЖУ, выбираем только свежие продукты'}
                         isButtonShow={false}
            />
            <HowItWorks img={'/shopping-bag-option-icon.svg'} title={'Получите продукты'}
                         description={'Регулярная курьерская доставка ПП наборов готовой еды'}
                         isButtonShow={false}
            />
            <HowItWorks img={'/winning-cup-icon.svg'} title={'Вы питаетесь правильно!'}
                         description={'Каждый день без лишних усилий, потери времени на кухне и в магазине за покупкой продуктов'}
                         isButtonShow={false}
            />
        </div>
    );
};

export default HowItWorksContainer;