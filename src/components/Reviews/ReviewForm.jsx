import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {makeRequest} from "../../api/makeRequest.js";
import './ReviewForm.css';
import {NavLink} from "react-router-dom";

const CustomSelect = ({options, register, errors}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRefProgram = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
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

    return (
        <div className="relative w-full mb-8 group bg-white" ref={dropdownRefProgram}>
            <div
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-white border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedOption || "Выберите вашу программу питания"}
            </div>
            {isOpen && (
                <div className="absolute w-full bg-white border border-gray-300 shadow-lg max-h-48 overflow-y-auto"
                >
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="py-2 px-2 bg-white hover:bg-green-500 hover:text-white cursor-pointer text-sm"
                            onClick={() => handleOptionClick(option.attributes.name)}
                        >
                            {option.attributes.name}
                        </div>
                    ))}
                </div>
            )}
            <input
                type="hidden"
                name="program"
                value={selectedOption}
                {...register('program', {required: true})}
            />
            {errors.program && <span className="text-red-500 text-sm">Это поле обязательно</span>}
        </div>
    );
};

const ReviewForm = ({programData}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset, trigger} = useForm();

    const onSubmit = async (formData) => {
        console.log(formData);
        setIsSubmitting(true);
        try {
            const response = await makeRequest.post(`reviews`, {data: {formData}});
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg'>
            <form className="form-container flex flex-col h-fit p-8 xs:m-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-left text-3xl mt-5 mb-10 font-semibold'>Оставить отзыв</h2>
                <div className="flex md:flex-row xs:flex-col flex-1">
                    <div className="form-left md:w-1/2 xs:w-full pr-4">
                        <div className="relative z-10 w-full mb-8 group">
                            <input type="text" name="username" id="username"
                                   className="input-field block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                                   placeholder=" " {...register('username', {required: true})}
                                   onBlur={() => trigger('username')}
                            />
                            <label htmlFor="username"
                                   className="input-label peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваше
                                имя</label>
                            {errors.username && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                        </div>

                        <div className="relative z-10 w-full mb-8 group">
                            <input type="tel" name="userphone" id="userphone"
                                   className="input-field block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                                   placeholder=" " {...register('userphone', {
                                required: true,
                                pattern: /^[+]?[0-9\s]*$/,
                                minLength: 10,
                                maxLength: 15
                            })}
                                   onBlur={() => trigger('userphone')}
                            />
                            <label htmlFor="userphone"
                                   className="input-label peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Телефон</label>
                            {errors.userphone && errors.userphone.type === 'required' && (
                                <span className="text-red-500 text-sm">Это поле обязательно</span>)}
                            {errors.userphone && errors.userphone.type === 'pattern' && (
                                <span className="text-red-500 text-sm">Введите корректный номер телефона</span>)}
                            {errors.userphone && (errors.userphone.type === 'minLength' || errors.userphone.type === 'maxLength') && (
                                <span className="text-red-500 text-sm">Номер телефона должен быть от 10 до 15 цифр</span>)}
                        </div>

                        <div className="relative w-full group z-50">
                            <CustomSelect options={programData} register={register} errors={errors}/>
                        </div>
                    </div>

                    <div className="form-right md:w-1/2 xs:w-full md:pl-6 flex flex-col">
                        <div className="relative z-10 w-full group flex-1">
                            <textarea name="review" id="review"
                                      className="input-field block py-2.5 px-0 w-full h-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer resize-none z-0"
                                      placeholder=" " {...register('review', {required: true})}
                                      onBlur={() => trigger('review')}
                            />
                            <label htmlFor="review"
                                   className="input-label peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ваш
                                отзыв</label>
                            {errors.review && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                        </div>
                    </div>
                </div>

                <div className="w-full flex md:flex-row justify-center items-center xs:flex-col mt-10 mb-5">
                    <p className='text-base md:text-left md:w-1/2 xs:w-full xs:mb-8 xs:text-center'>Нажимая кнопку
                        “Оформить” я принимаю условия
                        &nbsp;<NavLink to='' className='text-[var(--green)]'>передачи информации</NavLink>
                    </p>
                    <button type="submit"
                            className="md:ml-10 submit-button text-white bg-[var(--green)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/3 px-5 py-2.5 text-center"
                    >
                        Оставить отзыв
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
