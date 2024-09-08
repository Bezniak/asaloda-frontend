import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {makeRequest} from "../../api/makeRequest.js";
import './ReviewForm.css';
import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {ROUTES} from "../../config/routes.js";

const ReviewForm = ({programData}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {user} = useAuth();
    const {control, register, handleSubmit, formState: {errors}, trigger, setValue} = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRefProgram = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option, onChange) => {
        setSelectedOption(option.attributes.program_name);
        onChange(option.attributes.program_name); // Измените на program_name, если сервер ожидает именно это значение
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRefProgram.current && !dropdownRefProgram.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        try {
            const response = await makeRequest.post('reviews', {
                data: {
                    users: user?.id || null,
                    username: formData.username,
                    userphone: formData.userphone,
                    programType: formData.program, // Send the program ID
                    review: formData.review,
                    publishedAt: null,
                },
            });

            console.log('Review submitted:', response.data);
            setIsSubmitted(true); // Set form as submitted
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className='bg'>
                <div className="form-container flex flex-col h-fit p-8 xs:m-4">
                    <h2 className='text-center text-2xl mt-5 mb-10 font-semibold'>
                        Спасибо за Ваш отзыв!
                        <br/>
                        Он будет опубликован в ближайшее время после проверки модератором.
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className='bg'>
            <form className="form-container flex flex-col h-fit p-8 xs:m-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-left text-3xl mt-5 mb-10 font-semibold'>Оставить отзыв</h2>
                <div className="flex md:flex-row xs:flex-col flex-1">
                    <div className="form-left md:w-1/2 xs:w-full pr-4">
                        <div className="relative z-10 w-full mb-8 group">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="input-field"
                                placeholder=" "
                                {...register('username', {required: true})}
                                onBlur={() => trigger('username')}
                            />
                            <label htmlFor="username" className="input-label">Ваше имя</label>
                            {errors.username && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                        </div>

                        <div className="relative z-10 w-full mb-8 group">
                            <input
                                type="tel"
                                name="userphone"
                                id="userphone"
                                className="input-field"
                                placeholder=" "
                                {...register('userphone', {
                                    required: true,
                                    pattern: /^[+]?[0-9\s]*$/,
                                    minLength: 10,
                                    maxLength: 15
                                })}
                                onBlur={() => trigger('userphone')}
                            />
                            <label htmlFor="userphone" className="input-label">Телефон</label>
                            {errors.userphone && errors.userphone.type === 'required' && (
                                <span className="text-red-500 text-sm">Это поле обязательно</span>
                            )}
                            {errors.userphone && errors.userphone.type === 'pattern' && (
                                <span className="text-red-500 text-sm">Введите корректный номер телефона</span>
                            )}
                            {errors.userphone && (errors.userphone.type === 'minLength' || errors.userphone.type === 'maxLength') && (
                                <span
                                    className="text-red-500 text-sm">Номер телефона должен быть от 10 до 15 цифр</span>
                            )}
                        </div>

                        <div className="relative w-full mb-8 group" ref={dropdownRefProgram}>
                            <Controller
                                name="program"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <>
                                        <div
                                            className="dropdown-selected bg-transparent"
                                            onClick={toggleDropdown}
                                        >
                                            {selectedOption || "Выберите вашу программу питания"}
                                        </div>
                                        {isOpen && (
                                            <div className="dropdown-menu">
                                                {programData.map((option) => (
                                                    <div
                                                        key={option.id}
                                                        className="dropdown-item"
                                                        onClick={() => handleOptionClick(option, onChange)}
                                                    >
                                                        {option.attributes.program_name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                            {errors.program && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                        </div>
                    </div>

                    <div className="form-right md:w-1/2 xs:w-full md:pl-6 flex flex-col">
                        <div className="relative z-10 w-full mb-8 group flex-1">
                            <textarea
                                name="review"
                                id="review"
                                className="input-field h-full resize-none"
                                placeholder=" "
                                {...register('review', {required: true})}
                                onBlur={() => trigger('review')}
                            />
                            <label htmlFor="review" className="input-label">Ваш отзыв</label>
                            {errors.review && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                        </div>
                    </div>
                </div>

                <div className="w-full flex md:flex-row justify-evenly md:items-center xs:flex-col mt-10 mb-5">
                    <p className='text-base md:text-left md:w-1/2 xs:w-full xs:text-center'>
                        Нажимая кнопку “Оформить” я принимаю условия
                        &nbsp;<NavLink to={ROUTES.PRIVACY_POLICY} className='text-[var(--green)]'>передачи информации</NavLink>
                    </p>
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Оставить отзыв'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
