import React from 'react';
import HealthyFood from "./HealthyFood.jsx";
import {useTranslation} from "react-i18next";
import {PiCarrotBold} from "react-icons/pi";
import {GiBeet, GiCorn} from "react-icons/gi";

const HealthyFoodContainer = () => {
    const {t} = useTranslation();


    return (
        <div className='mt-20 mb-10 w-full max-w-7xl mx-auto p-3'>
            <h1 className='font-bold mb-10 md:text-center xs:text-base md:text-4xl'>
                {t("eat_right_with_AsalodaFood")}
            </h1>
            <div
                className='flex lg:flex-row md:flex-col xs:flex-col items-stretch justify-between gap-10 px-4'
            >
                <HealthyFood title={t("taking_care_of_your_health")}
                             description={t("we_cook_from_fresh_quality_products")}
                             modalTitle={t("being_healthy_easy")}
                             modalDescription={t("we_offer_balanced_delicious_meals")}
                             isButtonShow={true}
                             svg={PiCarrotBold}
                />
                <HealthyFood title={t("save_time")}
                             description={t("take_time_for_yourself")}
                             modalTitle={t("save_time")}
                             modalDescription={t("enjoy_life_without_thinking")}
                             isButtonShow={true}
                             svg={GiCorn}
                />
                <HealthyFood title={t("achieve_your_goals")}
                             description={t("eating_plans_help_you")}
                             modalTitle={t("achieve_your_goals")}
                             modalDescription={t("lose_weight_stay_fit")}
                             isButtonShow={true}
                             svg={GiBeet}
                />
            </div>
        </div>
    );
};

export default HealthyFoodContainer;
