import React from 'react';
import {Parallax} from 'react-parallax';
import {FaRegThumbsUp} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const WhyAsalodaFood = () => {
    const {t} = useTranslation();


    return (
        <div className='w-full max-w-7xl mx-auto md:mt-32 md:mb-32 xs:mt-10 p-3'>
            <h2 className="md:text-4xl font-bold mb-12 md:text-left">
                {t("why_choose_AsalodaFood")}
            </h2>
            <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-center gap-8">
                <div className="w-full">
                    <Parallax
                        bgImage="/why_asaloda_food.jpg"
                        strength={800}
                        bgImageStyle={{objectFit: 'cover', height: '100%', width: '100%'}}
                    >
                        <div className="parallax-content"></div>
                    </Parallax>
                </div>
                <div className="w-full md:w-2/3 p-4">
                    <div className="mb-6 flex flex-col gap-3">
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("fresh_healthy_products")}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("cook_without_preservatives")}
                        </p>
                        <p className="text-gray-700 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("maintain_balance_proteins")}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("preparation_on_day_order")}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("work_with_trusted_suppliers")}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("quality_control_at_all_stages")}
                        </p>
                        <p className="text-gray-700 mb-2 flex items-center text-left xs:text-sm md:text-lg">
                            <FaRegThumbsUp className='text-1xl text-[var(--green)] mr-5'/>
                            {t("care_about_the_environment")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyAsalodaFood;
