import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import dayjs from 'dayjs';

const WhichProgramToChoose = () => {
    const [isFormSend, setIsFormSend] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        description: '',
        buttonContent: ''
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        watch,
        reset,
        control,
    } = useForm({
        mode: 'onChange'  // Validate on form change
    });

    const phoneValue = watch('phone');

    useEffect(() => {
        if (phoneValue && phoneValue.startsWith('3')) {
            setValue('phone', '+375' + phoneValue.slice(1));
        }
    }, [phoneValue, setValue]);

    const formatDate = () => {
        return dayjs().format('DD.MM.YYYY HH:mm');
    };

    const onSubmit = async (data) => {
        const currentDate = formatDate();
        const message = `Помощь в выборе программы с сайта\nИмя: ${data.name}\nТелефон: ${data.phone}\nДата и время: ${currentDate}`;

        try {
            await axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
                text: message
            });
            setIsFormSend(true);
            setModalContent({
                title: 'Ваш запрос отправлен!',
                description: 'Мы свяжемся с Вами в ближайшее время',
                buttonContent: 'Хорошо'
            });
            openModal();
        } catch (error) {
            console.error('Ошибка отправки сообщения в Telegram:', error);
            setModalContent({
                title: 'Ошибка!',
                description: 'Не удалось отправить сообщение, попробуйте позже.',
                buttonContent: 'Закрыть'
            });
            openModal();
        }
        reset();
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto md:mt-32 md:mb-20 xs:mt-12 xs:mb-12">
            <div className="flex w-full flex-col md:flex-row">
                <div className="flex-1 w-full md:w-1/2 p-4 flex justify-center">
                    <img className="object-cover w-full max-w-md rounded-lg" src="/circle-food-2.webp" alt="Food"/>
                </div>
                <div className="flex-1 flex flex-col justify-center p-6">
                    <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white text-left">
                        Не знаете какую программу выбрать?
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
                        Оставьте телефон и наш менеджер поможет подобрать рацион
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-14 flex flex-col gap-5'>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: 'Имя обязательно'
                                })}
                                placeholder="Имя"
                                className={`block w-full h-16 px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-600 sm:text-sm`}
                            />

                            <input
                                type="tel"
                                id="phone"
                                {...register('phone', {
                                    required: 'Номер телефона обязателен',
                                    pattern: {
                                        value: /^\+375[0-9]{9}$/,
                                        message: 'Неверный формат номер телефона (+375XXXXXXXXX)',
                                    }
                                })}
                                placeholder="Телефон"
                                className={`block w-full h-16 px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-600 sm:text-sm`}
                            />
                        </div>
                        <div className="flex flex-col text-red-500 text-sm">
                            {errors.name && <small>{errors.name.message}</small>}
                            {errors.phone && <small>{errors.phone.message}</small>}
                        </div>
                        <button type="submit"
                                className={`btn ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!isValid}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>

            {showModal && (
                <ModalWindow
                    modalTitle={modalContent.title}
                    modalDescription={modalContent.description}
                    buttonContent={modalContent.buttonContent}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default WhichProgramToChoose;
