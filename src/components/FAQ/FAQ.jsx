import React from 'react';
import classNames from "classnames";
import styles from "../ChooseProgram/ProgramSelector.module.css";
import {CiApple} from "react-icons/ci";
import {GiWallet} from "react-icons/gi";
import {VscPackage} from "react-icons/vsc";
import {PiCookingPot} from "react-icons/pi";
import {BsJournalBookmarkFill} from "react-icons/bs";

const Faq = ({handleProgramClick}) => {
    return (
        <div>
            <div className="mt-14 flex flex-wrap gap-5 justify-center items-center">
                <button onClick={() => handleProgramClick('diet_nutrition')}
                        className={classNames('w-48 h-48 rounded bg-lightGreen hover:bg-customGreen p-3 transition flex flex-col justify-around group', styles.button)}
                >
                    <CiApple
                        className='text-6xl text-customGreen transition-colors duration-200 group-hover:text-white'/>
                    <p className='mt-10 text-customGreen font-extrabold transition-colors duration-200 text-base text-left group-hover:text-white'>
                        Диета и питание
                    </p>
                </button>


                <button onClick={() => handleProgramClick('diet_nutrition')}
                        className={classNames('w-48 h-48 rounded bg-lightGreen hover:bg-customGreen p-3 transition flex flex-col justify-around group', styles.button)}
                >
                    <GiWallet
                        className='text-6xl text-customGreen transition-colors duration-200 group-hover:text-white'/>
                    <p className='mt-10 text-customGreen font-extrabold transition-colors duration-200 text-base text-left group-hover:text-white'>
                        Заказ и оплата
                    </p>
                </button>


                <button onClick={() => handleProgramClick('diet_nutrition')}
                        className={classNames('w-48 h-48 rounded bg-lightGreen hover:bg-customGreen p-3 transition flex flex-col justify-around group', styles.button)}
                >
                    <VscPackage
                        className='text-6xl text-customGreen transition-colors duration-200 group-hover:text-white'/>
                    <p className='mt-10 text-customGreen font-extrabold transition-colors duration-200 text-base text-left group-hover:text-white'>
                        Доставка
                    </p>
                </button>

                <button onClick={() => handleProgramClick('diet_nutrition')}
                        className={classNames('w-48 h-48 rounded bg-lightGreen hover:bg-customGreen p-3 transition flex flex-col justify-around group', styles.button)}
                >
                    <PiCookingPot
                        className='text-6xl text-customGreen transition-colors duration-200 group-hover:text-white'/>
                    <p className='mt-10 text-customGreen font-extrabold transition-colors duration-200 text-base text-left group-hover:text-white'>
                        Приготовление
                    </p>
                </button>

                <button onClick={() => handleProgramClick('diet_nutrition')}
                        className={classNames('w-48 h-48 rounded bg-lightGreen hover:bg-customGreen p-3 transition flex flex-col justify-around group', styles.button)}
                >
                    <BsJournalBookmarkFill
                        className='text-6xl text-customGreen transition-colors duration-200 group-hover:text-white'/>
                    <p className='mt-10 text-customGreen font-extrabold transition-colors duration-200 text-base text-left group-hover:text-white'>
                        Подписка
                    </p>
                </button>

            </div>
        </div>
    );
};

export default Faq;