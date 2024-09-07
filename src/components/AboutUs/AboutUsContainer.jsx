import React from 'react';
import AboutUs from "./AboutUs.jsx";

const AboutUsContainer = () => {


    const data = [
        {
            id: 1,
            img: '/product.svg',
            description: 'Каждый рацион полностью сбалансирован по количеству ккал и БЖУ',
        },
        {
            id: 2,
            img: '/strong.svg',
            description: 'Программы для снижения веса, поддержания формы, набора мышечной массы, а также для вегетарианцев, веганов и рыбное меню',
        },
        {
            id: 3,
            img: '/deliver.svg',
            description: 'Гибкая доставка - привозим в удобное место и время, в любой удобный часовой интервал утром и 2х-часовой вечером',
        },
        {
            id: 4,
            img: '/diet.svg',
            description: 'Приготовлено профессионалами – вкусное и разнообразное меню из 900+ натуральных блюд в меню без сахара, консервантов и усилителей вкуса',
        },
        {
            id: 5,
            img: '/puzzle.svg',
            description: 'Конструктор питания - выбирайте только понравившиеся блюда и ингредиенты, сделайте свой рацион индивидуальным легко',
        },
        {
            id: 6,
            img: '/packaging.svg',
            description: 'Забираем на переработку использованные контейнеры из-под наших рационов питания',
        },
        {
            id: 7,
            img: '/menu-list.svg',
            description: 'Новое меню каждую неделю',
        },
    ]

    return (
        <div>
            <AboutUs data={data}/>
        </div>
    );
};

export default AboutUsContainer;