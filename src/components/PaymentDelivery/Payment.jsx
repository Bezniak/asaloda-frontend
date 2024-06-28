import React from 'react';
import './style.css';

const Payment = () => {
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-5xl font-bold mb-10 text-left">
                Способы оплаты
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-center">
                <div className="relative md:w-1/2 w-full">
                    <img src='/payment-banner.jpg' alt="banner" className="w-full"/>
                </div>
                <div className="md:w-1/2 w-full md:pl-10 mt-5 md:mt-0">
                    <div className="p-5 bg-white gradient-border">
                        <p className="text-lg">
                            Если данные способы оплаты по какой-либо причине вам неудобны — обратитесь к оператору по
                            телефону +7 (499) 110-12-15 или
                            <a href="https://wa.me/74991101215" className="text-green-500"> WhatsApp</a>, мы подберем
                            тот способ оплаты, чтобы вам было максимально удобно пользоваться нашим сервисом.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h2>Оплата картой</h2>
            </div>
        </div>
    );
};

export default Payment;
