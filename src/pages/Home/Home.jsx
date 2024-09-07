import React, {useEffect, useState} from 'react';
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";
import ProgramSelector from "../../components/ChooseProgram/ProgramSelector.jsx";
import HowItWorksContainer from "../../components/HowItWorks/HowItWorksContainer.jsx";
import WhyAsalodaFood from "../../components/WhyAsalodaFood/WhyAsalodaFood.jsx";
import DiscountsContainer from "../../components/Discounts/DiscountsContainer.jsx";
import WhichProgramToChoose from "../../components/WhichProgramToChoose/WhichProgramToChoose.jsx";
import FaqContainer from "../../components/FAQ/FAQContainer.jsx";
import SliderContainer from "../../components/Slider/SliderContainer.jsx";
import PaymentDeliveryContainer from "../../components/PaymentDelivery/PaymentDeliveryContainer.jsx";
import useScrollToElement from "../../utils/useScrollToElement.jsx";
import DateCalendar from "../../components/Program/DateCalendar.jsx";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import useFetchAllData from "../../api/useFetchAllData.js";
import {Preloader} from "../../components/Preloader/Preloader.jsx";
import OrderForm from "../../components/Order/OrderForm.jsx";

const Home = () => {
    const [programRef, scrollToProgram] = useScrollToElement();
    const [orderFormRef, scrollToOrderForm] = useScrollToElement();
    const [programName, setProgramName] = useState("Ультра легкость");
    const changeProgramName = (name) => {
        setProgramName(name);
    }
    const [updatedAllDishes, setUpdatedAllDishes] = useState([]);
    const [replacedDishes, setReplacedDishes] = useState({});
    const {id} = useParams();
    const today = dayjs().format("YYYY-MM-DD");
    const [isLoading, setIsLoading] = useState(true);
    const {data, loading, error} = useFetchAllData(`/programs?filters[program_name][$eq]=${programName}&populate=*`);
    const {data: allDish, loading: allDishLoading} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programName}&filters[date][$gte]=${today}&filters[changedDish][$eq]=false&populate=*`
    );
    const {data: allChangeDish, loading: allChangeDishLoading} = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programName}&filters[date][$gte]=${today}&filters[changedDish][$eq]=true&populate=*`
    );

    useEffect(() => {
        if (!loading && !allDishLoading && !allChangeDishLoading) {
            setIsLoading(false);
        }
    }, [loading, allDishLoading, allChangeDishLoading]);

    const handleUpdateDishes = (date, newUpdatedAllDishes) => {
        setReplacedDishes(prevState => ({
            ...prevState,
            [date]: newUpdatedAllDishes,
        }));
        setUpdatedAllDishes(newUpdatedAllDishes);
    };

    if (isLoading) return <Preloader/>;

    return (
        <div>
            <SliderContainer scrollToProgram={scrollToProgram}/>
            <HealthyFoodContainer/>
            <Ration scrollToProgram={scrollToProgram}/>
            <div ref={programRef}>
                <ProgramSelector changeProgramName={changeProgramName}/>
            </div>

            <div className='w-full max-w-7xl mx-auto'>
                <h3 className='text-2xl font-bold text-left mb-2'>{data[0]?.attributes?.program_name}</h3>
                <p className='text-left text-base text-gray-400'>{data[0]?.attributes?.kcal} Ккал</p>
            </div>
            <hr className='mt-2 mb-8'/>

            <DateCalendar
                allDish={allDish || []}
                allChangeDish={allChangeDish || []}
                replacedDishes={replacedDishes || {}}
                programType={data ? data[0] : null}
                onUpdateDishes={handleUpdateDishes}
                setUpdatedAllDishes={setUpdatedAllDishes}
                onOrderClick={scrollToOrderForm}
            />

            <HowItWorksContainer/>

            <div ref={orderFormRef}>
                <OrderForm
                    program={data[0]}
                    userChosenDishes={updatedAllDishes.length > 0 ? updatedAllDishes : allDish}
                />
            </div>

            <WhyAsalodaFood/>
            <DiscountsContainer/>
            <WhichProgramToChoose/>
            <FaqContainer/>
            <PaymentDeliveryContainer/>
        </div>
    );
};

export default Home;
