import React, {useState} from 'react';
import {Preloader} from '../Preloader/Preloader.jsx';

const FaqDetails = ({data, loading, error}) => {
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) return <Preloader/>;

    return (
        <div id="accordion-flush" data-accordion="collapse"
             data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
             data-inactive-classes="text-gray-500 dark:text-gray-400"
             className='p-3'
        >
            {data.map((item, index) => (
                <div key={item.id}>
                    <h2
                        id={`accordion-flush-heading-${index}`}
                        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white md:text-left xs:text-left 
                            ${openIndex === index ? 'text-customGreen' : 'text-gray-500 dark:text-gray-400'}`}
                        style={{color: openIndex === index ? '#7ECA1D' : '#333'}}
                    >
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full py-5 font-medium rtl:text-right border-gray-200 dark:border-gray-700 gap-3`}
                            data-accordion-target={`#accordion-flush-body-${index}`}
                            aria-expanded={openIndex === index}
                            aria-controls={`accordion-flush-body-${index}`}
                            onClick={() => handleToggle(index)}
                        >
                            <span className='md:text-left xs:text-left'>{item.attributes.ask}</span>
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 shrink-0 transition-transform`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id={`accordion-flush-body-${index}`}
                        className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                        aria-labelledby={`accordion-flush-heading-${index}`}
                        style={openIndex === index ? {maxHeight: '1000px'} : {maxHeight: '0'}}
                    >
                        <div className="py-5 border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400 text-left">
                                {item.attributes.answer}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FaqDetails;
