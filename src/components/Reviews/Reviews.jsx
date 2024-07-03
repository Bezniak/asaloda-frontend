import React, {useState} from 'react';
import Button from "../Button/Button.jsx";
import {Preloader} from "../Preloader/Preloader.jsx";
import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";

const Reviews = ({data, loading, error, programData}) => {

    const [isFormVisible, setIsFormVisible] = useState(false);


    if (loading) return <Preloader/>;


    return (
        <>
            <div
                className='w-full max-w-7xl mx-auto md:mt-20 md:mb-10 xs:mb-10 p-3 flex md:flex-row xs:flex-col justify-between gap-5 items-start'>
                <div className='flex-1 text-left'>
                    <h1 className='text-5xl font-extrabold mb-10 md:text-left'>Отзывы клиентов</h1>
                    <p className='text-left text-base'>
                        Отзывы реальных клиентов о доставке готовых рационов питания на неделю, вкусе самой еды, ее
                        качестве
                        и сервисе компании BeFit. Узнай почему у нас так вкусно!
                    </p>
                </div>
                <div className='flex-1 md:flex md:justify-end xs:text-center w-full'>
                    <Button content={'Оставить отзыв'} color={'white'} bgColor={'#7ECA1D'}
                            onClick={() => setIsFormVisible(!isFormVisible)}/>
                </div>
            </div>
            {isFormVisible && <ReviewForm data={data} programData={programData}/>}
            <h2 className='w-full max-w-7xl mx-auto p-3 text-3xl font-semibold mt-10'>
                Отзывы о доставке готовой еды
            </h2>
            <Review data={data}/>

        </>
    );
};

export default Reviews;
