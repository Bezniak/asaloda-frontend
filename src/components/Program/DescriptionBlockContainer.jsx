import React from 'react';
import DescriptionBlock from "./DescriptionBlock.jsx";

const DescriptionBlockContainer = ({data}) => {

    console.log(data)


    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10'>
            <h1 className='text-center w-3/4 mx-auto text-5xl leading-snug'>{data?.attributes?.title}</h1>
            <p className='text-center w-3/4 mx-auto mt-8'>{data?.attributes?.description}</p>
            <div className='flex flex-row justify-between gap-5'>
                <DescriptionBlock textColor={data?.attributes?.bg_color}
                                  img={data?.attributes?.svg_1?.data?.attributes?.url}
                                  title={data?.attributes?.modalWindowTitle_1}
                                  description={data?.attributes?.modalWindowDescription_1}
                                  modalTitle={data?.attributes?.modalWindowTitle_1}
                                  modalDescription={data?.attributes?.openedModalWindowDesc_1}
                />
                <DescriptionBlock textColor={data?.attributes?.bg_color}
                                  img={data?.attributes?.svg_2?.data?.attributes?.url}
                                  title={data?.attributes?.modalWindowTitle_2}
                                  description={data?.attributes?.modalWindowDescription_2}
                                  modalTitle={data?.attributes?.modalWindowTitle_2}
                                  modalDescription={data?.attributes?.openedModalWindowDesc_2}
                />
                <DescriptionBlock textColor={data?.attributes?.bg_color}
                                  img={data?.attributes?.svg_3?.data?.attributes?.url}
                                  title={data?.attributes?.modalWindowTitle_3}
                                  description={data?.attributes?.modalWindowDescription_3}
                                  modalTitle={data?.attributes?.modalWindowTitle_3}
                                  modalDescription={data?.attributes?.openedModalWindowDesc_3}
                />
            </div>

        </div>
    );
};

export default DescriptionBlockContainer;