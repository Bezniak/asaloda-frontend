import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useTranslation} from "react-i18next";
import api from "../../api/api.js";


const Register = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, watch, clearErrors, formState: {errors}, trigger} = useForm();
    const password = watch('password');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const {login, theme} = useAuth();
    const [username, setUsername] = useState("");
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");

    // Сохраняем username и проверяем его асинхронно
    const checkUsername = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/users?filters[username][$eq]=${username}`);
            const data = await response.json();
            console.log('data', data);
            if (data.length > 0) {
                setError(t("nikname_already_taken"));
            } else {
                setError("");
            }
        } catch (err) {
            console.error("Error checking username:", err);
            setError(t("error_checking_nikname"));
        }
    };

    useEffect(() => {
        if (username) {
            checkUsername();
        }
    }, [username]);  // Отслеживаем изменение username

    // Проверяем email при потере фокуса
    const checkEmail = async (email) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + `/users?filters[email][$eq]=${email}`);
            const data = await response.json();
            if (data.length > 0) {
                setEmailError(t("email_already_registered"));
            } else {
                setEmailError("");
            }
        } catch (err) {
            console.error("Error checking email:", err);
            setEmailError(t("error_checking_email"));
        }
    };


    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const {repeat_password, ...formData} = data;

        try {
            const response = await api.post('/auth/local/register', {
                username: username,
                password: data.password,
                userphone: data.userphone,
                name: data.name,
                email: data.email,
            });
            login(response);
            navigate('/');
            if (response.status === 200 || response.status === 201) {
                setErrorMessage("");
                setUsername("");
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data?.error?.message;
                if (errorMessage.includes('Email or Username are already taken')) {
                    setErrorMessage(t("user_already_exists"));
                } else {
                    setErrorMessage(errorMessage || t('an_unexpected_error_occurred'));
                }
            } else {
                setErrorMessage(t('an_unexpected_error_occurred'));
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="h-100vh flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/4 xs:w-full xs:px-4 mx-auto">

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("nikname")}
                    </label>
                    {error && (
                        <span className="text-red-500 text-sm">
                            {error}
                        </span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        {...register('name', {required: true})}
                        onBlur={() => trigger('name')}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label htmlFor="name"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("name")}
                    </label>
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {t("field_required")}
                        </span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        {...register('email', {
                            required: t("field_required"),
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t("valid_email_address"),
                            }
                        })}
                        onBlur={(e) => {
                            trigger('email');
                            checkEmail(e.target.value); // Проверка email
                        }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label htmlFor="email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("enter_email")}
                    </label>
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                    {emailError && (
                        <span className="text-red-500 text-sm">{emailError}</span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        {...register('password', {required: true, minLength: 6})}
                        onBlur={() => trigger('password')}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label htmlFor="password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("password")}
                    </label>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.type === 'minLength' ? t("password_6_characters") : t("field_required")}
                        </span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="repeat_password"
                        id="repeat_password"
                        {...register('repeat_password', {required: true, validate: value => value === password})}
                        onBlur={() => trigger('repeat_password')}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label htmlFor="repeat_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("confirm_password")}
                    </label>
                    {errors.repeat_password && (
                        <span className="text-red-500 text-sm">
                            {errors.repeat_password.type === 'validate' ? t("passwords_do_not_match") : t("field_required")}
                        </span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-10 group">
                    <input
                        type="tel"
                        name="userphone"
                        id="userphone"
                        {...register('userphone', {
                            required: true,
                            pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,14}$/
                        })}
                        onBlur={() => trigger('userphone')}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--green)] peer"
                        placeholder=" "
                    />
                    <label htmlFor="userphone"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[var(--green)] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("telephone")}
                    </label>
                    {errors.userphone && (
                        <span className="text-red-500 text-sm">
                            {errors.userphone.type === 'pattern' ? t("enter_valid_phone_number") : t("field_required")}
                        </span>
                    )}
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-10 text-center">
                        {errorMessage}
                    </div>
                )}
                <div className='text-center'>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className='btn'>
                        {isSubmitting ? t("registration") : t("register")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
