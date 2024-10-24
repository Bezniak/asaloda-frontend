import React from 'react';
import './style.css';
import {useTranslation} from "react-i18next";

const Payment = () => {
    const {t} = useTranslation();

    return (
        <div className='md:mb-20 xs:mb-10 w-full'>
            <h2 className="md:text-4xl font-bold mb-10 md:text-left xs:text-center">
                {t("payment_methods")}
            </h2>
            <h2 className='md:text-left xs:text-center md:text-2xl mt-10 font-semibold'>
                {t("payment_by_card")}
            </h2>
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 w-full">
                    <p className='text-lg text-left'>
                        {t("payment_by_card_on_website")}
                    </p>
                    <br/>
                    <p className='text-lg text-left'>
                        {t("we_accept_cards")}
                    </p>
                </div>
                <div className="md:w-1/2 w-full md:pl-10 mt-5 md:mt-0">
                    <img src="/card.png" alt="credit-card-different-angles"/>
                </div>
            </div>
        </div>
    );
};

export default Payment;
