import React from 'react';

const DescriptionBlockContainer = ({data}) => {


    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-10 xs:mt-10 xs:mb-10 p-3'>
            <h1 className='text-center w-3/4 mx-auto md:text-4xl xs:text-2xl leading-snug'>{data?.attributes?.title}</h1>
            <p className='text-center w-3/4 mx-auto mt-8'>{data?.attributes?.description}</p>
        </div>
    );
};

export default DescriptionBlockContainer;