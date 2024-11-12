import React, {useState} from 'react';
import classNames from "classnames";
import {PiCookingPot} from "react-icons/pi";
import {BsJournalBookmarkFill} from "react-icons/bs";
import {FaBowlFood} from "react-icons/fa6";
import {GrMoney} from "react-icons/gr";
import {useTranslation} from "react-i18next";

const Faq = ({handleProgramClick}) => {
    const {t} = useTranslation();
    const [activeQuestion, setActiveQuestion] = useState(''); // Состояние для активной кнопки

    const handleClick = (question) => {
        if (activeQuestion === question) {
            // Если та же кнопка нажата повторно, сбрасываем выбор
            setActiveQuestion('');
        } else {
            setActiveQuestion(question); // Обновляем активный вопрос
            handleProgramClick(question); // Вызываем переданный callback
        }
    };

    return (
        <div className='mb-10'>
            <div className="w-fit mx-auto mt-14 grid md:grid-cols-2 xs:grid-cols-2 gap-x-12 gap-y-12">
                <button
                    onClick={() => handleClick('diet_nutrition')}
                    className={classNames(
                        'md:w-56 md:h-56 xs:w-36 xs:h-36 rounded bg-lightGreen p-3 transition flex flex-col justify-around group',
                        activeQuestion === 'diet_nutrition'
                            ? 'bg-customGreen text-white'
                            : 'hover:bg-customGreen hover:text-white'
                    )}
                >
                    <FaBowlFood className={classNames(
                        'md:text-6xl xs:text-4xl transition-colors duration-200',
                        activeQuestion === 'diet_nutrition' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}/>
                    <p className={classNames(
                        'mt-10 font-extrabold transition-colors duration-200 md:text-base xs:text-sm text-left',
                        activeQuestion === 'diet_nutrition' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}>
                        {t("general_questions")}
                    </p>
                </button>

                <button
                    onClick={() => handleClick('order_payment')}
                    className={classNames(
                        'md:w-56 md:h-56 xs:w-36 xs:h-36 rounded bg-lightGreen p-3 transition flex flex-col justify-around group',
                        activeQuestion === 'order_payment'
                            ? 'bg-customGreen text-white'
                            : 'hover:bg-customGreen hover:text-white'
                    )}
                >
                    <GrMoney className={classNames(
                        'md:text-6xl xs:text-4xl transition-colors duration-200',
                        activeQuestion === 'order_payment' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}/>
                    <p className={classNames(
                        'mt-10 font-extrabold transition-colors duration-200 md:text-base xs:text-sm text-left',
                        activeQuestion === 'order_payment' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}>
                        {t("order_payment_delivery")}
                    </p>
                </button>

                <button
                    onClick={() => handleClick('cooking')}
                    className={classNames(
                        'md:w-56 md:h-56 xs:w-36 xs:h-36 rounded bg-lightGreen p-3 transition flex flex-col justify-around group',
                        activeQuestion === 'cooking'
                            ? 'bg-customGreen text-white'
                            : 'hover:bg-customGreen hover:text-white'
                    )}
                >
                    <PiCookingPot className={classNames(
                        'md:text-6xl xs:text-4xl transition-colors duration-200',
                        activeQuestion === 'cooking' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}/>
                    <p className={classNames(
                        'mt-10 font-extrabold transition-colors duration-200 md:text-base xs:text-sm text-left',
                        activeQuestion === 'cooking' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}>
                        {t("cooking_dish")}
                    </p>
                </button>

                <button
                    onClick={() => handleClick('subscription')}
                    className={classNames(
                        'md:w-56 md:h-56 xs:w-36 xs:h-36 rounded bg-lightGreen p-3 transition flex flex-col justify-around group',
                        activeQuestion === 'subscription'
                            ? 'bg-customGreen text-white'
                            : 'hover:bg-customGreen hover:text-white'
                    )}
                >
                    <BsJournalBookmarkFill className={classNames(
                        'md:text-6xl xs:text-4xl transition-colors duration-200',
                        activeQuestion === 'subscription' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}/>
                    <p className={classNames(
                        'mt-10 font-extrabold transition-colors duration-200 md:text-base xs:text-sm text-left',
                        activeQuestion === 'subscription' ? 'text-white' : 'text-customGreen group-hover:text-white'
                    )}>
                        {t("personal_account")}
                    </p>
                </button>
            </div>
        </div>
    );
};

export default Faq;
