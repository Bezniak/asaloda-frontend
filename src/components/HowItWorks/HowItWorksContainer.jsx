import React from 'react';
import HowItWorks from "./HowItWorks.jsx";
import {useTranslation} from "react-i18next";

const HowItWorksContainer = () => {
    const {t} = useTranslation();


    return (
        <div className='w-full max-w-7xl mx-auto mt-20 mb-20 p-3'>
            <h2 className="font-bold mb-10 md:text-center xs:text-lg md:text-4xl">
                {t("how_do_we_work")}
            </h2>
            <div
                className='flex flex-col md:flex-row items-stretch justify-between gap-10 px-4'>
                <HowItWorks img={'/rules-icon.svg'}
                            title={t("receive_order")}
                            description={t("you_choose_program")}
                            additionalDesc={t("possible_replace_dishes")}
                            isButtonShow={false}
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
        </div>

    );
};

export default HowItWorksContainer;