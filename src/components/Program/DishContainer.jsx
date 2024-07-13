import React from 'react';
import Dish from "./Dish.jsx";
import {Preloader} from "../Preloader/Preloader.jsx";

const DishContainer = ({dishData, dishLoading, dishError}) => {

    if (dishLoading) return <Preloader/>

    return (
        <div
            className='w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10 flex md:flex-row xs:flex-col gap-10'>
            {dishData?.map((dish) => (
                <Dish key={dish.id} dish={dish}/>))
            }
        </div>
    );
};

export default DishContainer;
