import React from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import { FaCircle } from "react-icons/fa";

dayjs.extend(localeData);
dayjs.locale('ru');

const DateCalendar = ({ dates, selectedDate, setSelectedDate }) => {
    const today = dayjs();

    return (
        <div className='w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10'>
            <div className='flex items-center md:justify-start xs:justify-center gap-10 mb-5'>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <FaCircle className='text-xs fill-gray-400 pointer-events-none' />
                    <p className='text-gray-400 font-semibold'>
                        Уже готовим
                    </p>
                </div>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <FaCircle className='text-xs fill-orange-400 pointer-events-none' />
                    <p className='font-semibold'>
                        Можно менять
                    </p>
                </div>
            </div>
            <div className="flex md:justify-start xs:justify-center space-x-2">
                {dates.map((date, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center justify-center md:w-16 md:h-24 xs:w-12 xs:h-20 p-2 rounded-lg cursor-pointer border ${
                            date.isSame(selectedDate, 'day') ? 'bg-[var(--green)]' :
                                date.isSame(today, 'day') || date.isSame(today.add(1, 'day'), 'day') ? 'bg-gray-100 text-gray-400' :
                                    'bg-white text-gray-800'
                        }`}
                    >
                        <span className="text-xs pt-2 font-bold uppercase">
                            {date.format('dd')}
                        </span>
                        <span className="mt-2 text-xs font-bold">
                            {date.format('DD.MM')}
                        </span>
                        <div className={`mt-auto mb-2 md:w-2.5 md:h-2.5 xs:w-1 xs:h-1 rounded-full ${
                            date.isSame(today, 'day') || date.isSame(today.add(1, 'day'), 'day')
                                ? 'bg-gray-400'
                                : date.isAfter(today, 'day')
                                    ? 'bg-orange-400'
                                    : 'bg-gray-400'
                        }`}>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DateCalendar;
