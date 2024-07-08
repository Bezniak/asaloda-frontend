import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";

const Program = () => {
    const id = useParams().id;
    const {data, loading, error} = useFetchAllData(`/programs/${id}?populate=*`);

    console.log(data);

    if (loading) return <Preloader/>

    return (
        <div className='w-full md:h-80vh xs:h-auto flex items-center justify-center'
             style={{backgroundColor: `${data?.attributes?.bg_color}`}}
        >
            <div className='w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 xs:pt-5 xs:pb-10'>
                <div className='flex-1 text-center md:text-left p-5 md:p-10'>
                    <h1 className='md:text-5xl xs:text-2xl md:text-left xs:text-center font-bold text-white'>
                        {data?.attributes?.title}
                    </h1>
                    <p className='mt-4 md:text-left xs:text-center md:text-3xl xs:text-1xl text-white font-medium'>
                        {data?.attributes?.kcal}
                    </p>
                    <div
                        className='mt-8 xs:w-fit mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-around text-white border border-gray-500 rounded-md'
                    >
                        <div
                            className='p-5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-500'
                        >
                            <p className='text-sm text-gray-700 font-semibold mb-2'>Цена за день</p>
                            <p className='text-base	font-bold'>{data?.attributes?.daily_price} BYN</p>
                        </div>
                        <div
                            className='p-5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-500'
                        >
                            <p className='text-sm text-gray-700 font-semibold mb-2'>Цена за 1 неделю</p>
                            <p className='text-base	font-bold'>{data?.attributes?.one_week_price} BYN</p>
                        </div>
                        <div
                            className='p-5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-500'
                        >
                            <p className='text-sm text-gray-700 font-semibold mb-2'>Цена за 2 недели</p>
                            <p className='text-base	font-bold'>{data?.attributes?.two_week_price} BYN</p>
                        </div>
                        <div
                            className='p-5 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-500'
                        >
                            <p className='text-sm text-gray-700 font-semibold mb-2'>Цена за 3 недели</p>
                            <p className='text-base	font-bold'>{data?.attributes?.three_week_price} BYN</p>
                        </div>
                        <div
                            className='p-5 text-center md:text-left border-b md:border-b-0 border-gray-500'
                        >
                            <p className='text-sm text-gray-700 font-semibold mb-2'>Цена за 4 недели</p>
                            <p className='text-base	font-bold'>{data?.attributes?.four_week_price} BYN</p>
                        </div>
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

export default Program;
