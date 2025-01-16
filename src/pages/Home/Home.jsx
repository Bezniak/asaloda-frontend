import React, { useEffect, useState } from 'react';
import HealthyFoodContainer from "../../components/HealthyFoodContainer/HealthyFoodContainer.jsx";
import Ration from "../../components/Ration/Ration.jsx";
import ProgramSelector from "../../components/ChooseProgram/ProgramSelector.jsx";
import HowItWorksContainer from "../../components/HowItWorks/HowItWorksContainer.jsx";
import WhyAsalodaFood from "../../components/WhyAsalodaFood/WhyAsalodaFood.jsx";
import WhichProgramToChoose from "../../components/WhichProgramToChoose/WhichProgramToChoose.jsx";
import FaqContainer from "../../components/FAQ/FAQContainer.jsx";
import SliderContainer from "../../components/Slider/SliderContainer.jsx";
import PaymentDeliveryContainer from "../../components/PaymentDelivery/PaymentDeliveryContainer.jsx";
import useScrollToElement from "../../utils/useScrollToElement.jsx";
import DateCalendar from "../../components/Program/DateCalendar.jsx";
import dayjs from "dayjs";
import useFetchAllData from "../../api/useFetchAllData.js";
import { Preloader } from "../../components/Preloader/Preloader.jsx";
import OrderForm from "../../components/Order/OrderForm.jsx";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext.jsx";
import MetaTags from "../../utils/MetaTags.jsx";

const Home = ({ programName, userClickedProgram, setUserClickedProgram, changeProgramName }) => {
    const { locale } = useAuth();
    const [programRef, scrollToProgram] = useScrollToElement();
    const [orderFormRef, scrollToOrderForm] = useScrollToElement();
    const [updatedAllDishes, setUpdatedAllDishes] = useState([]);
    const [replacedDishes, setReplacedDishes] = useState({});
    const today = dayjs().format("YYYY-MM-DD");
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    const {
        data,
        loading,
        error
    } = useFetchAllData(`/programs?filters[program_name][$in][0]=${programName[0]}&filters[program_name][$in][1]=${programName[1]}&locale=${locale}&populate=*`);

    const { data: allDish, loading: allDishLoading } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${userClickedProgram}&filters[date][$gte]=${today}&filters[changedDish][$eq]=false&locale=${locale}&populate=*`
    );

    console.log('allDish', allDish)

    const { data: allChangeDish, loading: allChangeDishLoading } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${userClickedProgram}&filters[date][$gte]=${today}&filters[changedDish][$eq]=true&locale=${locale}&populate=*`
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

    if (isLoading) return <Preloader />;

    return (
        <div>
            {/* Используем мета-данные главной страницы */}
            <MetaTags page="home" />

            <SliderContainer scrollToProgram={scrollToProgram} />
            <HealthyFoodContainer />

            <Ration scrollToProgram={scrollToProgram} />
            <div ref={programRef}>
                <ProgramSelector changeProgramName={changeProgramName} />
            </div>

            <div className='w-full max-w-7xl mx-auto flex xs:flex-col md:flex-row items-center justify-start gap-16'>
                {data?.map((program) => (
                    <button
                        key={program.id}
                        onClick={() => {
                            setUserClickedProgram(program?.attributes?.program_name);
                        }}
                        className={classNames(
                            'pb-2 px-12 py-2 hover:text-[var(--green)] transition',
                            userClickedProgram === program?.attributes?.program_name
                                ? 'border border-[var(--green)] text-[var(--green)]'
                                : 'border-b-0'
                        )}
                    >
                        <h3 className='text-left text-2xl font-bold mb-2'>
                            {program?.attributes?.program_name}
                        </h3>
                        <p className='text-left text-base text-gray-400'>
                            {program?.attributes?.kcal} {t("kcal")}
                        </p>
                    </button>
                ))}
            </div>

            <hr className='mt-0 mb-8' />

            <DateCalendar
                allDish={allDish}
                allDishLoading={allDishLoading}
                allChangeDish={allChangeDish || []}
                allChangeDishLoading={allChangeDishLoading}
                replacedDishes={replacedDishes || {}}
                programType={data}
                onUpdateDishes={handleUpdateDishes}
                setUpdatedAllDishes={setUpdatedAllDishes}
                onOrderClick={scrollToOrderForm}
            />

            <HowItWorksContainer />

            <div ref={orderFormRef}>
                <OrderForm
                    program={data}
                    userChosenDishes={updatedAllDishes.length > 0 ? updatedAllDishes : allDish}
                    userClickedProgram={userClickedProgram}
                />
            </div>

            <WhyAsalodaFood />
            {/* <DiscountsContainer /> */}
            <WhichProgramToChoose />
            <FaqContainer />
            <PaymentDeliveryContainer />
        </div>
    );
};

export default Home;
