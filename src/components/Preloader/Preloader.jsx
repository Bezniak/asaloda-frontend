import React from 'react';

export const Preloader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img
                src="/preloader.svg"
                alt="preloader"
                className="w-40 h-40 sm:w-28 sm:h-28"
            />
        </div>
    );
};
