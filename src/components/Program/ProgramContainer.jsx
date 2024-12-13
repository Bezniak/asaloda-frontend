import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchAllData from "../../api/useFetchAllData.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import WelcomeSection from "./WelcomeSection.jsx";
import DescriptionBlockContainer from "./DescriptionBlockContainer.jsx";
import DateCalendar from "./DateCalendar.jsx";
import FAQContainer from "../FAQ/FAQContainer.jsx";
import dayjs from "dayjs";
import OrderForm from "../Order/OrderForm.jsx";
import useScrollToElement from "../../utils/useScrollToElement.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import MetaTags from "../../utils/MetaTags.jsx";

const ProgramContainer = () => {
    const { locale } = useAuth();
    const [updatedAllDishes, setUpdatedAllDishes] = useState([]);
    const [replacedDishes, setReplacedDishes] = useState({});
    const [orderFormRef, scrollToOrderForm] = useScrollToElement();
    const [dateCalendarRef, scrollToDateCalendar] = useScrollToElement();
    const { id } = useParams();
    const today = dayjs().format("YYYY-MM-DD");

    const { data, loading, error } = useFetchAllData(
        `/programs/${id}?locale=${locale}&populate=*`
    );

    const programType = encodeURIComponent(data?.attributes?.program_name || "");

    console.log(data)

    const { data: allDish, loading: allDishLoading } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programType}&filters[date][$gte]=${today}&filters[changedDish][$eq]=false&locale=${locale}&populate=*`
    );
    const { data: allChangeDish, loading: allChangeDishLoading } = useFetchAllData(
        `/dishes?filters[program_type][$eq]=${programType}&filters[date][$gte]=${today}&filters[changedDish][$eq]=true&locale=${locale}&populate=*`
    );

    const handleUpdateDishes = (date, newUpdatedAllDishes) => {
        setReplacedDishes((prevState) => ({
            ...prevState,
            [date]: newUpdatedAllDishes,
        }));
        setUpdatedAllDishes(newUpdatedAllDishes);
    };

    if (loading || allDishLoading || allChangeDishLoading) return <Preloader />;

    return (
        <div>
            {/* Добавление мета-тегов для программы */}
            {!loading && data && data.attributes && (
                <MetaTags
                    syncTitle={data?.attributes?.meta_title}  // Используем мета-данные программы
                    syncDescription={data?.attributes?.meta_description}  // Используем мета-описание программы
                />
            )}

            <WelcomeSection data={data} onMenuButtonClick={scrollToDateCalendar} />
            <DescriptionBlockContainer data={data} />
            <div ref={dateCalendarRef} className="mb-20 pt-10">
                <DateCalendar
                    allDish={allDish}
                    allChangeDish={allChangeDish}
                    replacedDishes={replacedDishes}
                    programType={data}
                    onUpdateDishes={handleUpdateDishes}
                    setUpdatedAllDishes={setUpdatedAllDishes}
                    onOrderClick={scrollToOrderForm}
                />
            </div>
            <div ref={orderFormRef}>
                <OrderForm
                    program={data}
                    userChosenDishes={
                        updatedAllDishes.length > 0 ? updatedAllDishes : allDish
                    }
                />
            </div>
            <FAQContainer />
        </div>
    );
};

export default ProgramContainer;
