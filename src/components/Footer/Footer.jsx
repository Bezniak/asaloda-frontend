import React from 'react';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import dayjs from "dayjs";
import useFetchAllData from "../../api/useFetchAllData.js";
import {animateScroll as scroll} from "react-scroll";

const Footer = () => {
    const currentYear = dayjs().year();
    const {data, loading, error} = useFetchAllData(`/programs?populate=*`);

    const handleClick = () => {
        // Smooth scroll to top using react-scroll
        scroll.scrollToTop({
            duration: 0, // Animation duration in milliseconds
            smooth: 'easeInOutQuad', // Animation type
        });
    };

    return (
        <footer className='bg-[var(--footer-bg)]'>
            <div className="mx-auto w-full max-w-7xl pt-20 pb-10">
                <div className="flex md:flex-row xs:flex-col justify-between">
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">Программы</h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                {data.map((item) => (
                                    <NavLink key={item.id} to={`${ROUTES.PROGRAM.replace(":id", item.id)}`}
                                             className="flex flex-col mb-4"
                                             onClick={handleClick}
                                    >
                                        {item.attributes.program_name}
                                    </NavLink>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-base tracking-wider text-left font-semibold text-white uppercase">
                            Клиентам
                        </h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.DISCOUNTS} onClick={handleClick}>Акции</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.REVIEWS} onClick={handleClick}>Отзывы</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.FAQ} onClick={handleClick}>Вопрос - ответ</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PAYMENT_DELIVERY} onClick={handleClick}>Оплата и доставка</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-base tracking-wider font-semibold text-white text-left uppercase">О нас</h2>
                        <ul className="text-gray-400 text-lg">
                            <li className="mb-4">
                                <NavLink to={ROUTES.ABOUTUS} onClick={handleClick}>О нас</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.CONTACTS} onClick={handleClick}>Контакты</NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to={ROUTES.PRIVACY_POLICY} onClick={handleClick}>Политика
                                    конфиденциальности</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-400">
                        © {currentYear}, AsalodaFood, все права защищены.
                    </div>
                    <div className="text-sm text-gray-400 mt-5">Developed by &nbsp;
                        <a href='https://www.linkedin.com/in/ivan-bezniak-2634a11a0/' target='_blank'>Ivan Bezniak</a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;