import React from 'react';
import Button from "../Button/Button.jsx";
import Slider from "./Slider.jsx";

const SliderContainer = () => {
    const slides = [
        {
            id: 1,
            title: 'Худей легко',
            subTitle: 'Худей со вкусом',
            description: 'Программы диетического питания от 1000 Ккал для желающих сбросить вес',
            smallPhoto1: '/food1.png',
            smallPhoto2: '/food1.png',
            bgColor: '#7ECA1D',
            bigPhoto: '/food2.jpg',
            colorText: 'black',
            button: <Button content={'Выбрать программу'}/>
        },
        {
            id: 2,
            title: 'Здоровое питание',
            subTitle: 'на каждый день',
            description: 'Доставка сбалансированных рационов питания в Гродно',
            smallPhoto1: '/food1.png',
            smallPhoto2: '/food1.png',
            bgColor: '#00196f',
            bigPhoto: '/food2.jpg',
            colorText: 'white',
            button: <Button content={'Выбрать программу'} borderColor={'lightgray'}/>
        },
        {
            id: 3,
            title: 'Питание для',
            subTitle: 'набора массы',
            description: 'Программа питания с повышенной калорийностью и высоким содержанием белка',
            smallPhoto1: '/food1.png',
            smallPhoto2: '/food1.png',
            bgColor: '#1dcfc6',
            bigPhoto: '/food2.jpg',
            colorText: '#FFFFFF',
            button: <Button content={'Выбрать программу'}/>
        }
    ];


    return (
        <div>
            <Slider slides={slides}/>
        </div>
    );
};

export default SliderContainer;