import React, {useState} from 'react';
import {MdCircle} from "react-icons/md";
import Map from "./Map.jsx";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";

const Delivery = () => {
    const {t} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>
            <div className='flex md:flex-row xs:flex-col'>
                <div className='flex-1 md:pr-20'>
                    <h2 className='md:text-4xl font-bold mb-10 md:text-left xs:text-center'>
                        {t("delivery")}
                    </h2>
                    <p className='text-left mt-10 mb-10 text-gray-400 text-base'>
                        {t("healthy_food_delivery_in_Grodno")}
                    </p>
                    <div className='flex flex-row justify-start items-center mb-4'>
                        <MdCircle className='fill-[var(--green)] mr-4'/>
                        <p className='text-left font-bold text-base'>
                            {t("free_delivery")}
                        </p>
                    </div>
                    <div className='flex flex-row justify-start items-center'>
                        <MdCircle className='fill-yellow-300 mr-4'/>
                        <p className='text-left font-bold text-base'>
                            {t("payed_delivery")}
                        </p>
                    </div>
                </div>
                <Map/>
            </div>
            <div className='md:mt-20 xs:mt-10'>
                <p className='text-left mb-8 text-base'>
                    {t("asalodaFood_ready_to_offer")}
                    <br/>
                </p>
                <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isExpanded ? 'md:max-h-screen xs:max-h-fit' : 'max-h-0'}`}
                >
                    <p className="mt-2 text-left mb-8 text-base">
                        {t("varied_and_healthy_menu")}
                    </p>

                    <p className="mt-2 text-left mb-8 text-base">
                        {t("professional_AsalodaFood_team")}
                    </p>

                    <p className="mt-2 text-left mb-8 text-base">
                        {t("our_delivery_service")}
                    </p>
                </div>
                <div className='xs:text-center'>
                    <Button onClick={toggleText} content={isExpanded ? t("hide") : t("read_more")} color={'#7ECA1D'}
                            borderColor={'#7ECA1D'}/>
                </div>
            </div>
        </>
    );
};

export default Delivery;