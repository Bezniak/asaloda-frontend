import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {Parallax} from 'react-parallax';
import './slider.css';
import {TiTickOutline} from "react-icons/ti";

const Slider = ({scrollToProgram}) => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{clickable: true}}
            modules={[Navigation, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Parallax
                    bgImage="/main_img_1.jpg"
                    strength={800}
                    className="parallax-slide"
                >
                    <div className="max-w-7xl h-90vh mx-auto flex flex-col justify-center">
                        <div className="relative z-10 flex flex-col">
                            <h1 className="mb-5 text-4xl font-bold text-white"
                                style={{
                                    textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                                }}
                            >
                                Здоровое питание от AsalodaFood поможет вам:
                            </h1>
                            <ul className="flex flex-col gap-5"
                                style={{
                                    textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста списка
                                }}>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-4xl text-[var(--dark-blue)]'/>
                                    <span className="text-white">снизить массу тела</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-4xl text-[var(--dark-blue)]'/>
                                    <span className="text-white">поддержать форму</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-4xl text-[var(--dark-blue)]'/>
                                    <span className="text-white">набрать мышечную массу</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-4xl text-[var(--dark-blue)]'/>
                                    <span className="text-white">питаться вкусно и здорово</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-4xl text-[var(--dark-blue)]'/>
                                    <span className="text-white">экономить время на магазинах и готовке</span>
                                </li>
                            </ul>
                            <p className="mt-10 mb-10 text-left text-white"
                               style={{
                                   textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                               }}>
                                Напиши рационы правильного питания сделают путь к телу мечты лучше и ярче!
                            </p>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10'
                                onClick={scrollToProgram}
                            >
                                Выбрать программу
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>


            <SwiperSlide>
                <Parallax
                    bgImage="/food2.jpg"
                    strength={500}
                    className="parallax-slide"
                >
                    <div className=" max-w-7xl h-90vh mx-auto flex flex-col justify-center">
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей легко
                        </h1>
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей со вкусом
                        </h1>
                        <p className="flex flex-col gap-5"
                           style={{
                               textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста списка
                           }}>
                            Программы диетического питания от 1000 Ккал для желающих сбросить вес
                        </p>
                        <div className='text-center mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10'
                                onClick={scrollToProgram}
                            >
                                Выбрать программу
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>

            <SwiperSlide>
                <Parallax
                    bgImage="/food2.jpg"
                    strength={500}
                    className="parallax-slide"
                >
                    <div className=" max-w-7xl h-90vh mx-auto flex flex-col justify-center">
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей легко
                        </h1>
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей со вкусом
                        </h1>
                        <p className="flex flex-col gap-5"
                           style={{
                               textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста списка
                           }}>
                            Программы диетического питания от 1000 Ккал для желающих сбросить вес
                        </p>
                        <div className='text-center mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10'
                                onClick={scrollToProgram}
                            >
                                Выбрать программу
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>

            <SwiperSlide>
                <Parallax
                    bgImage="/food2.jpg"
                    strength={500}
                    className="parallax-slide"
                >
                    <div className=" max-w-7xl h-90vh mx-auto flex flex-col justify-center">
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей легко
                        </h1>
                        <h1 className="mb-5 text-4xl font-bold text-white"
                            style={{
                                textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста
                            }}>
                            Худей со вкусом
                        </h1>
                        <p className="flex flex-col gap-5"
                           style={{
                               textShadow: '0px 0px 8px rgba(255, 255, 255, 1)', // Белая тень вокруг текста списка
                           }}>
                            Программы диетического питания от 1000 Ккал для желающих сбросить вес
                        </p>
                        <div className='text-center mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10'
                                onClick={scrollToProgram}
                            >
                                Выбрать программу
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>




        </Swiper>
    );
};

export default Slider;
