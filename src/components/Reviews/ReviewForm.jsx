import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {makeRequest} from "../../api/makeRequest.js";

const ReviewForm = ({data, programData}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    }
        = useForm();

    const onSubmit = async (formData) => {
        console.log(formData);

        setIsSubmitting(true);

        try {
            const response = await makeRequest.post(`reviews`, {
                data: {
                    formData
                }
            });
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register('username', {required: true})}
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Ваше имя
                    </label>
                    {errors.firstName && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="tel"
                        name="userphone"
                        id="userphone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register('userphone', {
                            required: true,
                            pattern: /^[+]?[0-9\s]*$/,
                            minLength: 10,
                            maxLength: 15
                        })}
                    />
                    <label
                        htmlFor="userphone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Телефон
                    </label>
                    {errors.phone && errors.phone.type === 'required' && (
                        <span className="text-red-500 text-sm">Это поле обязательно</span>
                    )}
                    {errors.phone && errors.phone.type === 'pattern' && (
                        <span className="text-red-500 text-sm">Введите корректный номер телефона</span>
                    )}
                    {errors.phone && (errors.phone.type === 'minLength' || errors.phone.type === 'maxLength') && (
                        <span className="text-red-500 text-sm">Номер телефона должен быть от 10 до 15 цифр</span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="review"
                        id="review"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register('review', {required: true})}
                    />
                    <label
                        htmlFor="review"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Ваш отзыв
                    </label>
                    {errors.review && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select
                        name="program"
                        id="program"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        {...register('program', {required: true})}
                    >
                        <option value="">Выберите вашу программу питания</option>
                        {programData.map((program) => (
                            <option key={program.id} value={program.attributes.name}>
                                {program.attributes.name}
                            </option>
                        ))}
                    </select>
                    {errors.program && <span className="text-red-500 text-sm">Это поле обязательно</span>}
                </div>
            </div>

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Оставить отзыв
            </button>
        </form>
    );
};

export default ReviewForm;
