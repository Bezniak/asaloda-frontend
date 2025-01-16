import React, {useState} from 'react';
import './style.css';
import {useTranslation} from "react-i18next";
import Button from "../Button/Button.jsx";

const Payment = () => {
    const {t} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };



    return (
        <div className='md:mb-20 xs:mb-10 w-full'>
            <h2 className="md:text-4xl font-bold mb-10 md:text-left xs:text-center">
                {t("payment_methods")}
            </h2>
            <h2 className='md:text-left xs:text-center md:text-2xl mt-10 font-semibold'>
                {t("payment_by_card")}
            </h2>
            <div className="">
                <div className="w-full ">
                    <p className='text-lg text-left mb-8'>
                        {t("payment_by_card_on_website")} {' '}
                        <a href="https://www.webpay.by" target="_blank" rel="noopener noreferrer" className='underline'>
                            {t("«WebPay»")}.
                        </a>
                        {" "}
                        {t("we_accept_cards")}
                    </p>
                    <div className="md:w-1/2 mx-auto w-full mb-8">
                        <img src="/line-color.png" alt="credit-card-different-angles"/>
                    </div>
                    <div
                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isExpanded ? 'md:max-h-screen xs:max-h-fit' : 'max-h-0'}`}
                    >
                        <p className='text-xs text-left mb-8 xs:text-justify'>
                            {t("text_webpay")}
                        </p>
                        <div className='flex flex-col items-start md:w-2/4 xs:w-full xs:mb-8'>
                            <h2 className='md:text-left xs:text-center md:text-2xl mb-4 font-semibold'>
                                {t("sample_receipt")}
                            </h2>
                            <img src="/check.jpg" alt="check" className='block'/>
                        </div>
                    </div>
                    <div className='xs:text-center md:mt-10'>
                        <Button onClick={toggleText} content={isExpanded ? t("hide") : t("read_more")} color={'#7ECA1D'}
                                borderColor={'#7ECA1D'}/>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Payment;
