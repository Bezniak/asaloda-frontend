import React, { useEffect } from 'react';

const Map = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A59f35aa3703d13997e08ce5dd9f8824fbd1c23662862406c08f61d522c4c881f&amp;width=1170&amp;height=720&amp;lang=ru_RU&amp;scroll=true';

        // Append the script to the container element
        const container = document.getElementById('yandex-map-container');
        if (container) {
            container.appendChild(script);
        }

        // Cleanup function
        return () => {
            // Check if script is still a child of container before removing
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <div id="yandex-map-container" className='md:w-3/5 md:min-h-96 xs:mt-10'/>
    );
};

export default Map;

