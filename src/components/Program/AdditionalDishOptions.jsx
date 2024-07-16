import React from 'react';

const AdditionalDishOptions = ({item}) => {
    return (
        <div
            className="max-w-80 bg-white border border-gray-200 rounded-lg shadow"
            key={item.id}
        >
            <img
                className="rounded-t-lg"
                src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.main_img?.data?.attributes?.url}
                alt={item.attributes?.main_img?.data?.attributes?.name}
            />
            <div className="p-3 flex flex-col justify-between w-full h-fit">
                <div className='flex justify-around items-center gap-5 text-sm text-gray-400'>
                    <div className='flex flex-col justify-between items-center'>
                        <p>Белки</p>
                        <p>{item?.attributes?.squirrels}</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <p>Жиры</p>
                        <p>{item?.attributes?.carbohydrates}</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <p>Углеводы</p>
                        <p>{item?.attributes?.squirrels}</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <p>Ккал</p>
                        <p>{item?.attributes?.kcal}</p>
                    </div>
                </div>
                <h2 className="text-base mt-5">
                    {item?.attributes?.dish_name}
                </h2>
            </div>
        </div>
    );
};

export default AdditionalDishOptions;
