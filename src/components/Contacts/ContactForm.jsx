import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {useTranslation} from "react-i18next";

const ContactForm = () => {
    const {t} = useTranslation();
    const [isFormSend, setIsFormSend] = useState(false);
    const [formMessage, setFormMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        const message = `Форма обратной связи с сайта\nИмя: ${data.name || 'Не указано'}\nКонтакт: ${data.contact || 'Не указан'}\nВопрос: ${data.question}`;

        try {
            await axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
                text: message
            });
            setIsFormSend(true);
            setFormMessage(t("request_sent_successfully"));
            reset();
        } catch (error) {
            setIsFormSend(false);
            setFormMessage(t("error_sending_message"));
            console.error('Ошибка отправки в Telegram:', error);
        }
    };

    return (
        <div className="lg:w-2/5">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">
                    {t("ask_question")}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register('name')}
                        placeholder={t("your_name")}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)]"
                    />

                    <input
                        type="text"
                        {...register('contact', {
                            required: t("contact_required"),
                        })}
                        placeholder={t("mail_or_phone")}
                        className={`border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)] ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contact && <small className="text-red-500">{errors.contact.message}</small>}

                    <textarea
                        {...register('question', {
                            required: t("question_required"),
                        })}
                        placeholder={t("your_question")}
                        className={`border p-3 h-32 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)] ${errors.question ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.question && <small className="text-red-500">{errors.question.message}</small>}

                    <p className="text-gray-500 text-sm">
                        {t("by_clicking_Submit_button")} {' '}
                        <NavLink to={ROUTES.PRIVACY_POLICY} className="text-[var(--green)] hover:text-[var(--oringe)]">
                            {t("information_transfer")}
                        </NavLink>
                    </p>

                    <button
                        type="submit"
                        className={`btn ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--oringe)]'} w-1/3 mt-5 mx-auto `}
                        disabled={!isValid}
                    >
                        {t("send")}
                    </button>
                </form>

                {formMessage && <p className="mt-4 text-center">{formMessage}</p>}
            </div>
        </div>
    );
};

export default ContactForm;
