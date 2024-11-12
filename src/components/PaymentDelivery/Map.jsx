import React, { useEffect } from 'react';

const Map = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A41831567bfe4080211db3882f7b3ceffd950c52488f08f2aeeb4ad9529b5cf2a&width=100%25&height=100%25&lang=ru_RU&scroll=true';

        // Добавляем скрипт в контейнер
        const container = document.getElementById('yandex-map-container');
        if (container) {
            container.appendChild(script);
        }

        // Функция очистки
        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <div
            id="yandex-map-container"
            className="w-full md:w-3/4 lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-[70vh] mt-10"
        />
    );
};

export default Map;
