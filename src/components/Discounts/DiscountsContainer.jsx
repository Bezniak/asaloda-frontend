import React from 'react';
import {useTranslation} from "react-i18next";
import MetaTags from "../../utils/MetaTags.jsx";
import useFetchAllData from "../../api/useFetchAllData.js";
import {useAuth} from "../../context/AuthContext.jsx";

const DiscountsContainer = () => {
    const {locale} = useAuth();
    const {t} = useTranslation();
    const {data} = useFetchAllData(`/promo-codes?&locale=${locale}&populate=*`);

    const handleCopy = async (text, buttonId) => {
        try {
            await navigator.clipboard.writeText(text);
            const button = document.getElementById(buttonId);
            const defaultMessage = button.querySelector("#default-message");
            const successMessage = button.querySelector("#success-message");

            defaultMessage.classList.add("hidden");
            successMessage.classList.remove("hidden");

            setTimeout(() => {
                defaultMessage.classList.remove("hidden");
                successMessage.classList.add("hidden");
            }, 2000); // Возвращаем исходное состояние через 2 секунды
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <>
            <MetaTags page="discounts"/>
            <div className='w-full max-w-7xl mx-auto '>
                <h1 className='md:text-4xl xs:text-2xl mt-20 mb-10'>
                    {t("discount_title")}
                </h1>
                <p className='md:text-lg xs:text-sm mb-10'>{t("discount_desc")}</p>
                <div
                    className='flex flex-wrap gap-8 justify-center items-center h-80vh text-2xl p-4'>
                    {data?.map((item) => (
                        <div key={item.id}
                             className="md:w-1/3 xs:w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--green)] uppercase">
                                {item?.attributes?.title}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 text-lg">
                                {item?.attributes?.desc}
                            </p>
                            <div className="w-full">
                                <div className="relative">
                                    <label htmlFor={`input-${item.id}`} className="sr-only">Label</label>
                                    <input id={`input-${item.id}`} type="text"
                                           className="col-span-6 bg-gray-50 border border-gray-300 text-[var(--green)] text-sm rounded-lg block w-full px-2.5 py-4"
                                           value={item?.attributes?.code} disabled readOnly/>
                                    <button
                                        id={`button-${item.id}`}
                                        onClick={() => handleCopy(item?.attributes?.code, `button-${item.id}`)}
                                        className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                                    >
                                    <span id="default-message" className="inline-flex items-center">
                                        <svg className="w-3 h-3 me-1.5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 18 20">
                                            <path
                                                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                        </svg>
                                        <span className="text-xs font-semibold">
                                            {t("copy")}
                                        </span>
                                    </span>

                                        <span id="success-message" className="hidden inline-flex items-center">
                                        <svg className="w-3 h-3 me-1.5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M1 5.917 5.724 10.5 15 1.5"/>
                                        </svg>
                                        <span className="text-xs font-semibold text-[var(--green)]">
                                            {t("copied")}
                                        </span>
                                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DiscountsContainer;
