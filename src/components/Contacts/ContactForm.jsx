import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";

const ContactForm = () => {
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
            setFormMessage('Ваш запрос успешно отправлен!');
            reset();
        } catch (error) {
            setIsFormSend(false);
            setFormMessage('Ошибка отправки сообщения. Попробуйте позже.');
            console.error('Ошибка отправки в Telegram:', error);
        }
    };

    return (
        <div className="w-2/5">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">Задайте свой вопрос</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register('name')}
                        placeholder="Ваше имя"
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)]"
                    />

                    <input
                        type="text"
                        {...register('contact', {
                            required: 'Контакт обязателен'
                        })}
                        placeholder="Почта или Телефон"
                        className={`border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)] ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contact && <small className="text-red-500">{errors.contact.message}</small>}

                    <textarea
                        {...register('question', {
                            required: 'Вопрос обязателен'
                        })}
                        placeholder="Ваш вопрос*"
                        className={`border p-3 h-32 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--green)] ${errors.question ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.question && <small className="text-red-500">{errors.question.message}</small>}

                    <p className="text-gray-500 text-sm">
                        Нажимая кнопку "Отправить", я принимаю условия{' '}
                        <NavLink to={ROUTES.PRIVACY_POLICY} className="text-[var(--green)] hover:text-[var(--oringe)]">передачи
                            информации</NavLink>
                    </p>

                    <button
                        type="submit"
                        className={`btn ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--oringe)]'}`}
                        disabled={!isValid}
                    >
                        Отправить
                    </button>
                </form>

                {formMessage && <p className="mt-4 text-center">{formMessage}</p>}
            </div>
        </div>
    );
};

export default ContactForm;
