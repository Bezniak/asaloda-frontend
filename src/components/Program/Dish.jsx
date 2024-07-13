import React from 'react';

const Dish = ({dish}) => {

    console.log('dish', dish)



    return (
        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg"
                 src={import.meta.env.VITE_UPLOAD_URL + dish?.attributes?.main_img?.data?.attributes?.url}
                 alt={dish?.attributes?.main_img?.data?.attributes?.name}
            />
            <div className="p-5">
                <h2 className="mb-2 text-1xl font-medium tracking-tight">
                    {dish?.attributes?.dish_name}
                </h2>
                <div className='mt-5 flex justify-between items-center'>
                    <p className="text-base text-gray-700 text-left">
                        {dish?.attributes?.eating_type}
                    </p>
                    <button className='border-0 text-base text-[var(--oringe)]'>
                        Заменить
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Dish;