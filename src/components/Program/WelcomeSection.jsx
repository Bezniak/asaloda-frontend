import React from 'react';
import {Parallax} from 'react-parallax';

const WelcomeSection = ({data, onMenuButtonClick}) => {

    console.log('data WelcomeSection', data);

    const oneDayPrice = data?.attributes?.one_day_price;
    const backgroundImage = data?.attributes?.big_img?.data?.attributes?.url;

    return (
        <Parallax
            bgImage={import.meta.env.VITE_UPLOAD_URL + backgroundImage}
            strength={800}
            className="parallax-slide">
            >
            <div
                className='container h-90vh flex flex-col justify-center'>
                <h1 className='mb-5 text-4xl font-bold text-white text-left z-50'>
                    {data?.attributes?.program_name}
                </h1>
                <p className='mb-5 text-2xl font-bold text-white text-left z-50'>
                    {data?.attributes?.kcal} ккал
                </p>

                <div className='mt-10 flex md:flex-row justify-start gap-10 z-50'>
                    <div className='border py-2 px-6 pointer-events-none'>
                        <p className='text-sm text-white font-semibold mb-2'>Цена за день</p>
                        <p className='text-base font-bold text-white'>{oneDayPrice} BYN</p>
                    </div>
                    <div className='border py-3 px-8 pointer-events-none'>
                        <p className='text-sm text-white font-semibold mb-2'>Цена за 1 неделю</p>
                        <p className='text-base font-bold text-white'>{oneDayPrice * 7} BYN</p>
                    </div>
                    <div className='border py-2 px-6 pointer-events-none'>
                        <p className='text-sm text-white font-semibold mb-2'>Цена за 2 недели</p>
                        <p className='text-base font-bold text-white'>{oneDayPrice * 14} BYN</p>
                    </div>
                    <div className='border py-2 px-6 pointer-events-none'>
                        <p className='text-sm text-white font-semibold mb-2'>Цена за 3 недели</p>
                        <p className='text-base font-bold text-white'>{oneDayPrice * 21} BYN</p>
                    </div>
                    <button className='border py-2 px-6 pointer-events-none'>
                        <p className='text-sm text-gray-200 font-semibold mb-2'>Цена за 4 недели</p>
                        <p className='text-base font-bold text-white'>{oneDayPrice * 28} BYN</p>
                    </button>
                </div>
                <div className='mt-10 z-50'>
                    <button
                        className='btn'
                        onClick={onMenuButtonClick}
                    >
                        Смотреть меню
                    </button>
                </div>
            </div>
        </Parallax>
    );
};

export default WelcomeSection;
