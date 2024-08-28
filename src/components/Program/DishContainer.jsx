// import React from 'react';
// import dayjs from 'dayjs';
// import {Preloader} from "../Preloader/Preloader.jsx";
// import {Alert} from "flowbite-react";
// import Dish from "./Dish.jsx";
// import {calculator} from "../../utils/utils.js";
//
// const DishContainer = ({
//                            dishData,
//                            dishLoading,
//                            dishError,
//                            selectedDate,
//                            setEatingType,
//                            changedDishData,
//                            replaceDish,
//                            programPrice
//                        }) => {
//     const twoDaysFromToday = dayjs().add(1, 'day');
//
//     if (dishLoading) return <Preloader/>;
//
//     if (dishError) {
//         return (
//             <div>
//                 <Alert variant="danger" className="w-25 m-5 d-flex justify-content-center align-items-center">
//                     Error: {dishError.message}
//                 </Alert>
//             </div>
//         );
//     }
//
//     const handleSubmitOrder = () => {
//         console.log('dishData on order click', dishData)
//     }
//
//     return (
//         <div className='w-full max-w-7xl mx-auto mt-10 mb-20 flex flex-wrap gap-10'>
//             {Array.isArray(dishData) && dishData.map((dish) => (
//                 <Dish key={dish.id}
//                       dish={dish}
//                       selectedDate={selectedDate}
//                       twoDaysFromToday={twoDaysFromToday}
//                       setEatingType={setEatingType}
//                       changedDishData={changedDishData}
//                       replaceDish={replaceDish}
//                 />
//             ))}
//             <div
//                 className="w-full md:w-1/3 flex flex-col justify-between items-center bg-white border border-gray-200 rounded-lg shadow p-3">
//                 <div className="p-5 w-full">
//                     <div className='flex flex-row justify-between border-b py-2'>
//                         <h3 className="text-base text-gray-700 text-left">Ккал</h3>
//                         <p className="text-base text-gray-700 text-right">
//                             {calculator(dishData.map(dish => (dish?.attributes?.kcal)))}
//                         </p>
//                     </div>
//                     <div className='flex flex-row justify-between border-b py-2'>
//                         <h3 className="text-base text-gray-700 text-left">Белки</h3>
//                         <p className="text-base text-gray-700 text-right">
//                             {calculator(dishData.map(dish => (dish?.attributes?.squirrels))).toFixed(1)}
//                         </p>
//                     </div>
//                     <div className='flex flex-row justify-between border-b py-2'>
//                         <h3 className="text-base text-gray-700 text-left">Жиры</h3>
//                         <p className="text-base text-gray-700 text-right">
//                             {calculator(dishData.map(dish => (dish?.attributes?.fats)))}
//                         </p>
//                     </div>
//                     <div className='flex flex-row justify-between border-b py-2'>
//                         <h3 className="text-base text-gray-700 text-left">Углеводы</h3>
//                         <p className="text-base text-gray-700 text-right">
//                             {calculator(dishData.map(dish => (dish?.attributes?.carbohydrates)))}
//                         </p>
//                     </div>
//                 </div>
//                 <p className="text-4xl font-bold mt-8 mb-10">от {programPrice?.attributes?.one_day_price} руб/день</p>
//                 {selectedDate.isAfter(twoDaysFromToday) && (
//                     <button
//                         className='rounded-full bg-[var(--green)] py-3 w-full text-white text-base mb-5 hover:!bg-green-600 transition'
//                         onClick={handleSubmitOrder}
//                     >
//                         Заказать
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default DishContainer;