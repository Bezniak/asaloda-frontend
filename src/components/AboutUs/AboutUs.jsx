import React from 'react';
import {FaRegThumbsUp} from "react-icons/fa";
import HowItWorks from "../HowItWorks/HowItWorks.jsx";
import {useTranslation} from "react-i18next";

const AboutUs = () => {
    const {t} = useTranslation();

    return (
        <div className="w-full max-w-7xl mx-auto mt-10 mb-20 px-3">
            <h2 className='md:text-4xl font-extrabold text-left mb-10'>
                {t("aboutCompany")}
            </h2>
            <div className='flex lg:flex-row xs:flex-col gap-10 md:items-center'>
                <div className='flex-1 flex justify-center items-center'>
                    <img src="/logoWhite.svg" alt="aboutCompany" className='w-3/5'/>
                </div>
                <div className='flex-1 text-base text-justify flex flex-col gap-5'>
                    <p className='text-justify'>
                        {t("company_producing_delivering_food")}
                    </p>
                    <p className='text-justify'>
                        {t("professional_team_employees_works")}
                    </p>
                    <p className='text-justify'>
                        {t("carefully_develop_recipe")}
                    </p>
                    <p className='text-justify'>
                        {t("try_diets_from_AsalodaFood")}
                    </p>
                </div>
            </div>
            <h2 className='md:text-4xl font-extrabold text-left mt-20 mb-10'>
                {t("our_goal")}
            </h2>
            <div className='flex lg:flex-row xs:flex-col gap-10 md:items-center'>
                <div className='flex-1 text-base text-justify flex flex-col gap-5'>
                    <p className='text-justify'>
                        {t("asalodaFood_created_inspire")}
                    </p>
                    <p className='text-justify'>
                        {t("we_strive_to_make_accessible")}
                    </p>
                    <p className='text-justify'>
                        {t("aim_to_be_nutritional_assistant")}
                    </p>
                    <p className='text-justify'>
                        {t("start_changing_yourself")}
                    </p>
                </div>
                <div className='flex-1'>
                    <img src="/aboutCompany.jpg" alt="aboutCompany" className='rounded-3xl'/>
                </div>
            </div>
            <h2 className="md:text-4xl font-extrabold text-left mt-20 mb-10">
                {t("how_asalodaFood_works")}
            </h2>
            <div className='flex gap-10 xs:flex-wrap md:flex-nowrap'>
                <HowItWorks img={'/rules-icon.svg'}
                            title={t("receive_order")}
                            description={t("choose_the_program")}
                            isButtonShow={false}
                            additionalDesc={t("possible_replace_dishes")}
                />
                <HowItWorks img={'/shopping-bag-option-icon.svg'}
                            title={t("delivery")}
                            description={t("couriers_deliver")}
                            isButtonShow={false}
                />
                <HowItWorks img={'/winning-cup-icon.svg'}
                            title={t("moving_towards_goal")}
                            description={t("diets_help_achieve_desired_results")}
                            isButtonShow={false}
                />
            </div>
            <div className='mt-32 flex lg:flex-row xs:flex-col justify-center items-center gap-10 mb-10'>
                <div className='w-4/5'>
                    <img className='object-cover rounded-3xl' src='/aboutUs.jpg' alt="picture AsalodaFood"/>
                </div>
                <div>
                    <h2 className='md:text-4xl font-extrabold mb-10'>
                        {t("our_advantages")}
                    </h2>
                    <ul className='flex flex-col gap-10'>
                        <li className='flex justify-start items-center gap-3'>
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("produce_supply_healthy_nutrition")}
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("save_your_time")}
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("monitor_quality")}
                        </li>
                        <li className='flex justify-start items-center gap-3'>
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("use_best_products")}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
