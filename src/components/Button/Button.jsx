import React from 'react';

const Button = ({content}) => {
    return (
        <button className="mt-6 px-12 py-3 bg-white text-dark font-bold w-fit rounded-full hover:bg-emerald-50 transition-all ease-in duration-150">
            {content}
        </button>

    );
};

export default Button;