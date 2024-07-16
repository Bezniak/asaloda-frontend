import React from 'react';
import dayjs from "dayjs";
import AdditionalDishOptions from "./AdditionalDishOptions.jsx";

const ChangeDish = ({ isAdditionalMenuVisible, setIsAdditionalMenuVisible, dish, changedDishData }) => {
    const dayAfterTomorrow = dayjs().add(2, 'day').format('DD.MM.YYYY')

    return (
        <>
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-50 h-screen p-5 overflow-y-auto transition-transform ${isAdditionalMenuVisible ? 'translate-x-0' : 'translate-x-full'} bg-white md:w-5/12 xs:w-full`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
            >
                <h2 id="drawer-right-label"
                    className="text-4xl text-left mb-3 font-semibold"
                >
                    Выберите замену
                </h2>
                <p className='text-left text-base'>Доставка будет изменена с {dayAfterTomorrow}!</p>

                <button
                    type="button"
                    onClick={() => setIsAdditionalMenuVisible(!isAdditionalMenuVisible)}
                    aria-controls="drawer-right-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-12 h-12 absolute top-3 end-5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>

                <div
                    className="mt-10 flex flex-row w-fit  items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 xs:w-1/3 xs:h-auto md:rounded-none md:rounded-s-lg"
                        src={import.meta.env.VITE_UPLOAD_URL + dish?.attributes?.main_img?.data?.attributes?.url} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h2 className='text-base'>{dish?.attributes?.dish_name}</h2>
                    </div>
                </div>

                <div className='w-full mt-10 mb-20 flex flex-row flex-wrap gap-5 justify-around items-center'>
                    {changedDishData.map((item) => <AdditionalDishOptions key={item.id} item={item} />)}
                </div>
            </div>

            {isAdditionalMenuVisible && (
                <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={() => setIsAdditionalMenuVisible(false)}></div>
            )}
        </>
    );
};

export default ChangeDish;
