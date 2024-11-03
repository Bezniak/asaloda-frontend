import React, {useEffect} from 'react';
import {FaPhone} from "react-icons/fa6";
import {BsWhatsapp} from "react-icons/bs";
import {TbLocation} from "react-icons/tb";
import {FiClock} from "react-icons/fi";
import ContactForm from "./ContactForm.jsx";
import {useTranslation} from "react-i18next";

const Contacts = () => {
    const {t} = useTranslation();

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A67c5dd957ebd5f56aac1577141309cb58ca66b232a5f12b92e9bf556b51d9153&amp;width=600&amp;height=450&amp;lang=ru_RU&amp;scroll=true';

        const container = document.getElementById('yandex-map-container-2');
        if (container) {
            container.appendChild(script);
        }

        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-10 xs:mb-10 p-3'>
                <h1 className='mb-5 md:text-4xl font-bold md:text-left xs:text-center'>
                    {t("contacts")}
                </h1>
                <div className='flex lg:flex-row xs:flex-col gap-20 justify-between items-center'>
                    <div id="yandex-map-container-2" className='xs:w-full lg:w-3/5 md:min-h-96 xs:h-50vh xs:mt-10'/>
                    <div>
                        <h3 className='mb-5 md:text-4xl font-bold md:text-left xs:text-center'>AsalodaFood</h3>
                        <ul className='flex flex-col gap-5 mt-10'>
                            <li className='flex flex-row gap-4 justify-start items-center'>
                                <a href="tel:+375259108473" className='flex items-center gap-4'>
                                    <FaPhone className='text-2xl text-[var(--green)]'/> +375 25 910-84-73
                                </a>
                            </li>
                            <li className='flex flex-row gap-4 justify-start items-center'>
                                <a href="https://wa.me/375259108473" target="_blank" rel="noopener noreferrer"
                                   className='flex items-center gap-4'>
                                    <BsWhatsapp className='text-2xl text-[var(--green)]'/>+375 25 910-84-73
                                </a>
                            </li>
                            <li className='flex flex-row gap-4 justify-start items-center'>
                                <a href="https://www.google.com/maps/search/?api=1&query=г.+Гродно,+ул.+М.+Горького,+91А"
                                   target="_blank" rel="noopener noreferrer" className='flex items-center gap-4'>
                                    <TbLocation className='text-2xl text-[var(--green)]'/>
                                    {t("my_address")}
                                </a>
                            </li>
                            <li className='flex flex-row gap-4 justify-start items-center'>
                                <FiClock className='text-2xl text-[var(--green)]'/>
                                {t("working_time")}
                            </li>
                        </ul>
                        <p className='text-left mt-10 text-sm'>
                            {t("company_name")}
                        </p>
                        <p className='text-left mt-2 text-sm'>
                            {t("address")}
                        </p>
                        <p className='text-left mt-2 text-sm'>
                            {t("UNP")}
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg'>
                <ContactForm/>
            </div>
        </div>
    );
};

export default Contacts;
