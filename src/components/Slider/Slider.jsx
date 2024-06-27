import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './slider.css'

const Slider = ({ slides }) => {
    return (
        <Swiper
            dir="rtl"
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div style={{ backgroundColor: slide.bgColor, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
                        <div className="flex flex-col gap-5 items-center md:flex-row md:max-w-5xl w-full mx-auto p-4">
                            <div className="flex flex-col md:justify-center w-full md:w-1/2 text-center md:text-left">
                                <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white md:text-left xs:text-center"
                                    style={{color: slide.colorText}}>
                                    {slide.title}
                                </h1>
                                <h1 className="mb-10 text-4xl md:text-5xl font-bold text-white md:text-left xs:text-center"
                                    style={{color: slide.colorText}}>
                                    {slide.subTitle}
                                </h1>
                                <p className="mb-6 font-normal text-white md:text-left xs:text-center"
                                   style={{color: slide.colorText}}>
                                    {slide.description}
                                </p>
                                <div className="flex justify-center md:justify-start space-x-4 mb-10">
                                    <img className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36 mx-4"
                                         src={slide.smallPhoto1} alt="photo1"/>
                                    <img className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                                         src={slide.smallPhoto2} alt="photo2"/>
                                    <img className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36 md:mx-0 mx-4"
                                         src={slide.smallPhoto3} alt="photo3"/>
                                </div>
                                <div>{slide.button}</div>
                            </div>
                            <div className="flex justify-center items-center w-full md:w-1/2">
                                <img className="object-cover rounded-lg w-3/4 md:w-full md:h-auto" src={slide.bigPhoto}
                                     alt="bigPhoto"/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
