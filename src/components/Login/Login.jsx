import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import api from "../../api/api.js";

const Login = () => {
    const {t} = useTranslation();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const [error, setError] = useState('');
    const {login, theme} = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError(''); // Reset error state before making a request

        try {
            const response = await api.post('/auth/local', {
                identifier: data.email,
                password: data.password
            });
            login(response);
            navigate('/');
        } catch (error) {
            if (error?.response?.data?.error) {
                const strapiErrorMessage = error.response.data.error.message;
                setError(strapiErrorMessage);
            } else {
                setError('Произошла непредвиденная ошибка.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-100vh flex items-center justify-center">
            <form className="w-1/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Требуется адрес электронной почты",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Логин
                    </label>
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                </div>
                <div className="relative z-0 w-full group mb-10">
                    <input
                        type="password"
                        id="password"
                        {...register("password", {required: "Необходим пароль"})}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Пароль
                    </label>
                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-10 text-center">
                        {error}
                    </div>
                )}
                <div className='text-center'>
                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Отправка запроса...' : 'Войти'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
