import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import axios from 'axios';

dayjs.extend(localeData);
dayjs.locale('ru');

const DatePicker = () => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        const today = dayjs();
        const newDates = Array.from({ length: 7 }, (_, i) => today.subtract(2, 'day').add(i, 'day'));
        setDates(newDates);
    }, []);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Send a request to the backend
        axios.post('https://your-backend-api.com/selected-date', { date: date.format('YYYY-MM-DD') })
            .then(response => {
                console.log('Date selected:', response.data);
            })
            .catch(error => {
                console.error('There was an error selecting the date!', error);
            });
    };

    return (
        <div className="w-full max-w-7xl mx-auto md:mt-10 md:mb-20 xs:mt-10 xs:mb-10 flex space-x-2">
            {dates.map((date, index) => (
                <div
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`flex flex-col items-center justify-center w-20 h-24 rounded-lg cursor-pointer border ${
                        date.isSame(selectedDate, 'day') ? 'bg-green-400' :
                            date.isBefore(dayjs(), 'day') ? 'bg-gray-100 text-gray-400' :
                                'bg-white text-gray-800'
                    }`}
                >
                    <span className="text-xs font-bold uppercase">
                        {date.format('dd')}
                    </span>
                    <span className="mt-2 text-lg font-bold">
                        {date.format('DD.MM')}
                    </span>
                    <div className={`mt-auto mb-2 w-2.5 h-2.5 rounded-full ${
                        date.isBefore(dayjs(), 'day') ? 'bg-gray-400' :
                            date.isAfter(dayjs(), 'day') ? 'bg-orange-400' : ''
                    }`}></div>
                </div>
            ))}
        </div>
    );
};

export default DatePicker;
