import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../config/routes.js";

const CancelPage = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate(`${ROUTES.HOME}`); // Перенаправление на главную страницу
    };

    return (
        <div>
            <h1>Платеж отменен</h1>
            <p>К сожалению, вы отменили платеж. Если вы хотите попробовать снова, нажмите на кнопку ниже.</p>
            <button onClick={handleRetry}>Попробовать снова</button>
        </div>
    );
};

export default CancelPage;
