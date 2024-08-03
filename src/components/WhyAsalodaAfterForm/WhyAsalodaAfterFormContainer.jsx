import React from 'react';
import HealthyFood from "../HealthyFoodContainer/HealthyFood.jsx";

const WhyAsalodaAfterFormContainer = () => {
    return (
        <div className='mt-20 mb-10 w-full max-w-7xl mx-auto'>
            <h1 className='text-5xl font-bold mb-10 md:text-left'>Здоровое питание от AsalodaFood</h1>
            <div
                className=' flex flex-col md:flex-row items-stretch justify-between gap-10 px-4'
            >
                <HealthyFood img={'/icon1.svg'} title={'Разнообразное меню'}
                             description={'900+ блюд, без трансжиров, сахара и консервантов'}
                             modalTitle={'900+ блюд без сахара, вредных трансжиров, усилителей вкуса и консервантов'}
                             modalDescription={'И мы постоянно добавляем новые. А еще Вы можете голосовать за блюда и влиять на составление рациона'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'Умная доставка'}
                             description={'Доставляем в часовой интервал утром и 2х-часовой вечером'}
                             modalTitle={'Умная доставка'}
                             modalDescription={'В будние дни — с интервалом в 1 час, начиная с 7 ми утра. Если Вам удобно получать доставку днем — мы с удовольствием предложим Вам и такой вариант.\n' +
                                 'Вечерняя доставка осуществляется с 2-х часовым интервалом.'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'Экономия времени'}
                             description={'Избавьтесь от изнурительного мытья посуды и готовки'}
                             modalTitle={'Приготовили и сразу доставляем.'}
                             modalDescription={'Это значит, что все заготовки и упаковку мы осуществляем в помещении, где поддерживается постоянная температура от 5 до 12 градусов, что не позволяет размножаться бактериям'}
                             isButtonShow={true}
                />
                <HealthyFood img={'/icon1.svg'} title={'Расcчитаны КБЖУ'}
                             description={'Рацион сбалансирован, мы уже посчитали КБЖУ за Вас'}
                             modalTitle={'Худей комфортно'}
                             modalDescription={'Мы сбалансировали все рационы по калорийности и оптимальному соотношению белков, жиров и углеводов. Это удобно!'}
                             isButtonShow={true}
                />

            </div>
        </div>
    );
};

export default WhyAsalodaAfterFormContainer;