import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const WhichProgramToChoose = () => {

    const [isFormSend, setIsFormSend] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
        reset,
    } = useForm();

    const phoneValue = watch('phone');

    useEffect(() => {
        if (phoneValue && phoneValue.startsWith('3')) {
            setValue('phone', '+375' + phoneValue.slice(1));
        }
    }, [phoneValue, setValue]);

    const onSubmit = (data) => {
        console.log(data.phone);
        reset();
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Disable scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);


    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto md:mt-32 md:mb-32 xs:mt-12 xs:mb-12">
            <div className="flex w-full flex-col md:flex-row">
                <div className="flex-1 w-full md:w-1/2 p-4 flex justify-center">
                    <img className="object-cover w-full max-w-md rounded-lg"
                         src="/circle-food-2.webp" alt="Food"/>
                </div>
                <div className="flex-1 flex flex-col justify-center p-6 ">
                    <h2 className="mb-8 text-4xl font-extrabold	 tracking-tight text-gray-900 dark:text-white text-left">
                        Не знаете какую программу выбрать?
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
                        Оставьте телефон и наш менеджер поможет подобрать рацион
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}
                          className='mt-14 flex md:flex-row justify-between align-middle gap-10 xs:flex-col'>
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
                        <button type="submit"
                                className="px-10 py-2 font-medium text-white bg-green-500 rounded-full hover:bg-customGreen"
                                onClick={openModal}
                        >
                            Отправить
                        </button>
                    </form>
                    {errors.phone && (
                        <small className="mt-5 text-red-500">{errors.phone.message}</small>
                    )}
                </div>
            </div>

            {showModal && (
                <ModalWindow modalTitle={'Ваш запрос отправлен!'}
                             modalDescription={'Мы свяжемся с Вами в ближаешее время'}
                             buttonContent={'Хорошо'}
                             onClose={closeModal}
                />
            )}

        </div>
    );
};

export default WhichProgramToChoose;
