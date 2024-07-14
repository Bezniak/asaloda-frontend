import React from 'react';

const DishModalWindow = ({dishData, onClose}) => {

    console.log('dishData', dishData)

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black opacity-70"></div>
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg mx-4 max-h-full overflow-hidden">
                <img className="rounded-t-lg w-full max-h-64 object-cover"
                     src={import.meta.env.VITE_UPLOAD_URL + dishData?.attributes?.main_img?.data?.attributes?.url}
                     alt={dishData?.attributes?.main_img?.data?.attributes?.name}
                />
                <div className="flex flex-col items-center justify-between p-5">
                    <div className='flex flex-row justify-between w-full items-center'>
                        <h2 className='text-sm text-gray-500 font-medium'>{dishData?.attributes?.eating_type}</h2>
                        <h2 className='text-sm text-gray-500 font-medium'>{dishData?.attributes?.kcal} Ккал</h2>
                    </div>
                    <h2 className='mt-5 mb-2 font-semibold text-lg text-left'>{dishData?.attributes?.dish_name}</h2>
                    <p className='text-base text-left'>{dishData?.attributes?.dish_description}</p>
                    <div className="mt-5 flex flex-row justify-around w-full">
                        <div className='text-base flex flex-col justify-center items-center border-r pr-10'>
                            <p>{dishData?.attributes?.kcal}</p>
                            <p>Ккал</p>
                        </div>
                        <div className='text-base flex flex-col justify-center items-center border-r pr-10'>
                            <p>{dishData?.attributes?.squirrels}</p>
                            <p>Белки</p>
                        </div>
                        <div className='text-base flex flex-col justify-center items-center border-r pr-10'>
                            <p>{dishData?.attributes?.fats}</p>
                            <p>Жиры</p>
                        </div>
                        <div className='text-base flex flex-col justify-center items-center'>
                            <p>{dishData?.attributes?.carbohydrates}</p>
                            <p>Углеводы</p>
                        </div>
                    </div>
                    <button
                        className='w-full border hover:!border-[var(--green)] transition rounded-full py-4 text-[var(--green)] font-bold mt-10'
                        onClick={onClose}
                    >
                        Понятно
                    </button>

                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 bg-white transition border hover:bg-gray-200 hover:text-green-700 rounded-lg text-sm w-10 h-10 p-3 flex items-center justify-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path
                                stroke="#7ECA1D"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default DishModalWindow;