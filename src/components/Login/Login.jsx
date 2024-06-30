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
    }
        = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login, theme} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    return (
        <div className="h-100vh flex items-center justify-center">
            <form className="w-3/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        id="email"
                        {...register("email",
                            {
                                required: "Требуется адрес электронной почты",
                                pattern: {value: /^\S+@\S+$/i, message: "Invalid email address"}
                            })
                        }
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label htmlFor="email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Логин
                    </label>
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        id="password"
                        {...register("password", {required: "Необходим пароль"})}
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label htmlFor="password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Пароль
                    </label>
                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
