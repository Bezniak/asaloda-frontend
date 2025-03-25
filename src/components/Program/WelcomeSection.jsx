import React from 'react';
import {Parallax} from 'react-parallax';
import {useTranslation} from "react-i18next";

const WelcomeSection = ({data, onMenuButtonClick}) => {
    const { t } = useTranslation();
    const oneDayPrice = data?.attributes?.one_day_price;
    const backgroundImage = data?.attributes?.big_img?.data?.attributes?.url;

    return (
        <Parallax
            bgImage={import.meta.env.VITE_UPLOAD_URL + backgroundImage}
            strength={800}
            className="parallax-slide">
            <div className='container h-90vh flex flex-col justify-center p-3'>
                <h1 className='mb-5 md:text-4xl xs:text-3xl font-bold text-white md:text-left xs:text-center z-50'>
                    {data?.attributes?.program_name}
                </h1>
                <p className='mb-5 md:text-2xl xs:text-lg font-bold text-white md:text-left xs:text-center z-50'>
                    {data?.attributes?.kcal} {t("kcal")}
                </p>

                <div className='md:mt-10 xs:mt-5 flex md:flex-row xs:flex-col justify-start md:gap-10 xs:gap-3 z-50'>
                    {oneDayPrice !== undefined ? (
                        <>
                            <div className='border py-2 px-6 pointer-events-none'>
                                <p className='text-sm text-white font-semibold mb-2'>
                                    {t("price_per_day")}
                                </p>
                                <p className='text-base font-bold text-white'>{oneDayPrice.toFixed(2)} BYN</p>
                            </div>
                            <div className='border py-3 px-8 pointer-events-none'>
                                <p className='text-sm text-white font-semibold mb-2'>
                                    {t("price_for_1_week")}
                                </p>
                                <p className='text-base font-bold text-white'>{(oneDayPrice * 7).toFixed(2)} BYN</p>
                            </div>
                            <div className='border py-2 px-6 pointer-events-none'>
                                <p className='text-sm text-white font-semibold mb-2'>
                                    {t("price_for_2_weeks")}
                                </p>
                                <p className='text-base font-bold text-white'>{(oneDayPrice * 14).toFixed(2)} BYN</p>
                            </div>
                            <div className='border py-2 px-6 pointer-events-none'>
                                <p className='text-sm text-white font-semibold mb-2'>
                                    {t("price_for_3_weeks")}
                                </p>
                                <p className='text-base font-bold text-white'>{(oneDayPrice * 21).toFixed(2)} BYN</p>
                            </div>
                            <button className='border py-2 px-6 pointer-events-none'>
                                <p className='text-sm text-gray-200 font-semibold mb-2'>
                                    {t("price_for_4_weeks")}
                                </p>
                                <p className='text-base font-bold text-white'>{(oneDayPrice * 28).toFixed(2)} BYN</p>
                            </button>
                        </>
                    ) : (
                        <p className="text-white">{t("price_not_available")}</p>
                    )}
                </div>
                <div className='mt-10 z-50 md:text-left xs:text-center'>
                    <button className='btn' onClick={onMenuButtonClick}>
                        {t("view_menu")}
                    </button>
                </div>
            </div>
        </Parallax>
    );
};

export default WelcomeSection;
