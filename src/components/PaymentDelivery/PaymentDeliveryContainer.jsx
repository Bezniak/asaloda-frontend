import React from 'react';
import Delivery from "./Delivery.jsx";
import Payment from "./Payment.jsx";

const PaymentDeliveryContainer = () => {
    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-10 xs:mb-10 p-3'>
            <Payment/>
            <Delivery/>
        </div>
    );
};

export default PaymentDeliveryContainer;