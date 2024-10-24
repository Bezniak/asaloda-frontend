import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {Parallax} from 'react-parallax';
import './slider.css';
import {TiTickOutline} from "react-icons/ti";
import {useTranslation} from "react-i18next";

const Slider = ({scrollToProgram}) => {
    const {t} = useTranslation();

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
                    bgImage="/selmon_1.jpg"
                    strength={800}
                    className="parallax-slide"
                >
                    <div className="max-w-7xl h-90vh mx-auto flex flex-col justify-center md:p-6 xs:p-3">
                        <div className="relative z-10 flex flex-col">
                            <h1 className="mb-5 font-bold text-white z-50 md:text-left xs:text-center xs:text-base md:text-4xl"
                            >
                                {t("healthy_help_you")}
                            </h1>
                            <ul className="flex flex-col md:gap-5 xs:pag-2">
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                    <span className="text-white xs:text-base md:text-2xl">
                                        {t("reduce_body_weight")}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                    <span className="text-white xs:text-base md:text-2xl">
                                        {t("keep_in_shape")}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                    <span className="text-white xs:text-base md:text-2xl">
                                        {t("gain_muscle_mass")}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                    <span
                                        className="text-white xs:text-base md:text-2xl">
                                        {t("eat_tasty_and_healthy")}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <TiTickOutline className='text-[var(--green)] cursor-default'/>
                                    <span className="text-white xs:text-base md:text-2xl">
                                        {t("save_time_shopping_cooking")}
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-10 md:mb-10 md:text-left text-white xs:text-center xs:text-base md:text-2xl">
                                {t("diet_plans_make_path")}
                            </p>
                            <div className='md:text-left xs:text-center'>
                                <button
                                    className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10 xs:mt-5 xs:text-base'
                                    onClick={scrollToProgram}
                                >
                                    {t("choose_program")}
                                </button>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>


            <SwiperSlide>
                <Parallax
                    bgImage="/citrus_2.jpg"
                    strength={800}
                    className="parallax-slide"
                >
                    <div
                        className="max-w-7xl h-90vh mx-auto  flex flex-col justify-center xs:px-14 xs:gap-2 md:gap-5 lg:gap-5 xs:text-lg md:text-2xl lg:text-4xl">
                        <h1 className="mb-5 font-bold text-white z-50 xs:text-base md:text-4xl text-left">
                            {t("lose_weight_easily_deliciously")}
                        </h1>
                        <p className="flex flex-col gap-5 z-50 text-white xs:text-base md:text-2xl text-left">
                            {t("try_healthy_eating_programs_from_1000_kcal")}
                        </p>
                        <div className='text-left mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10 xs:mt-5 xs:text-base'
                                onClick={scrollToProgram}
                            >
                                {t("choose_program")}
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>


            <SwiperSlide>
                <Parallax
                    bgImage="/shrimp_3.jpg"
                    strength={800}
                    className="parallax-slide"
                >
                    <div
                        className="max-w-7xl h-90vh mx-auto  flex flex-col justify-center xs:px-14 xs:gap-2 md:gap-5 lg:gap-5 xs:text-lg md:text-2xl lg:text-4xl">
                        <h1 className="mb-5 font-bold text-white z-50 xs:text-base md:text-4xl text-left">
                            {t("harmony_on_plate")}
                        </h1>
                        <p className="flex flex-col gap-5 z-50 text-white xs:text-base md:text-2xl text-left">
                            {t("healthy_nutrition_from_2000_kcal")}
                        </p>
                        <div className='text-left mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10 xs:mt-5 xs:text-base'
                                onClick={scrollToProgram}
                            >
                                {t("choose_program")}
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>


            <SwiperSlide>
                <Parallax
                    bgImage="/chicken_4.jpg"
                    strength={800}
                    className="parallax-slide"
                >
                    <div
                        className="max-w-7xl h-90vh mx-auto  flex flex-col justify-center xs:px-14 xs:gap-2 md:gap-5 lg:gap-5 xs:text-lg md:text-2xl lg:text-4xl">
                        <h1 className="mb-5 font-bold text-white z-50 xs:text-base md:text-4xl text-left">
                            {t("increase_muscle_mass")}
                        </h1>
                        <p className="flex flex-col gap-5 z-50 text-white xs:text-base md:text-2xl text-left">
                            {t("healthy_nutrition_programs")}
                        </p>
                        <div className='text-left mt-10'>
                            <button
                                className='text-center font-bold py-3 bg-white rounded-full px-12 w-fit hover:bg-[var(--oringe)] hover:text-white transition relative z-10 xs:mt-5 xs:text-base'
                                onClick={scrollToProgram}
                            >
                                {t("choose_program")}
                            </button>
                        </div>
                    </div>
                </Parallax>
            </SwiperSlide>


        </Swiper>
    );
};

export default Slider;
