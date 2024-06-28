import React from 'react';
import './style.css';
import {FaRegCircle} from "react-icons/fa";

const Payment = () => {
    return (
        <div className='md:mb-20 xs:mb-10'>
            <h2 className="text-4xl font-bold mb-10 text-left">
                Способы оплаты
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-center">
                <div className="relative md:w-1/2 w-full">
                    <img src='/payment-banner.jpg' alt="banner" className="w-full"/>
                </div>
                <div className="md:w-1/2 w-full md:pl-10 mt-5 md:mt-0">
                    <div className="gradient-border-wrapper">
                        <div className="p-3 gradient-border">
                            <p className="text-lg">
                                Если данные способы оплаты по какой-либо причине вам неудобны — обратитесь к оператору
                                по
                                телефону +7 (499) 110-12-15 или
                                <a href="https://wa.me/74991101215" className="text-green-500"> WhatsApp</a>, мы
                                подберем
                                тот способ оплаты, чтобы вам было максимально удобно пользоваться нашим сервисом.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <h2 className='text-left text-2xl mt-10 font-semibold'>Оплата картой</h2>
                <div className='flex flex-row justify-start items-center mt-8 mb-8'>
                    <FaRegCircle className='text-[var(--green)] mr-3 size-4'/>
                    <p>Банковские карты Visa или Mastercard</p>
                </div>
                <p className='text-base	text-left pl-8'>
                    Оплата картой на сайте происходит через платежный шлюз АО «Тинькофф банк» , передача информации
                    осуществляется в защищенном режиме с использованием протокола шифрования.
                    После оплаты картой на сайте, заказ автоматически попадает в систему, после чего оператор
                    связывается с вами для подтверждения и уточнения контактной информации.
                </p>
                <div className='flex flex-row justify-start items-center mt-8 mb-8'>
                    <FaRegCircle className='text-[var(--green)] mr-3 size-4'/>
                    <p>Карта Халва</p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
