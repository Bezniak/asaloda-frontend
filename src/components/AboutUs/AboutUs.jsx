import React from 'react';
import {FaRegThumbsUp} from "react-icons/fa";
import HowItWorks from "../HowItWorks/HowItWorks.jsx";
import {useTranslation} from "react-i18next";
import MetaTags from "../../utils/MetaTags.jsx";

const AboutUs = () => {
    const {t} = useTranslation();

    const advantages = [
        "produce_supply_healthy_nutrition",
        "save_your_time",
        "monitor_quality",
        "use_best_products"
    ];

    return (
        <>
            <MetaTags page="aboutUs"/>
            <div className="w-full max-w-7xl mx-auto mt-10 mb-20 px-3">
                <h2 className='md:text-4xl font-extrabold text-left mb-10'>
                    {t("aboutCompany")}
                </h2>
                <div className='flex lg:flex-row xs:flex-col gap-10 md:items-center'>
                    <div className='flex-1 flex justify-center items-center'>
                        <img src="/logoWhite.svg" alt="aboutCompany" className='w-3/5'/>
                    </div>
                    <div className='flex-1 text-base text-justify flex flex-col gap-5'>
                        <p>{t("company_producing_delivering_food")}</p>
                        <p>{t("professional_team_employees_works")}</p>
                        <p>{t("carefully_develop_recipe")}</p>
                        <p>{t("try_diets_from_AsalodaFood")}</p>
                    </div>
                </div>
                <h2 className='md:text-4xl font-extrabold text-left mt-20 mb-10'>
                    {t("our_goal")}
                </h2>
                <div className='flex lg:flex-row xs:flex-col gap-10 md:items-center'>
                    <div className='flex-1 text-base text-justify flex flex-col gap-5'>
                        <p>{t("asalodaFood_created_inspire")}</p>
                        <p>{t("we_strive_to_make_accessible")}</p>
                        <p>{t("aim_to_be_nutritional_assistant")}</p>
                        <p>{t("start_changing_yourself")}</p>
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
                        <ul className='flex flex-col gap-6'>
                            {advantages.map((advantage, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        minHeight: '50px',
                                        padding: '8px 0'
                                    }}
                                >
                                    <FaRegThumbsUp
                                        style={{
                                            fontSize: '24px',
                                            color: 'var(--green)',
                                            marginRight: '16px',
                                            minWidth: '24px',
                                            textAlign: 'center'
                                        }}
                                    />
                                    <span style={{
                                        fontSize: '16px',
                                        color: 'gray',
                                        lineHeight: '1.5',
                                        flex: '1',
                                        textAlign: 'left'
                                    }}>
                                    {t(advantage)}
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
