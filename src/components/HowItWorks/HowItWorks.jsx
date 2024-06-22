import React from 'react';

const HowItWorks = ({ img, title, description }) => {
    return (
        <div className="flex flex-col justify-between p-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-center mb-10'>
                <img className="rounded-t-lg w-24 sm:w-32 md:w-40 lg:w-16" src={img} alt="imgName" />
            </div>
            <div className="flex-grow p-2">
                <div className="flex-grow flex flex-col justify-start">
                    <h5 className="mb-2 text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <p className="mb-3 text-left text-base text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
