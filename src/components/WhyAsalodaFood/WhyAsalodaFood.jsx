import React from 'react';
import { Parallax } from 'react-parallax';
import { FaRegThumbsUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const WhyAsalodaFood = () => {
    const { t } = useTranslation();

    const items = [
        "fresh_healthy_products",
        "cook_without_preservatives",
        "maintain_balance_proteins",
        "preparation_on_day_order",
        "work_with_trusted_suppliers",
        "quality_control_at_all_stages",
        "care_about_the_environment"
    ];

    return (
        <div className="w-full max-w-7xl mx-auto md:mt-32 md:mb-32 xs:mt-10 p-3">
            <h2 className="md:text-4xl font-bold mb-12 md:text-left">
                {t("why_choose_AsalodaFood")}
            </h2>
            <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-center gap-8">
                <div className="w-full">
                    <Parallax
                        bgImage="/why_asaloda_food.jpg"
                        strength={800}
                        bgImageStyle={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    >
                        <div className="parallax-content"></div>
                    </Parallax>
                </div>
                <div className="w-full md:w-2/3 p-4">
                    <div className="mb-6 flex flex-col gap-3">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    minHeight: '50px', // Фиксированная высота для единообразия
                                    padding: '8px 0'
                                }}
                            >
                                <FaRegThumbsUp
                                    style={{
                                        fontSize: '24px',
                                        color: 'var(--green)',
                                        marginRight: '16px',
                                        minWidth: '24px', // Фиксированная ширина для иконки
                                        textAlign: 'center'
                                    }}
                                />
                                <span style={{
                                    fontSize: '16px',
                                    color: 'gray',
                                    lineHeight: '1.5',
                                    flex: '1', // Заставляем текст занимать оставшееся пространство
                                    textAlign: 'left'
                                }}>
                                    {t(item)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyAsalodaFood;
