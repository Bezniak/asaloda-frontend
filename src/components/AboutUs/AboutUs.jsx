import React from 'react';
import {LuClock2} from "react-icons/lu";
import {IoNutritionOutline} from "react-icons/io5";
import {FaSuitcase} from "react-icons/fa";
import {TbTargetArrow} from "react-icons/tb";

const AboutUs = ({data, info, aboutUsInfo}) => {
    return (
        <div className="w-full max-w-7xl mx-auto mt-10 mb-20 px-4">
            <h2 className='text-4xl font-extrabold text-left mb-10'>О компании</h2>
            <div className='flex md:flex-row xs:flex-col gap-10'>
                <div>
                    <img src="/aboutCompany.jpg" alt="aboutCompany" className='rounded-3xl'/>
                </div>
                <div className='text-base text-justify flex flex-col gap-10'>
                    <p className='text-justify'>
                        Компания BeFit занимается производством и доставкой здорового, сбалансированного питания,
                        приготовленного на основе только натуральных и полезных продуктов.
                    </p>
                    <p className='text-justify'>
                        Ежедневно мы помогаем сотням людей сэкономить время и силы на пути к здоровому образу жизни,
                        систематичному питанию и отличному самочувствию, ведь мы производим и доставляем уже готовые
                        рационы на целый день, полностью сбалансированные по количеству БЖУ и ккал.
                    </p>
                    <p className='text-justify'>
                        Питаться с нами не только полезно, но и очень вкусно. В нашем арсенале более 800 различных блюд,
                        одобренных диетологом и проработанных командой поваров, во главе с нашим шеф-поваром.
                    </p>
                    <p className='text-justify'>
                        И мы постоянно добавляем новые!
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10 mt-20 mb-20">
                {aboutUsInfo.map((item) => (
                    <div key={item.id}
                         className="flex flex-col items-center p-6 w-96 h-80 bg-white border-2 border-[var(--green)] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                        <div className="flex justify-center items-center rounded-full p-4 mb-4">
                            <img src={item.img} alt="icon" className="w-16 h-16"/>
                        </div>
                        <p className="text-center text-gray-700 font-medium">{item.text}</p>
                    </div>
                ))}
            </div>
            <div className='flex md:flex-row xs:flex-col gap-20 mt-20 mb-20'>
                <div className='flex flex-col gap-10 text-base flex-1'>
                    <p className='text-justify'>Все продукты проходят тщательный отбор и строгий контроль качества. Мы
                        закупаем продукцию только
                        у проверенных поставщиков, подтвержденную сертификатом качества.
                    </p>
                    <p className='text-justify'>
                        Процесс приготовления рационов происходит непосредственно перед доставкой, поэтому мы не
                        используем консервантов или другой химии, которая позволяет готовой еде храниться длительный
                        срок.
                    </p>
                </div>
                <div className='flex flex-col gap-10 text-base flex-1'>
                    <p className='text-justify'>
                        Мы используем технологию Smart Frost, т.е. делаем заготовки овощей и мяса, готовим салаты и
                        молочные блюда в охлажденном до 8 градусов помещении, где поддерживается постоянная температура.
                        Эта технология позволяет сохранить максимум полезности и витаминов.
                    </p>
                    <p className='text-justify'>
                        После приготовления, блюда охлаждаются, упаковываются в герметичные контейнеры и сразу же
                        поступают в отдел логистики, где курьеры получают готовые оптимизированные маршруты. Это
                        позволяет нам соблюдать заявленный интервал доставки в 1 час в 95% доставок. Мы стараемся
                        улучшить эту цифру!
                    </p>
                </div>
            </div>

            <h2 className='text-4xl font-extrabold text-left mb-10'>История создания</h2>
            <div className='flex md:flex-row xs:flex-col gap-10 mb-20'>
                <div className='text-base text-justify flex flex-col gap-10'>
                    <p className='text-justify font-bold'>
                        Как нам удалось создать сервис, где работает более двухсот сотрудников и с каждым годом мы
                        только набираем обороты?
                    </p>
                    <p className='text-justify font-bold'>
                        Как пришла идея сервиса питания, который радует более тысячи людей ежедневно вкусными и
                        правильными рационами с огромным разнообразием блюд?
                    </p>
                    <p className='text-justify font-bold'>
                        Мы решили рассказать Вам немного о том, как нам пришла идея создания сервиса правильного питания
                        «BeFit».
                    </p>
                </div>
                <div className='text-base text-justify flex flex-col gap-10'>
                    <p className='text-justify'>
                        Шёл 2016 год и мы были так загружены интереснейшими проектами, что совсем не оставалось времени
                        на то, чтобы готовить еду самостоятельно. Регулярность нашего питания страдала и мы начали
                        пробовать различные доставки питания в офис и домой. Пицца, пироги, котлеты, салаты - это стало
                        системой питания, но мы никак не могли найти то, что будет нам по душе, что будет вкусно и при
                        этом полезно для организма.
                    </p>
                    <p className='text-justify'>
                        И тут нам пришла в голову гениальная идея 💡 - сервис питания, который предоставлял бы
                        сбалансированную еду на целый день, вкусную, разнообразную и подходящую любому человеку -
                        «Эврика» - подумали мы и начали продумывать план действий.
                    </p>
                    <p className='text-justify'>
                        Благодаря большому опыту в ресторанной индустрии, нам удалось создать по - настоящему уникальный
                        сервис питания «BeFit», который помогает тысячам людей ежедневно наслаждаться вкусным и
                        правильным питанием без лишних забот, при этом экономя своё время для того, что действительно
                        важно.
                    </p>
                </div>
            </div>

            <h2 className="text-4xl font-extrabold text-left mb-5 mt-10">
                Что такое AsalodaFood
            </h2>
            <h2 className="text-xl font-medium text-left mt-4 mb-12">
                Доставка здорового питания
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
                {data.map((item) => (
                    <div key={item.id}
                         className="flex flex-col items-center p-6 w-96 h-80 bg-white border-2 border-[var(--green)] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                        <div className="flex justify-center items-center rounded-full p-4 mb-4">
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
                    <h2 className='text-4xl font-extrabold mb-10'>Преимущества</h2>
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

            <div className='mt-20'>
                <h2 className="text-4xl font-extrabold text-left mb-10">Попробуйте</h2>
                <div className='flex flex-wrap justify-center items-center gap-10'>
                    {info.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center justify-between p-6 w-80 min-h-[28rem] bg-white border-2 border-[var(--green)] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="flex justify-center items-center rounded-full p-4 mb-4">
                                <img src={item.img} alt={item.title} className="w-40 h-auto"/>
                            </div>
                            <h2 className="text-xl font-semibold text-center mb-2">{item.title}</h2>
                            <p className="text-center text-gray-700 font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default AboutUs;
