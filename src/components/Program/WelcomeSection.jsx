import React from 'react';

const WelcomeSection = ({data}) => {
    return (
        <div className='w-full md:h-full xs:h-auto flex items-center justify-center'
             style={{backgroundColor: `${data?.attributes?.bg_color}`}}
        >
            <div className='w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 xs:pt-5 xs:pb-10'>
                <div className='flex-1 text-center md:text-left p-5 md:p-10'>
                    <h1 className='md:text-5xl xs:text-2xl md:text-left xs:text-center font-bold text-white'>
                        {data?.attributes?.welcome_title}
                    </h1>
                    <p className='mt-4 md:text-left xs:text-center md:text-3xl xs:text-1xl text-white font-medium'>
                        {data?.attributes?.kcal} ккал
                    </p>

                    <div className='mt-10 flex md:flex-row md:items-center xs:flex-col mx-auto gap-10 '>
                        <button className='border py-2 px-6 pointer-events-none'>
                            <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за день</p>
                            <p className='text-base	font-bold text-white'>{data?.attributes?.daily_price} BYN</p>
                        </button>
                        <button className='border py-2 px-6 pointer-events-none'>
                            <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за 1 неделю</p>
                            <p className='text-base	font-bold text-white'>{data?.attributes?.one_week_price} BYN</p>
                        </button>
                        <button className='border py-2 px-6 pointer-events-none'>
                            <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за 2 недели</p>
                            <p className='text-base	font-bold text-white'>{data?.attributes?.two_week_price} BYN</p>
                        </button>
                        <button className='border py-2 px-6 pointer-events-none'>
                            <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за 3 недели</p>
                            <p className='text-base	font-bold text-white'>{data?.attributes?.three_week_price} BYN</p>
                        </button>
                        <button className='border py-2 px-6 pointer-events-none'>
                            <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за 4 недели</p>
                            <p className='text-base	font-bold text-white'>{data?.attributes?.four_week_price} BYN</p>
                        </button>
                    </div>
                    <div className="flex md:justify-start xs:justify-center md:space-x-10 xs:gap-4 mt-10">
                        {data?.attributes?.img_collection?.data.map((item, index) => (
                            <img src={import.meta.env.VITE_UPLOAD_URL + item?.attributes?.url}
                                 alt={item?.attributes?.name}
                                 key={item.id}
                                 className="object-cover rounded-lg h-32 w-32 md:h-40 md:w-40"
                            />
                        ))}
                    </div>
                    <button className='mt-10 px-12 py-4 bg-white text-dark font-bold rounded-full'>
                        Смотреть меню
                    </button>
                </div>
                <div className="">
                    <img
                        className="object-cover rounded-lg w-80"
                        src={import.meta.env.VITE_UPLOAD_URL + data?.attributes?.big_img?.data?.attributes?.url}
                        alt="bigPhoto"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;