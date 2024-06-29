import React from 'react';
import {formatDate} from "../../utils/utils.js";

const Review = ({data}) => {

    console.log(data);

    return (
        <div className=''>
            {data && data.map(user => (
                <div key={user.id} className='mt-10 mb-10'>
                    {user.attributes.users.data.map(u => (
                        <div key={u.id} className='flex flex-row items-center mb-6'>
                            <div
                                className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                            <h3 className='text-left font-semibold ml-4'>
                                {u.attributes.username}
                            </h3>
                        </div>
                    ))}
                    <p className='text-justify text-base text-gray-500'>{user?.attributes?.review}</p>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-left text-sm text-gray-500'>{formatDate(user?.attributes?.publishedAt)}</p>
                    <p className='text-right text-sm text-[var(--green)] font-semibold'>{user.attributes?.programType}</p>
                </div>
            ))}
        </div>
    );
};

export default Review;
