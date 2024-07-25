import React from 'react';
import OrderForm from "./OrderForm.jsx";

const OrderContainer = ({program, programImg, color}) => {
    return (
        <div className='bg'>
            <div className='w-full max-w-5xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10'>
                <div className='flex flex-row justify-around items-center rounded-lg'
                     style={{backgroundColor: `${color}`}}
                >
                    <div>
                        <h2 className='uppercase text-white font-bold text-4xl'>Заказать {program?.attributes?.program_name}</h2>
                    </div>
                    <div>
                        <img className='w-64 h-auto'
                             src={import.meta.env.VITE_UPLOAD_URL + programImg?.data?.attributes?.url}
                             alt={programImg?.data?.attributes?.name}
                        />
                    </div>
                </div>
                <OrderForm program={program} color={color}/>
            </div>
        </div>
    );
};

export default OrderContainer;