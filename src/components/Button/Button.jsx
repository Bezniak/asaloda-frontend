import React from 'react';

const Button = ({content, borderColor, onClick, color, bgColor}) => {
    return (
        <button
            className="px-12 py-3 bg-white text-dark font-bold w-fit rounded-full hover:bg-emerald-50 transition-all ease-in duration-150"
            style={{
                border: borderColor ? '1px solid ' + borderColor : '',
                color: color ? color : '',
                backgroundColor: bgColor ? bgColor : ''
            }}
            onClick={onClick}
        >
            {content}
        </button>

    );
};

export default Button;