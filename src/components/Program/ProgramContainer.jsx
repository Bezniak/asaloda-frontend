import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchAllData from "../../api/useFetchAllData.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import WelcomeSection from "./WelcomeSection.jsx";
import DescriptionBlockContainer from "./DescriptionBlockContainer.jsx";
import DateCalendar from "./DateCalendar.jsx";
import WhyAsalodaAfterFormContainer from "../WhyAsalodaAfterForm/WhyAsalodaAfterFormContainer.jsx";
import FAQContainer from "../FAQ/FAQContainer.jsx";
import dayjs from "dayjs";
import OrderForm from "../Order/OrderForm.jsx";

const ProgramContainer = () => {
    const { id } = useParams();
    const today = dayjs().format("YYYY-MM-DD");

    const { data, loading, error } = useFetchAllData(`/programs/${id}?populate=*`);
    const programType = encodeURIComponent(data?.attributes?.program_name || '');

    const { data: allDish, loading: allDishLoading, error: allDishError } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programType}&filters[date][$gte]=${today}&filters[changedDish][$eq]=false&populate=*`
    );

    const { data: allChangeDish, loading: allChangeDishLoading, error: allChangeDishError } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programType}&filters[date][$gte]=${today}&filters[changedDish][$eq]=true&populate=*`
    );

    const [updatedAllDishes, setUpdatedAllDishes] = useState(allDish || []);

    const handleUpdateDishes = (newUpdatedAllDishes) => {
        // Update the state with new dishes, falling back to `allDish` if necessary
        const updatedDishesMap = new Map(newUpdatedAllDishes.map(dish => [dish.id, dish]));
        const finalUpdatedDishes = allDish.map(dish => updatedDishesMap.get(dish.id) || dish);
        setUpdatedAllDishes(finalUpdatedDishes);
    };

    useEffect(() => {
        if (allDish) {
            setUpdatedAllDishes(allDish);
        }
    }, [allDish]);

    if (loading || allDishLoading || allChangeDishLoading) return <Preloader />;

    return (
        <div>
            <WelcomeSection data={data} />
            <DescriptionBlockContainer data={data} />
            <DateCalendar
                allDish={allDish}
                allChangeDish={allChangeDish}
                programType={data}
                onUpdateDishes={handleUpdateDishes}
            />
            <OrderForm program={data} userChosenDishes={updatedAllDishes} />
            <WhyAsalodaAfterFormContainer />
            <FAQContainer />
        </div>
    );
};

export default ProgramContainer;
