import React from 'react';
import {Parallax} from 'react-parallax';
import {TiTickOutline} from "react-icons/ti";
import {useTranslation} from "react-i18next";

const Ration = ({scrollToProgram}) => {
    const {t} = useTranslation();


    return (
        <Parallax
            bgImage="/fruts.jpg"
            strength={800}
            className="parallax-slide"
        >
            <div className="max-w-7xl h-90vh mx-auto flex flex-col justify-center p-3">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">
                    <div className="relative flex flex-col justify-center items-start">
                        <h5 className="font-bold text-white mb-4 xs:text-base md:text-4xl">
                            {t("set_up_nutrition_program")}
                        </h5>
                        <p className="text-white text-left mt-5 mb-4 xs:text-base md:text-2xl">
                            {t("you_can")}
                        </p>
                        <ul className="flex flex-col md:gap-5 xs:pag-2">
                            <li className='flex items-center gap-3'>
                                <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                <span className="text-white xs:text-base md:text-2xl">
                                    {t("replace_dishes_as_desired")}
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                <span
                                    className="text-white xs:text-base md:text-2xl">
                                    {t("include_exclude_weekends")}
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                <span className="text-white xs:text-base md:text-2xl">
                                    {t("choose_delivery_time")}
                                </span>
                            </li>
                        </ul>
                        <button
                            className="mt-10 text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10"
                            onClick={scrollToProgram}
                        >
                            {t("choose_program")}
                        </button>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Ration;
