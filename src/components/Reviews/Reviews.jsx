import React from 'react';
import Button from "../Button/Button.jsx";
import {Preloader} from "../Preloader/Preloader.jsx";
import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";

const Reviews = ({data, loading, error, programData}) => {


    if (loading) return <Preloader/>;


    return (
        <div>
            <div className='flex flex-row justify-between gap-5 items-start'>
                <div className='flex-1 text-left'>
                    <h1 className='text-5xl font-extrabold mb-10 md:text-left'>Отзывы клиентов</h1>
                    <p className='text-left text-base'>
                        Отзывы реальных клиентов о доставке готовых рационов питания на неделю, вкусе самой еды, ее
                        качестве
                        и сервисе компании BeFit. Узнай почему у нас так вкусно!
                    </p>
                </div>
                <div className='flex-1 flex justify-end'>
                    <Button content={'Оставить отзыв'} color={'white'} bgColor={'#7ECA1D'}/>
                </div>
            </div>
            <h2 className='text-3xl mt-16 mb-8 font-semibold'>Отзывы о доставке готовой еды</h2>
            <Review data={data}/>
            <ReviewForm data={data} programData={programData}/>
        </div>
    );
};

export default Reviews;
