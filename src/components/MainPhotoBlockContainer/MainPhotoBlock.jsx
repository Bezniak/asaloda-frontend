import React from 'react';

const MainPhotoBlock = ({
                            title,
                            subTitle,
                            description,
                            smallPhoto1,
                            smallPhoto2,
                            smallPhoto3,
                            bigPhoto,
                            bgColor,
                            colorText,
                            button
                        }) => {
    return (
        <div className='flex items-center justify-center py-16 md:py-32 p-6 mt-14' style={{backgroundColor: bgColor}}>
            <div className="flex flex-col gap-5 items-center md:flex-row md:max-w-5xl w-full">
                <div className="flex flex-col justify-center p-4 w-full md:w-1/2 text-center md:text-left">
                    <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white text-left" style={{color: colorText}}>
                        {title}
                    </h1>
                    <h1 className="mb-10 text-4xl md:text-5xl font-bold text-white text-left"
                        style={{color: colorText}}>
                        {subTitle}
                    </h1>
                    <p className="mb-6 font-normal text-white text-left" style={{color: colorText}}>
                        {description}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4 mb-6">
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto1} alt="photo1"
                        />
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto2} alt="photo1"
                        />
                        <img
                            className="object-cover rounded-lg h-24 w-24 md:h-36 md:w-36"
                            src={smallPhoto3} alt="photo1"
                        />
                    </div>
                    {button}
                </div>
                <div className="flex justify-center items-center w-full md:w-1/2 mt-8 md:mt-0">
                    <img className="object-cover rounded-lg w-3/4 md:w-full md:h-auto"
                         src={bigPhoto}
                         alt="photo1"
                    />
                </div>
            </div>
        </div>
    );
};

export default MainPhotoBlock;