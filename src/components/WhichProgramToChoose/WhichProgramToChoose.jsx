import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import dayjs from 'dayjs';
import {useTranslation} from "react-i18next";

const WhichProgramToChoose = () => {
    const {t} = useTranslation();
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
                title: t("your_request_sent"),
                description: t("we_contact_shortly"),
                buttonContent: t("fine"),
            });
            openModal();
        } catch (error) {
            console.error('Ошибка отправки сообщения в Telegram:', error);
            setModalContent({
                title: t("error"),
                description: t("failed_to_send_message"),
                buttonContent: t("close"),
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
                <div className="w-full md:w-4/5 p-4 flex justify-center">
                    <img src="/which_program_to_choose.jpg" alt="which_program_to_choose" className="object-cover"/>
                </div>
                <div className="flex flex-col justify-center p-6">
                    <h2 className="mb-8 md:text-4xl font-extrabold md:text-left xs:text-center">
                        {t("need_help_choosing_program")}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400 md:text-left xs:text-center">
                        {t("leave_your_number")}
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-14 flex flex-col gap-5'>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: t("name_required")
                                })}
                                placeholder={t("name")}
                                className={`block w-full h-16 px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-600 sm:text-sm`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            <input
                                type="tel"
                                id="phone"
                                {...register('phone', {
                                    required: t("phone_required"),
                                    pattern: {
                                        value: /^\+375[0-9]{9}$/,
                                        message: t("invalid_phone_number_format"),
                                    }
                                })}
                                placeholder={t("telephone")}
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
                            {t("send")}
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
