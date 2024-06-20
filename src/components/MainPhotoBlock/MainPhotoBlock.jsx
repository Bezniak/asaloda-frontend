import React from 'react';
import Button from "../Button/Button.jsx";

const MainPhotoBlock = ({title, subTitle, description, smallPhoto1, smallPhoto2, smallPhoto3, bigPhoto, bgColor}) => {
    return (
        <div className='flex items-center justify-center py-16 md:py-32 p-6' style={{ backgroundColor: bgColor }}>
            <div className="flex flex-col gap-5 items-center md:flex-row md:max-w-5xl w-full">
                <div className="flex flex-col justify-center p-4 w-full md:w-1/2 text-center md:text-left">
                    <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white text-left">
                        {title}
                    </h1>
                    <h1 className="mb-10 text-4xl md:text-5xl font-bold text-white text-left">
                        {subTitle}
                    </h1>
                    <p className="mb-6 font-normal text-white text-left">
                        {description}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4 mb-6">
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto1} alt=""
                        />
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto2} alt=""
                        />
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto3} alt=""
                        />
                    </div>
                    <Button content={'Выбрать программу'}/>
                </div>
                <div className="flex justify-center items-center w-full md:w-1/2 mt-8 md:mt-0">
                    <img className="object-cover rounded-lg w-3/4 md:w-full md:h-auto"
                         src={bigPhoto}
                         alt=""/>
                </div>
            </div>
        </div>
    );
};

export default MainPhotoBlock;
