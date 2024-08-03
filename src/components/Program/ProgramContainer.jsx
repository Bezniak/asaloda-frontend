import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import dayjs from 'dayjs';
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import WelcomeSection from "./WelcomeSection.jsx";
import DescriptionBlockContainer from "./DescriptionBlockContainer.jsx";
import DateCalendar from "./DateCalendar.jsx";
import DishContainer from "./DishContainer.jsx";
import OrderContainer from "../Order/OrderContainer.jsx";
import WhyAsalodaAfterFormContainer from "../WhyAsalodaAfterForm/WhyAsalodaAfterFormContainer.jsx";

const ProgramContainer = () => {
    const {id} = useParams();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs().add(2, 'day'));
    const [eatingType, setEatingType] = useState(null);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [replacedDishes, setReplacedDishes] = useState({});


    const {data, loading, error} = useFetchAllData(`/programs/${id}?populate=*`);
    console.log('data', data)

    const {
        data: dishData,
        loading: dishLoading,
        error: dishError
    } = useFetchAllData(
        `/dishes?filters[week_day][$eq]=${selectedDate.format('dd')}&&filters[program_type][$eq]=${data?.attributes?.program_name}&populate=*`
    );
    console.log('dishData', dishData)

    const {
        data: changedDishData,
        loading: changedDishLoading,
        error: changedDishError
    } = useFetchAllData(
        `/changed-dishes?filters[program_type][$eq]=${data?.attributes?.program_name}&&filters[eating_type][$eq]=${eatingType}&populate=*`
    );

    useEffect(() => {
        const today = dayjs();
        const newDates = [
            today,
            today.add(1, 'day'),
            today.add(2, 'day'),
            today.add(3, 'day'),
            today.add(4, 'day'),
            today.add(5, 'day'),
            today.add(6, 'day'),
        ];
        setDates(newDates);
    }, []);

    useEffect(() => {
        if (dishData && Array.isArray(dishData)) {
            const currentReplacedDishes = replacedDishes[selectedDate.format('DD-MM-YYYY')] || dishData;
            setSelectedDishes(currentReplacedDishes);
        }
    }, [dishData, selectedDate, replacedDishes]);

    if (loading || dishLoading) return <Preloader/>;

    const replaceDish = (oldDishId, newDish) => {
        setReplacedDishes((prevReplacedDishes) => {
            const currentReplacedDishes = prevReplacedDishes[selectedDate.format('DD-MM-YYYY')] || selectedDishes;
            const updatedDishes = currentReplacedDishes.map(dish => dish.id === oldDishId ? newDish : dish);
            return {
                ...prevReplacedDishes,
                [selectedDate.format('DD-MM-YYYY')]: updatedDishes
            };
        });
    };

    console.log('changedDishData', changedDishData)

    return (
        <div>
            <WelcomeSection data={data}/>
            <DescriptionBlockContainer data={data}/>
            <DateCalendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <DishContainer dishData={selectedDishes}
                           dishLoading={dishLoading}
                           dishError={dishError}
                           selectedDate={selectedDate}
                           setEatingType={setEatingType}
                           changedDishData={changedDishData}
                           replaceDish={replaceDish}
                           programPrice={data}
            />
            <OrderContainer program={data}
                            programImg={data?.attributes?.order_img}
                            color={data?.attributes?.bg_color}
                            replacedDishes={replacedDishes}
            />
            <WhyAsalodaAfterFormContainer/>
        </div>
    );
};

export default ProgramContainer;